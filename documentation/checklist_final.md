# Implementation Checklist - VAS Demo Application

## Prerequisites
- [ ] Read `overall_architecture.md` for complete context
- [ ] Ensure Python 3.x and Node.js are installed
- [ ] Have basic familiarity with Flask and React

---

## Phase 1: Backend Setup (Target: 20 minutes)

### Step 1: Create Simple Flask API
- [ ] **File:** Create `api/app.py`
- [ ] **Content:** Add the following code:

```python
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# Hardcoded VAS requirements data (no database needed)
VAS_REQUIREMENTS = [
    {"id": 1, "requirement_text": "Hang in closed presentation using tucking standard", "step_order": 1},
    {"id": 2, "requirement_text": "Apply appropriate black GS1 standard hanger", "step_order": 2},
    {"id": 3, "requirement_text": "Ensure no material hangs over end of hanger", "step_order": 3},
    {"id": 4, "requirement_text": "Verify side seams remain centered", "step_order": 4}
]

@app.route('/api/skus/1/vas-requirements', methods=['GET'])
def get_vas_requirements():
    """Get VAS requirements for SKU 1 (Athletic Bottoms)"""
    return jsonify(VAS_REQUIREMENTS)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
```

### Step 2: Create Requirements File
- [ ] **File:** Create `api/requirements.txt`
- [ ] **Content:**

```
Flask
Flask-CORS
```

### Step 3: Install Python Dependencies
- [ ] **Command:** `cd api`
- [ ] **Command:** `pip install -r requirements.txt`
- [ ] **Verify:** No error messages during installation

### Step 4: Test API Endpoint
- [ ] **Command:** `python app.py` (from api folder)
- [ ] **Verify:** Console shows "Running on http://127.0.0.1:5000"
- [ ] **Test:** Open browser to `http://localhost:5000/api/skus/1/vas-requirements`
- [ ] **Verify:** Should see JSON with 4 requirements
- [ ] **Keep server running** for frontend development

**✅ Backend Checkpoint:** If the URL returns JSON data, the backend is working!

