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