# ADE Website

A full-stack web application for a small e-commerce style storefront. The project was built as part of a university software engineering course to practice **separate frontend and backend services**, **REST APIs**, **relational data**, and **containerized local development**. It is intended for learning and demonstration—not as a production system.

---

## Project Overview

ADE Website lets visitors browse a product catalog, inspect product details, manage a shopping cart, and complete a simple checkout flow with order confirmation. Registered users can sign in; the UI supports **English** and **German**. The stack runs locally with **Docker Compose**, so the database, API, and frontend start together without manual service wiring.

---

## Technologies Used

| Area | Stack |
|------|--------|
| **Frontend** | Vue 3, TypeScript, Vite, Vue Router, Pinia, Tailwind CSS |
| **Backend** | Node.js, TypeScript, Express, Prisma ORM, Zod (validation), Argon2 (password hashing) |
| **Database** | PostgreSQL 16 |
| **Environment & tooling** | Docker, Docker Compose, ESLint, Prettier, Git |

---

## Features

- **Product catalog** — Browse products and open detail pages.
- **Shopping cart** — Add or update quantities; cart state can persist for the session (local storage).
- **Checkout** — Collect delivery/contact details, place an order, and see a confirmation.
- **Authentication** — User registration and login backed by the API.
- **Internationalization** — Switch interface language between English and German.
- **Search** — Find products from the catalog.
- **Simulated flows** — Checkout includes a **mock payment** step (no real payments). **Password reset** is simulated (no emails are sent).

---

## Project Structure

```
ade-website/
├── frontend/          # Vue + TypeScript SPA (Vite dev server)
├── backend/           # Express API, Prisma schema, migrations, seed scripts
├── assets/            # Shared/static image assets (where used by the repo layout)
├── docker-compose.yml # Orchestrates db, backend, and frontend for local dev
└── README.md
```

The **frontend** talks to the **backend** over HTTP; the **backend** uses **Prisma** to access **PostgreSQL**. Configuration for local URLs and secrets is supplied via Docker Compose environment variables (see `env.example` files in each service folder).

---

## Our Contributions

This is a **team project** completed as part of coursework. As students, we:

- Designed a **client–server** layout with a Vue SPA and a dedicated REST API.
- Implemented **CRUD-style** product and order flows, **auth** endpoints, and **input validation** on the server.
- Modeled data with **Prisma** and **PostgreSQL**, including **migrations** and a **seed** script for demo products.
- Built **responsive** pages and shared UI state (cart, user, language) on the frontend.
- Added **Dockerfiles** and **Docker Compose** so the full stack runs with one command for reviews and demos.

### Authors

| Name | Student ID |
|------|------------|
| Azra Özdaş | 47786847 |
| Dilay Tarhan | 63750626 |
| Eylül Özekinçi | 42088852 |

---

## How to Run the Project

### Prerequisites

| Tool | Purpose |
|------|---------|
| **Git** | Version control |
| **Node.js (20+)** | Local tooling and scripts (optional if you only use Docker) |
| **npm** or **pnpm** | Package management when working outside containers |
| **Docker** and **Docker Compose** | Containers for database, API, and frontend |
| **Desktop browser** | Open the app at `http://localhost:5173` |

**Windows note:** If Docker Desktop asks you to update WSL, run `wsl --update`, restart Docker Desktop, then retry.

Verify Node (when using it on the host): `node --version` should show v20 or newer.

### Start the stack

1. **Clone the repository**

   ```bash
   git clone https://github.com/azraozdas/ade-website.git
   cd ade-website
   ```

2. **Use the main branch**

   ```bash
   git checkout main
   ```

3. **Build and start all services**

   ```bash
   docker compose up --build
   ```

   This typically:

   - Builds images for the frontend and backend  
   - Starts PostgreSQL  
   - Applies **database migrations**  
   - Runs the **seed** (initial product data)  
   - Starts the **API** on port **8080**  
   - Starts the **frontend** dev server on port **5173**

4. **Open the site**

   [http://localhost:5173](http://localhost:5173)

### Optional: pgAdmin

The compose file defines a **pgAdmin** service under the `tools` profile. To run it (for inspecting the database):

```bash
docker compose --profile tools up -d
```

---

## Using the Website

1. Open the **homepage**.  
2. **Browse** products and open **product details**.  
3. **Add** items to the **cart**.  
4. Go to **checkout**, fill in the form, and **place an order**.  
5. Review the **order confirmation** screen.

Try **register / login**, **language switch** (EN/DE), **search**, and note that **payment** and **password reset** are **demonstration-only** as described above.

---

## Repository

- **URL:** [https://github.com/azraozdas/ade-website](https://github.com/azraozdas/ade-website)  
- **Branch:** `main`

---

## Learning Outcomes

- Structuring a **monorepo-style** project with clear **frontend** and **backend** boundaries.  
- Consuming a **REST API** from a **Vue** SPA with **TypeScript** and typed client code.  
- Using **Prisma** for schema definition, **migrations**, and type-safe database access.  
- Applying **validation** and basic **API security** practices (e.g. hashing passwords, HTTP headers middleware).  
- Running a **multi-container** dev environment with **Docker Compose** and health-dependent startup.  
- Collaborating with **Git** on a shared codebase.

---

## Future Improvements

- Automated **tests** (unit and API integration) in CI.  
- Stricter **environment-based configuration** and secrets handling for non-local deployments.  
- **Rate limiting** and **observability** (structured logging, metrics) tuned for real traffic.  
- **Accessibility** pass (keyboard navigation, ARIA) and **performance** profiling on the frontend.  
- Optional **real** email provider for password reset and order notifications in a staging environment.
