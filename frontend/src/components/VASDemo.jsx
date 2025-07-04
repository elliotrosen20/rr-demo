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