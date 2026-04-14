# 🚀 Microservices Assignment — Student Guide

[![GitHub Stars](https://img.shields.io/github/stars/hungdn1701/microservices-assignment-starter?style=social)](https://github.com/hungdn1701/microservices-assignment-starter/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/hungdn1701/microservices-assignment-starter?style=social)](https://github.com/hungdn1701/microservices-assignment-starter/forks)

> 📋 Step-by-step guide for students. Read this carefully before starting.

---

## ⚡ Quick Start

### Step 1 — Create a GitHub account

If you don't have an account yet, sign up at https://github.com/signup

---

### Step 2 — Star ⭐ and Fork the starter repo

1. Open the starter repo: https://github.com/hungdn1701/microservices-assignment-starter
2. Click the **⭐ Star** button (top-right corner of the page)
3. Click **Fork** → select your account → **Create fork**

> 📌 After forking, you will have a copy at:
> `https://github.com/<your-username>/microservices-assignment-starter`

---

### Step 3 — Install required tools

#### Git

| OS | How to install |
|-----|----------------|
| **Windows** | Download from https://git-scm.com/download/win → install with defaults |
| **macOS** | Open Terminal → type `git --version` (installs automatically if missing) |
| **Linux** | `sudo apt install git` |

Verify:
```bash
git --version
# → git version 2.x.x means it's installed
```

#### Docker Desktop

Download and install from https://docs.docker.com/get-docker/

Verify:
```bash
docker --version
# → Docker version 2x.x.x means it's installed

docker compose version
# → Docker Compose version v2.x.x means it's installed
```

> ⚠️ On Windows, make sure Docker Desktop is running (🐳 icon in the taskbar).

---

### Step 4 - Clone your fork locally

Open Terminal (or Git Bash on Windows):

```bash
git clone https://github.com/<your-username>/microservices-assignment-starter.git
cd microservices-assignment-starter
```

> Replace `<your-username>` with your actual GitHub username.

---

### Step 5 - Accept the assignment from GitHub Classroom

1. Open the assignment link from your instructor (format: `https://classroom.github.com/a/...`).
2. Click **Accept this assignment**.
3. If prompted, select your identifier from the **roster list**.
4. If this is a group assignment, choose your team (or create it if your instructor allows).
5. GitHub Classroom will create a dedicated repository for you/team:
   `https://github.com/<org-name>/<assignment-name>-<your-username>`
6. Clone that assignment repository:

```bash
git clone https://github.com/<org-name>/<assignment-name>-<your-username>.git
cd <assignment-name>-<your-username>
```

7. Copy all files from the starter folder (cloned in Step 4) into the assignment folder, excluding `.git`:

**Windows (PowerShell):**
```powershell
# Run inside your assignment folder
Copy-Item -Path ..\microservices-assignment-starter\* -Destination . -Recurse -Force -Exclude ".git"
```

**macOS / Linux:**
```bash
# Run inside your assignment folder
rsync -av --exclude='.git' ../microservices-assignment-starter/ .
```

8. Create your first commit:

```bash
git add .
git commit -m "Initial setup from starter template"
git push
```

> Your assignment repository now contains the full starter structure and is ready for development.
>
> If you cannot find your name in the roster, stop here and contact your instructor. Do not continue with a random roster entry.

---

## 📝 Quy Trình Phát Triển

### Giai Đoạn 1: Phân Tích & Thiết Kế

Áp dụng lộ trình đã hoàn thành sau cho dự án hiện tại (Hệ thống yêu cầu mượn sách thư viện):

- [x] Đọc `GETTING_STARTED.md` để xác nhận ràng buộc bài tập và các đầu ra bắt buộc
- [x] Chọn một hướng phân tích: **Approach 1 - SOA (Erl)**
- [x] Hoàn thiện `docs/analysis-and-design.md` gồm:
   - Định nghĩa quy trình nghiệp vụ và tác nhân
   - Phân rã hành động và xác định service candidate
   - Ánh xạ resource/method và phương án service composition
- [x] Xác định các service cụ thể cho miền nghiệp vụ:
   - Service A: Catalog + giữ chỗ tồn kho
   - Service B: Quản lý khoản mượn
   - Gateway: định tuyến + tổng hợp
   - Frontend: dashboard UI

### Giai Đoạn 2: Kiến Trúc & API

- [x] Hoàn thiện `docs/architecture.md` với các pattern đã chọn và lý do
- [x] Xác định rõ trách nhiệm service, ma trận giao tiếp và mô hình triển khai
- [x] Triển khai và đồng bộ OpenAPI với mã nguồn:
   - `docs/api-specs/service-a.yaml`
   - `docs/api-specs/service-b.yaml`
- [x] Duy trì giao tiếp liên service bằng Docker DNS name (không dùng localhost)

### Giai Đoạn 3: Triển Khai

- [x] Chọn stack:
   - Backend/Gateway: Node.js + Express
   - Frontend: HTML/CSS/JS được phục vụ bởi Nginx
- [x] Cập nhật Dockerfile cho frontend, gateway, service-a và service-b
- [x] Triển khai `GET /health` cho tất cả service
- [x] Triển khai endpoint nghiệp vụ:
   - Service A: `GET /books`, `GET /books/:id`, `POST /books/:id/reserve`
   - Service B: `GET /loans`, `POST /loans`
- [x] Cấu hình route gateway:
   - `GET /api/dashboard`
   - Proxy `/api/service-a/*`
   - Proxy `/api/service-b/*`
- [x] Xây dựng frontend dashboard tại `frontend/src/`

### Giai Đoạn 4: Hoàn Thiện

- [x] Kiểm tra vận hành end-to-end với `docker compose up --build`
- [x] Kiểm tra các endpoint bắt buộc:
   - Gateway root và health
   - Service A health
   - Service B health
   - Frontend trên cổng 3000
- [x] Cập nhật tài liệu dự án:
   - `README.md`
   - `services/service-a/readme.md`
   - `services/service-b/readme.md`
   - `gateway/readme.md`
   - `frontend/readme.md`
- [ ] Điền thông tin nhóm/thành viên cuối cùng trong `README.md` trước khi nộp

---

## 💻 How to Submit

Throughout development, **commit frequently** after each completed part:

```bash
git add .
git commit -m "Complete analysis and design"
git push
```

```bash
git add .
git commit -m "Implement service-a health endpoint"
git push
```

> ✅ Every `push` = your instructor can see your progress.
>
> ⏰ **Deadline** = the timestamp of your last commit is what counts.
>
> ❌ **No** Pull Request or additional submission notification needed.

---

## ✅ Pre-submission Checklist

- [ ] `README.md` updated with team info and service descriptions
- [ ] All services start with: `docker compose up --build`
- [ ] Every service has a working `GET /health` endpoint
- [ ] `docs/analysis-and-design.md` (or `analysis-and-design-ddd.md`) completed
- [ ] `docs/architecture.md` completed
- [ ] OpenAPI specs in `docs/api-specs/` match implementation
- [ ] Each service has its own `readme.md`
- [ ] Code is clean, organized, and follows the chosen language conventions

---

## 🎯 Key Tips

| # | Tip | Why |
|---|-----|-----|
| 1 | Analysis first, code second | Clear domain understanding → fewer wrong turns |
| 2 | `GET /health` is your first endpoint | Confirms the service runs inside Docker |
| 3 | Run `docker compose up --build` frequently | Don't wait until the end to test |
| 4 | One service per team member | Split by service, not by layer |
| 5 | Small commits, commit frequently | Easy to roll back, shows progress to instructor |
| 6 | Use service names, not `localhost` | Use `http://service-a:5000` not `http://localhost:5001` |
| 7 | Never hardcode passwords in code | Use `.env` for all configuration |
| 8 | Use AI tools to assist | See `.ai/vibe-coding-guide.md` in the repo |

---

## ❓ Common Errors

| Error | Cause | Fix |
|-------|-------|-----|
| `docker: command not found` | Docker Desktop not installed | Install from https://docs.docker.com/get-docker/ |
| `Cannot connect to Docker daemon` | Docker Desktop not running | Open Docker Desktop and wait for the 🐳 icon |
| `port is already in use` | Port occupied by another app | Stop that app or change the port in `docker-compose.yml` |
| Service A cannot call Service B | Using `localhost` instead of service name | Change to `http://service-b:5000` |
| `git push` rejected | Remote has unpulled changes | Run `git pull --rebase` then push again |

---

## 📚 References

- [Starter Template Repo](https://github.com/hungdn1701/microservices-assignment-starter)
- [GETTING_STARTED.md](https://github.com/hungdn1701/microservices-assignment-starter/blob/main/GETTING_STARTED.md) — Detailed project guide inside the repo
- [Docker Compose Docs](https://docs.docker.com/compose/)
- [OpenAPI 3.0 Specification](https://swagger.io/specification/)

---

> 💡 Questions? Contact your instructor via email or post on GitHub Discussions in the starter repo.
>
> **Good luck!** 💪🚀
