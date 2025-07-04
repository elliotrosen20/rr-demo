# RetailReady VAS Demo

Small Flask + React (Vite) application that demonstrates how RetailReady transforms complex paper VAS (Value-Added Services) requirements into a guided digital workflow.

## Table of Contents
1. Demo Overview  
2. Tech Stack & Key Decisions  
3. Getting Started  
   3.1 Backend (Flask)  
   3.2 Frontend (React + Vite)  
   3.3 Running the App  
4. Troubleshooting  
5. Mock-Data Mode  
6. Deployment / Production Build  
7. Contributing

---

## 1. Demo Overview
This repo contains a two-part demo:

* **Backend** – Simple Flask API serving hard-coded VAS requirements for a single SKU.
* **Frontend** – React app (Vite) that guides users through the VAS checklist and shows a success screen when all tasks are complete.

The API lives at `http://localhost:5000`, while the React dev server runs at `http://localhost:5173` (default Vite port).

## 2. Tech Stack & Key Decisions

### Architecture Choices
- **Flask** - Flask's lightweight nature allows for rapid prototyping, which worked well for quickly developing this demo's features.
- **React + Vite** - React provides a modern frontend for component-based architecture with local state management.
- **RESTful API Design** - The APIs in the backend follow REST conventions with resource-based URLs and appropriate HTTP methods. There is a single primary endpoint with additional functional routes showing the full API design.
- **Hardcoded Data** - For demo purposes, real implementation would use a relational SQL database. I decided to use hardcoded mock data to focus on UX and API integration rather than database setup complexity.
- **Component Architecture** - I separated the workflow into distinct React components (VASDemo, VASChecklist, Success). Each component has a single responsibility, making the code easier to modify and extend as requirements evolve.
- **User Flow** - I designed a linear 3-step workflow (landing -> checklist -> success) to mirror the structured nature of the VAS process, such that users can't skip critical steps. After opening the checklist component, there is a fetch call to the backend to retrieve the VAS requirements for that particular SKU. The 'Complete VAS' button only enables after all requirements are checked, ensuring 100% task completion.

### Database Schema (Production)
While this demo uses hardcoded data, a production version would use this schema:

```sql
CREATE TABLE IF NOT EXISTS stores (
    id INTEGER PRIMARY KEY,
    name VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS skus (
    id INTEGER PRIMARY KEY,
    name VARCHAR(100),
    store_id INTEGER,
    FOREIGN KEY (store_id) REFERENCES stores(id)
);

CREATE TABLE IF NOT EXISTS vas_requirements (
    id INTEGER PRIMARY KEY,
    sku_id INTEGER,
    requirement_text TEXT,
    step_order INTEGER,
    FOREIGN KEY (sku_id) REFERENCES skus(id)
);
```

## 3. Getting Started

### 3.1 Backend (Flask)
```bash
# from repo root
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python app.py
```
*Prefer `python app.py` over `flask run` – no env vars needed and works on all OSes.*

### 3.2 Frontend (React + Vite)
```bash

cd frontend
npm install
npm run dev
```

### 3.3 Running the App
Run **both** servers in parallel (two terminals). Visit `http://localhost:5173` in your browser. Vite proxies API requests beginning with `/api` to `http://localhost:5000`.

---

## 4. Troubleshooting
| Symptom | Likely Cause | Fix |
|---------|--------------|-----|
| `403` from `/api` | Vite dev-server needs restart after proxy change | Stop & rerun `npm run dev` |
| `ModuleNotFoundError: flask` | Virtual environment not activated or deps not installed | `source .venv/bin/activate && pip install -r requirements.txt` |

## 5. Mock-Data Mode
To run the frontend without the backend, open `frontend/src/components/VASChecklist.jsx` and comment out the `fetch` call, then uncomment the provided `mockData` array and change `data` to `mockData` in the `setRequirements` call.
