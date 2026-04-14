const express = require("express");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

const books = [
  { id: "b1", title: "Clean Architecture", author: "Robert C. Martin", stock: 3 },
  { id: "b2", title: "Domain-Driven Design", author: "Eric Evans", stock: 2 },
  { id: "b3", title: "Microservices Patterns", author: "Chris Richardson", stock: 1 }
];

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/books", (_req, res) => {
  res.json({ items: books });
});

app.get("/books/:id", (req, res) => {
  const book = books.find((item) => item.id === req.params.id);
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }
  return res.json(book);
});

app.post("/books/:id/reserve", (req, res) => {
  const book = books.find((item) => item.id === req.params.id);
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  if (book.stock <= 0) {
    return res.status(409).json({ message: "Book is out of stock" });
  }

  book.stock -= 1;
  return res.status(200).json({
    message: "Book reserved",
    book
  });
});

app.listen(PORT, () => {
  console.log(`Service A listening on port ${PORT}`);
});
