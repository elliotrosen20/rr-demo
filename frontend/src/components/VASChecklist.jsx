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
    return <div className="text-center p-8 text-lg text-gray-600">Loading VAS requirements...</div>;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Please Follow Instructions</h2>
        <p className="text-gray-600">SKU: Athletic Bottoms - Size M</p>
      </div>
      
      <div className="space-y-4 mb-8">
        {requirements.map((req) => (
          <div key={req.id} className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={completedItems.has(req.id)}
                onChange={() => handleCheckboxChange(req.id)}
                className="mr-4 w-5 h-5 text-blue-600 rounded focus:ring-blue-500 focus:ring-2"
              />
              <span className="text-gray-700 text-lg">{req.requirement_text}</span>
            </label>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
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
    </div>
  );
};

export default VASChecklist; 