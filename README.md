# RetailReady VAS Demo

Small Flask + React (Vite) application that demonstrates how RetailReady transforms complex paper VAS (Value-Added Services) requirements into a guided digital workflow.

## Table of Contents
1. Demo Overview  
2. Tech Stack & Key Decisions *(to be filled in)*  
3. Prerequisites  
4. Getting Started  
   4.1 Backend (Flask)  
   4.2 Frontend (React + Vite)  
   4.3 Running the App  
5. Troubleshooting  
6. Mock-Data Mode  
7. Deployment / Production Build  
8. Contributing

---

## 1. Demo Overview
This repo contains a two-part demo:

* **Backend** – Simple Flask API serving hard-coded VAS requirements for a single SKU.
* **Frontend** – React app (Vite) that guides users through the VAS checklist and shows a success screen when all tasks are complete.

The API lives at `http://localhost:5000`, while the React dev server runs at `http://localhost:5173` (default Vite port).

## 2. Tech Stack & Key Decisions *(to be filled in)*
*(Section to be completed later – will describe why Flask, Vite, proxy vs CORS, etc.)*

## 3. Prerequisites

| Tool | Minimum Version | Check |
|------|-----------------|-------|
| **Node.js** | 18 | `node -v` |
| **Python** | 3.9 | `python --version` |
| **Git** | – | `git --version` |

## 4. Getting Started

### 4.1 Backend (Flask)
```bash
# from repo root
cd backend
python -m venv .venv            # optional but recommended
source .venv/bin/activate       # Windows: .venv\Scripts\activate
pip install -r requirements.txt
python app.py                   # runs on http://localhost:5000
```
*Prefer `python app.py` over `flask run` – no env vars needed and works on all OSes.*

### 4.2 Frontend (React + Vite)
```bash
# open a new terminal tab/window
cd frontend
npm install            # installs React, Vite, Tailwind, ESLint, etc.
npm run dev            # runs on http://localhost:5173
```

### 4.3 Running the App
Run **both** servers in parallel (two terminals). Visit `http://localhost:5173` in your browser. Vite proxies API requests beginning with `/api` to `http://localhost:5000`.

---

## 5. Troubleshooting
| Symptom | Likely Cause | Fix |
|---------|--------------|-----|
| `403` from `/api` | Vite dev-server needs restart after proxy change | Stop & rerun `npm run dev` |
| `ModuleNotFoundError: flask` | Virtual environment not activated or deps not installed | `source .venv/bin/activate && pip install -r requirements.txt` |

## 6. Mock-Data Mode
To run the frontend without the backend, open `frontend/src/components/VASChecklist.jsx` and comment out the `fetch` call, then uncomment the provided `mockData` array.

## 7. Deployment / Production Build
* Build the frontend: `npm run build` (outputs static files to `dist/`).  
* Preview locally: `npm run preview`.
* Deploy backend + static `dist/` on any platform (Render, Fly.io, Heroku, etc.).

## 8. Contributing
1. Frontend lint: `npm run lint`  
2. Future: add backend tests with `pytest`.  
3. Open issues / PRs welcome!
