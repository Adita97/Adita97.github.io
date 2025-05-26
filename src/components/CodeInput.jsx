import React, { useState } from 'react';
import styled from 'styled-components';

const CodeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: #f8f9fa;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  padding: 20px;
  box-sizing: border-box;
`;

const Title = styled.h2`
  font-size: 8vw;
  color: #ff69b4;
  margin-bottom: 30px;
  text-align: center;
`;

const Input = styled.input`
  padding: 15px;
  font-size: 6vw;
  margin: 20px 0;
  border: 3px solid #ff69b4;
  border-radius: 10px;
  text-align: center;
  width: 80vw;
  max-width: 300px;
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
  &:focus {
    outline: none;
    border-color: #ff1493;
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
  }
`;

const Button = styled.button`
  padding: 15px 30px;
  font-size: 5vw;
  background-color: #ff69b4;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  max-width: 300px;
  width: 80vw;
  font-weight: bold;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background-color: #ff1493;
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const ErrorMessage = styled.p`
  color: #ff0000;
  margin-top: 20px;
  font-size: 4vw;
  text-align: center;
  max-width: 80%;
`;

const CodeInput = ({ onComplete }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (code === '12345') {
      onComplete();
    } else {
      setError('Cod invalid. Vă rugăm să încercați din nou.');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <CodeContainer>
      <Title>💌</Title>
      <Title>Introduceți Codul</Title>
      <Input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Introduceți codul"
        autoFocus
      />
      <Button onClick={handleSubmit}>Trimite</Button>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </CodeContainer>
  );
};

export default CodeInput; 