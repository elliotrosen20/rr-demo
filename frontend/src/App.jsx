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
