# README Notes

## Prerequisites

- **Node.js** ≥ 18 (`node -v`)
- **Python** ≥ 3.9 (`python --version`)
- **Git**

## Repository Setup

```bash
# Clone and enter the project
git clone <repo-url>
cd rr-demo
```

## Backend Setup (Flask API)

```bash
cd backend
python -m venv .venv            # optional but recommended
source .venv/bin/activate       # Windows: .venv\Scripts\activate
pip install -r requirements.txt
python app.py                   # runs on http://localhost:5000
```

- **Preferred command:** `python app.py` (works everywhere, no env vars needed).
- To run on another port, update the `port` in `backend/app.py` **and** the proxy target in `frontend/vite.config.js`.

## Frontend Setup (React + Vite)

```bash
cd frontend
npm install            # installs React, Vite, Tailwind, ESLint, etc.
npm run dev            # runs on http://localhost:5173
```

## API Proxy (Vite)

- All requests beginning with `/api` are automatically forwarded to `http://localhost:5000` via `frontend/vite.config.js`.
- Whenever you change the proxy settings, restart `npm run dev` so Vite picks up the new config.

## Frontend Mock-Data Toggle

- In `frontend/src/components/VASChecklist.jsx` you can comment/uncomment the `fetch` API call and the `mockData` array to run the UI without the backend.

## Linting / Formatting

- **Frontend:** `npm run lint` (ESLint with React rules).
- **Backend:** add tests later (e.g. `pytest`).

## Quick Troubleshooting

| Symptom | Likely Cause | Fix |
|---------|--------------|-----|
| `403` from `/api` | Vite dev-server needs restart after proxy change | Stop & rerun `npm run dev` |
| `ModuleNotFoundError: flask` | Virtual environment not activated or deps not installed | `source .venv/bin/activate && pip install -r requirements.txt` |

## Optional Enhancements

- Production builds: `npm run build` (frontend); serve with `vite preview` or any static host.
- Possible deployment targets: Render (Flask) + Netlify (React), Fly.io, or Heroku.
- Add backend tests with `pytest`; document how to run them.

---

(Add additional notes and polish sections here as development progresses.) 