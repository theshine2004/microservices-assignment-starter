const API_BASE_URL = "http://localhost:8080";

const statsEl = document.getElementById("stats");
const bookListEl = document.getElementById("bookList");
const loanListEl = document.getElementById("loanList");
const refreshBtn = document.getElementById("refreshBtn");
const loanForm = document.getElementById("loanForm");
const bookSelect = document.getElementById("bookSelect");
const borrowerInput = document.getElementById("borrowerInput");
const submitLoanBtn = document.getElementById("submitLoanBtn");
const loanMessageEl = document.getElementById("loanMessage");

function renderStats(totals) {
  statsEl.innerHTML = `
    <article class="stat"><h3>Total Books</h3><strong>${totals.books}</strong></article>
    <article class="stat"><h3>Units In Stock</h3><strong>${totals.inStock}</strong></article>
    <article class="stat"><h3>Total Loans</h3><strong>${totals.loans}</strong></article>
  `;
}

function renderBooks(books) {
  if (!books.length) {
    bookListEl.innerHTML = "<li>No books available.</li>";
    return;
  }

  bookListEl.innerHTML = books
    .map(
      (book) => `
      <li>
        <strong>${book.title}</strong><br />
        <span>${book.author}</span><br />
        <span class="pill">Stock: ${book.stock}</span>
      </li>
    `
    )
    .join("");
}

function renderLoans(loans) {
  if (!loans.length) {
    loanListEl.innerHTML = "<li>No loan requests yet.</li>";
    return;
  }

  loanListEl.innerHTML = loans
    .map(
      (loan) => `
      <li>
        <strong>${loan.borrower}</strong> borrowed <strong>${loan.bookId}</strong><br />
        <span>${new Date(loan.createdAt).toLocaleString()}</span>
      </li>
    `
    )
    .join("");
}

function renderBookSelectOptions(books) {
  const availableBooks = books.filter((book) => book.stock > 0);

  if (!availableBooks.length) {
    bookSelect.innerHTML = "<option value=\"\">No books available</option>";
    bookSelect.disabled = true;
    submitLoanBtn.disabled = true;
    return;
  }

  bookSelect.disabled = false;
  submitLoanBtn.disabled = false;
  bookSelect.innerHTML = availableBooks
    .map(
      (book) =>
        `<option value="${book.id}">${book.title} (${book.stock} in stock)</option>`
    )
    .join("");
}

function showLoanMessage(message, isSuccess) {
  loanMessageEl.textContent = message;
  loanMessageEl.className = isSuccess
    ? "module-message module-success"
    : "module-message module-error";
}

async function submitLoanRequest(event) {
  event.preventDefault();

  const bookId = bookSelect.value;
  const borrower = borrowerInput.value.trim();

  if (!bookId || borrower.length < 2) {
    showLoanMessage("Please select a book and enter a valid borrower name.", false);
    return;
  }

  submitLoanBtn.disabled = true;
  submitLoanBtn.textContent = "Submitting...";

  try {
    const response = await fetch(`${API_BASE_URL}/api/service-b/loans`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookId, borrower })
    });

    const payload = await response.json();
    if (!response.ok) {
      throw new Error(payload.message || "Failed to create loan request");
    }

    borrowerInput.value = "";
    showLoanMessage(
      `Loan created: ${payload.loan.id} for ${payload.loan.borrower}.`,
      true
    );
    await loadDashboard();
  } catch (error) {
    showLoanMessage(error.message, false);
  } finally {
    submitLoanBtn.disabled = false;
    submitLoanBtn.textContent = "Create Loan Request";
  }
}

async function loadDashboard() {
  refreshBtn.disabled = true;
  refreshBtn.textContent = "Loading...";

  try {
    const response = await fetch(`${API_BASE_URL}/api/dashboard`);
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const payload = await response.json();
    renderStats(payload.totals);
    renderBooks(payload.books);
    renderLoans(payload.loans);
    renderBookSelectOptions(payload.books);
  } catch (error) {
    statsEl.innerHTML = `<article class="stat"><h3>Status</h3><strong class="ok">Service issue</strong></article>`;
    bookListEl.innerHTML = `<li>Cannot load books: ${error.message}</li>`;
    loanListEl.innerHTML = "<li>Please ensure all containers are running.</li>";
    showLoanMessage("Cannot load module data from services.", false);
  } finally {
    refreshBtn.disabled = false;
    refreshBtn.textContent = "Refresh Data";
  }
}

refreshBtn.addEventListener("click", loadDashboard);
loanForm.addEventListener("submit", submitLoanRequest);
loadDashboard();
