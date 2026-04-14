# API Gateway

## Overview

The gateway is the only public backend entrypoint. It handles:

- CORS
- Route proxying to internal services
- Dashboard data aggregation for frontend

## Tech Stack

| Component | Choice |
|-----------|--------|
| Runtime | Node.js |
| Framework | Express |
| Proxy | http-proxy-middleware |

## Routes

| External Route | Method | Behavior |
|----------------|--------|----------|
| `/` | GET | Gateway status and available routes |
| `/health` | GET | Health check |
| `/api/dashboard` | GET | Aggregate data from service-a and service-b |
| `/api/service-a/*` | ALL | Proxy to `http://service-a:5000/*` |
| `/api/service-b/*` | ALL | Proxy to `http://service-b:5000/*` |

## Run

```bash
docker compose up gateway --build
```

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `8000` | Gateway listen port |
| `SERVICE_A_URL` | `http://service-a:5000` | Internal URL for Service A |
| `SERVICE_B_URL` | `http://service-b:5000` | Internal URL for Service B |

## Notes

- Inside Docker, upstream calls use service DNS names (`service-a`, `service-b`), not localhost.
