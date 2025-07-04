import React from 'react';

const VASDemo = ({ onStartVAS }) => {
  return (
    <div className="text-center p-8 flex flex-col items-center gap-8">
      <h1 className="text-3xl font-bold text-gray-800">VAS Demo</h1>
      
      <div className="border border-gray-300 rounded-lg p-6 bg-gray-50 max-w-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Store: Dick's Sporting Goods</h2>
        <h3 className="text-lg text-gray-600 mb-4">SKU: Athletic Bottoms - Size M</h3>
      </div>
      
      <button 
        onClick={onStartVAS}
      >
        Action Required
      </button>
    </div>
  );
};

export default VASDemo; 