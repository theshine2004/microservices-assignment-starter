# Service A - Catalog Service

## Overview

Service A owns the book catalog and stock data for the library domain.

## Tech Stack

| Component | Choice |
|-----------|--------|
| Language | JavaScript (Node.js) |
| Framework | Express |
| Storage | In-memory array (assignment demo) |

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| GET | `/books` | List all books |
| GET | `/books/:id` | Get one book by id |
| POST | `/books/:id/reserve` | Reserve one stock unit |

OpenAPI: [../../docs/api-specs/service-a.yaml](../../docs/api-specs/service-a.yaml)

## Run

```bash
docker compose up service-a --build
```

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `5000` | Service listen port |


