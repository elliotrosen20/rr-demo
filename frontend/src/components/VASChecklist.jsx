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
      // const mockData = [
      //   {"id": 1, "requirement_text": "Hang in closed presentation using tucking standard", "step_order": 1},
      //   {"id": 2, "requirement_text": "Apply appropriate black GS1 standard hanger", "step_order": 2},
      //   {"id": 3, "requirement_text": "Ensure no material hangs over end of hanger", "step_order": 3},
      //   {"id": 4, "requirement_text": "Verify side seams remain centered", "step_order": 4}
      // ];
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