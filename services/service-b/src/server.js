const express = require("express");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;
const SERVICE_A_URL = process.env.SERVICE_A_URL || "http://service-a:5000";

const loans = [];

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/loans", (_req, res) => {
  res.json({ items: loans });
});

app.post("/loans", async (req, res) => {
  const { bookId, borrower } = req.body;

  if (!bookId || !borrower) {
    return res.status(400).json({ message: "bookId and borrower are required" });
  }

  try {
    const reserveResponse = await fetch(`${SERVICE_A_URL}/books/${bookId}/reserve`, {
      method: "POST",
      headers: { "Content-Type": "application/json" }
    });

    if (reserveResponse.status === 404) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (reserveResponse.status === 409) {
      return res.status(409).json({ message: "Book is out of stock" });
    }

    if (!reserveResponse.ok) {
      return res.status(502).json({ message: "Failed to reserve book" });
    }

    const reservePayload = await reserveResponse.json();
    const loan = {
      id: `l${loans.length + 1}`,
      bookId,
      borrower,
      createdAt: new Date().toISOString()
    };

    loans.push(loan);

    return res.status(201).json({
      loan,
      reservedBook: reservePayload.book
    });
  } catch (error) {
    return res.status(503).json({
      message: "Service A is unavailable",
      error: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Service B listening on port ${PORT}`);
});
