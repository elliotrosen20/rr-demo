# README Notes

## Backend Execution Approach (Flask)

- **Preferred command:** `python app.py` (from the `backend` folder).
- **Why this is reviewer-friendly:**
  1. **Zero extra environment variables** – Reviewers don't have to set `FLASK_APP` or `FLASK_ENV`.
  2. **Works across all OS / shells** – Any system with Python 3 can run a file directly.
  3. **Debug reloader included** – `debug=True` in `app.run()` provides auto-reload & traceback just like `flask run --debug`.
  4. **Production flexibility** – Advanced users can still import the `app` object into another WSGI server (e.g., Gunicorn) if they choose.

### Quick-start steps for reviewers

```bash
# 1. Install Python dependencies
cd backend
pip install -r requirements.txt

# 2. Start the API server
python app.py  # runs on http://localhost:5000
```

## Frontend Mock Data Toggle

- In `frontend/src/components/VASChecklist.jsx` the API fetch can be mocked by commenting out the `fetch` call and using the provided `mockData` array.
- This allows the React UI to be tested without the backend running.

---

(Add additional notes and polish sections here as development progresses.) 