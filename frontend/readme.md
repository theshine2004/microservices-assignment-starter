# Frontend

## Overview

The frontend is a static dashboard page served by Nginx. It fetches data from the API Gateway and displays:

- Total books
- Units in stock
- Total loan requests
- Detailed book and loan lists

## Tech Stack

| Component | Choice |
|-----------|--------|
| UI | Plain HTML, CSS, JavaScript |
| Web server | Nginx (Docker) |

## Run

```bash
# From project root
docker compose up frontend --build
```

Open: http://localhost:3000

## Project Structure

```text
frontend/
├── Dockerfile
├── readme.md
└── src/
	├── index.html
	├── styles.css
	└── app.js
```

## Notes

- The UI calls the gateway endpoint: `http://localhost:8080/api/dashboard`.
- In this assignment setup, frontend does not call services directly.