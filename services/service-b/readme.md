# Service B - Loan Service

## Overview

Service B manages loan records. During loan creation it calls Service A to reserve stock.

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
| GET | `/loans` | List loan records |
| POST | `/loans` | Create loan (reserves a book via Service A) |

OpenAPI: [../../docs/api-specs/service-b.yaml](../../docs/api-specs/service-b.yaml)

## Run

```bash
docker compose up service-b --build
```

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `5000` | Service listen port |
| `SERVICE_A_URL` | `http://service-a:5000` | Internal endpoint used for stock reservation |


