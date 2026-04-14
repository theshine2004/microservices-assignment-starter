const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 8000;
const SERVICE_A_URL = process.env.SERVICE_A_URL || "http://service-a:5000";
const SERVICE_B_URL = process.env.SERVICE_B_URL || "http://service-b:5000";

app.get("/", (_req, res) => {
  res.json({
    name: "library-gateway",
    status: "ok",
    routes: ["/health", "/api/service-a/*", "/api/service-b/*", "/api/dashboard"]
  });
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/dashboard", async (_req, res) => {
  try {
    const [booksResponse, loansResponse] = await Promise.all([
      fetch(`${SERVICE_A_URL}/books`),
      fetch(`${SERVICE_B_URL}/loans`)
    ]);

    if (!booksResponse.ok || !loansResponse.ok) {
      return res.status(502).json({ message: "Failed to load dashboard data" });
    }

    const booksPayload = await booksResponse.json();
    const loansPayload = await loansResponse.json();

    return res.json({
      totals: {
        books: booksPayload.items.length,
        inStock: booksPayload.items.reduce((sum, item) => sum + item.stock, 0),
        loans: loansPayload.items.length
      },
      books: booksPayload.items,
      loans: loansPayload.items
    });
  } catch (error) {
    return res.status(503).json({
      message: "Unable to reach backend services",
      error: error.message
    });
  }
});

app.use(
  "/api/service-a",
  createProxyMiddleware({
    target: SERVICE_A_URL,
    changeOrigin: true,
    pathRewrite: { "^/api/service-a": "" }
  })
);

app.use(
  "/api/service-b",
  createProxyMiddleware({
    target: SERVICE_B_URL,
    changeOrigin: true,
    pathRewrite: { "^/api/service-b": "" }
  })
);

app.listen(PORT, () => {
  console.log(`Gateway listening on port ${PORT}`);
});
