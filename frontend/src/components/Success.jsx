import React from 'react';

const Success = ({ onRestart }) => (
  <div className="text-center p-8 flex flex-col items-center gap-6">
    <h1 className="text-green-600 text-4xl font-bold">✅ VAS Completed Successfully!</h1>
    <p className="text-gray-700 text-lg max-w-md">
      All Value Added Services requirements have been completed for Athletic Bottoms - Size M
    </p>

    <button
      onClick={onRestart}
    >
      Start Over
    </button>
  </div>
);

export default Success; 