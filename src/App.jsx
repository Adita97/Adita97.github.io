import React, { useState } from 'react';
import Spinner from './components/Spinner';
import Video from './components/Video';
import Puzzle from './components/Puzzle';
import CodeInput from './components/CodeInput';

const App = () => {
  const [currentStep, setCurrentStep] = useState('spinner');

  const handleSpinnerComplete = () => {
    setCurrentStep('video');
  };

  const handleVideoComplete = () => {
    setCurrentStep('puzzle');
  };

  const handlePuzzleComplete = () => {
    setCurrentStep('code');
  };

  const handleCodeComplete = () => {
    // Replace with your desired redirect URL
    window.location.href = 'https://revolut.me/p/MJpL7QSFEk';
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'spinner':
        return <Spinner onComplete={handleSpinnerComplete} />;
      case 'video':
        return <Video onComplete={handleVideoComplete} />;
      case 'puzzle':
        return <Puzzle onComplete={handlePuzzleComplete} />;
      case 'code':
        return <CodeInput onComplete={handleCodeComplete} />;
      default:
        return <Spinner onComplete={handleSpinnerComplete} />;
    }
  };

  return renderCurrentStep();
};

export default App; 