### Step 5: Configure Vite Proxy for API Calls
- [ ] **File:** Edit `vite.config.ts` (in project root)
- [ ] **Replace content with:**

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Flask backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
```

- [ ] **Purpose:** This allows frontend to call `/api/*` routes and have them forwarded to Flask backend

---

## Phase 2: Frontend Setup (Target: 60 minutes)

### Step 6: Create Components Folder
- [ ] **Command:** `mkdir src/components`

### Step 7: Build VASDemo Component
- [ ] **File:** Create `src/components/VASDemo.jsx`
- [ ] **Content:**

```javascript
import React from 'react';

const VASDemo = ({ onStartVAS }) => {
  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>RetailReady VAS Demo</h1>
      <div style={{ margin: '2rem 0', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h2>Store: Dick's Sporting Goods</h2>
        <h3>SKU: Athletic Bottoms - Size M</h3>
        <p>This demo shows how RetailReady transforms complex paper requirements into guided digital workflows.</p>
      </div>
      <button 
        onClick={onStartVAS}
        style={{ 
          padding: '1rem 2rem', 
          fontSize: '1.2rem', 
          backgroundColor: '#007bff', 
          color: 'white', 
          border: 'none', 
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Begin VAS Check
      </button>
    </div>
  );
};

export default VASDemo;
```

### Step 8: Build VASChecklist Component
- [ ] **File:** Create `src/components/VASChecklist.jsx`
- [ ] **Content:**

```javascript
import React, { useState, useEffect } from 'react';

const VASChecklist = ({ onComplete }) => {
  const [requirements, setRequirements] = useState([]);
  const [completedItems, setCompletedItems] = useState(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequirements();
  }, []);

  const fetchRequirements = async () => {
    try {
      const response = await fetch('/api/skus/1/vas-requirements');
      const data = await response.json();
      setRequirements(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching requirements:', error);
      setLoading(false);
    }
  };

  const handleCheckboxChange = (id) => {
    const newCompleted = new Set(completedItems);
    if (newCompleted.has(id)) {
      newCompleted.delete(id);
    } else {
      newCompleted.add(id);
    }
    setCompletedItems(newCompleted);
  };

  const handleComplete = () => {
    onComplete();
  };

  const allCompleted = requirements.length > 0 && completedItems.size === requirements.length;

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading VAS requirements...</div>;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>VAS Requirements - Athletic Bottoms</h2>
      <p>Complete all requirements below:</p>
      
      <div style={{ margin: '2rem 0' }}>
        {requirements.map((req) => (
          <div key={req.id} style={{ margin: '1rem 0', padding: '1rem', border: '1px solid #ddd', borderRadius: '5px' }}>
            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={completedItems.has(req.id)}
                onChange={() => handleCheckboxChange(req.id)}
                style={{ marginRight: '1rem' }}
              />
              <span>{req.requirement_text}</span>
            </label>
          </div>
        ))}
      </div>

      <button
        onClick={handleComplete}
        disabled={!allCompleted}
        style={{
          padding: '1rem 2rem',
          fontSize: '1.2rem',
          backgroundColor: allCompleted ? '#28a745' : '#ccc',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: allCompleted ? 'pointer' : 'not-allowed'
        }}
      >
        Complete VAS
      </button>
    </div>
  );
};

export default VASChecklist;
```

### Step 9: Build Success Component
- [ ] **File:** Create `src/components/Success.jsx`
- [ ] **Content:**

```javascript
import React from 'react';

const Success = ({ onRestart }) => (
  <div style={{ textAlign: 'center', padding: '2rem' }}>
    <h1 style={{ color: '#28a745' }}>✅ VAS Completed Successfully!</h1>
    <p>All Value Added Services requirements have been completed for Athletic Bottoms - Size M</p>

    <button
      onClick={onRestart}
      style={{
        padding: '1rem 2rem',
        fontSize: '1.2rem',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
      }}
    >
      Start Over
    </button>
  </div>
);

export default Success;
```

### Step 10: Update Main App Component
- [ ] **File:** Replace content of `src/App.jsx` with:

```javascript
import React, { useState } from 'react';
import VASDemo from './components/VASDemo';
import VASChecklist from './components/VASChecklist';
import Success from './components/Success';
import './App.css';

function App() {
  const [currentStep, setCurrentStep] = useState('demo');

  const handleStartVAS = () => {
    setCurrentStep('checklist');
  };

  const handleComplete = () => {
    setCurrentStep('success');
  };

  const handleRestart = () => {
    setCurrentStep('demo');
  };

  return (
    <div className="App">
      {currentStep === 'demo' && <VASDemo onStartVAS={handleStartVAS} />}
      {currentStep === 'checklist' && <VASChecklist onComplete={handleComplete} />}
      {currentStep === 'success' && <Success onRestart={handleRestart} />}
    </div>
  );
}

export default App;
```

### Step 11: Install Node Dependencies
- [ ] **Command:** Open new terminal, navigate to project root
- [ ] **Verify:** You should be in the folder with `package.json` (not in the `api/` folder)
- [ ] **Command:** `npm install`
- [ ] **Verify:** No error messages, `node_modules/` folder is created
- [ ] **Purpose:** Installs React, Vite and all frontend dependencies

### Step 12: Test Frontend
- [ ] **Command:** `npm run dev` (from project root)
- [ ] **Verify:** Vite starts on `http://localhost:5173`
- [ ] **Test:** Should see VAS Demo page with "Begin VAS Check" button

---

## Phase 3: Integration Testing (Target: 20 minutes)

### Step 13: Test Complete Workflow
- [ ] **Action:** Click "Begin VAS Check" button
- [ ] **Verify:** Should see 4 VAS requirements loaded from API
- [ ] **Action:** Check all 4 checkboxes
- [ ] **Verify:** "Complete VAS" button becomes enabled (green)
- [ ] **Action:** Click "Complete VAS" button
- [ ] **Verify:** Success page appears with completed tasks listed
- [ ] **Action:** Click "Start Over" button
- [ ] **Verify:** Returns to initial demo page

### Step 14: Test API Integration
- [ ] **Action:** Open browser dev tools → Network tab
- [ ] **Verify:** Single GET request returns 200 status

### Step 15: Test Error Handling
- [ ] **Action:** Stop Flask backend (Ctrl+C in backend terminal)
- [ ] **Action:** Refresh frontend and click "Begin VAS Check"
- [ ] **Verify:** Should show "Loading VAS requirements..." (graceful failure)
- [ ] **Action:** Restart Flask backend (`python app.py`)
- [ ] **Action:** Refresh frontend
- [ ] **Verify:** Workflow works again

---

## Phase 4: Final Polish (Target: 10 minutes)

### Step 16: Update Page Title
- [ ] **File:** Edit `index.html`
- [ ] **Change:** `<title>` to "RetailReady VAS Demo"

### Step 17: Clean Up Console
- [ ] **Action:** Open browser dev tools console
- [ ] **Verify:** No error messages during normal workflow
- [ ] **Fix:** Any console errors if present

### Step 18: Test Page Refresh
- [ ] **Action:** Complete full workflow to success page
- [ ] **Action:** Refresh page (F5)
- [ ] **Verify:** Returns to demo start page (state reset works)

---

## Final Verification Checklist

### Backend Verification
- [ ] Flask server runs without errors
- [ ] GET `/api/skus/1/vas-requirements` returns 4 requirements

### Frontend Verification
- [ ] React app loads without errors
- [ ] All 4 components render correctly
- [ ] Navigation between steps works
- [ ] GET API call works properly
- [ ] State management works (checkboxes, buttons)
- [ ] Page refresh resets to start

### User Experience Verification
- [ ] Complete user journey works end-to-end
- [ ] Loading states appear appropriately
- [ ] Button states change correctly (enabled/disabled)
- [ ] Success page shows completed tasks
- [ ] Demo can be restarted multiple times

---

## Troubleshooting Guide

### Common Issues:

**CORS Errors:**
- Verify Flask-CORS is installed and imported
- Check that CORS(app) is called in Flask app

**API Not Found (404):**
- Verify Flask server is running on port 5000
- Check Vite proxy configuration in `vite.config.js`
- Ensure endpoint URLs match exactly

**Data Issues:**
- Check that `VAS_REQUIREMENTS` array is properly defined in Flask app
- Verify JSON response format matches frontend expectations

**JavaScript Errors:**
- Check browser console for syntax errors
- Verify all imports use correct paths

**React Component Issues:**
- Check browser console for detailed error messages
- Verify all props are passed correctly
- Ensure useState hooks are used properly

---

## Success Criteria

**Minimum Viable Demo:**
- [ ] Backend serves VAS requirements from hardcoded data
- [ ] Frontend displays requirements as checkboxes
- [ ] User can complete workflow and see success
- [ ] Demo can be restarted

**Full Success:**
- [ ] Complete end-to-end workflow functions perfectly
- [ ] Clean, professional appearance
- [ ] No console errors
- [ ] Demonstrates RetailReady's value proposition clearly

**Time Management:**
- If behind schedule, focus on core functionality over styling
- Better to have working demo with basic styling than polished non-functional app
- Document any incomplete features in README

This checklist provides step-by-step implementation guidance. Following each step exactly should result in a fully functional VAS demo application. 