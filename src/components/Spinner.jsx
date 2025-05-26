import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const SpinnerContainer = styled.div`
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
`;

const SpinningEmoji = styled.div`
  font-size: 4rem;
  animation: ${spin} 2s linear infinite;
  margin-bottom: 1rem;
`;

const RulesList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-top: 2rem;
  margin-bottom: 2rem;
  text-align: center;
`;

const RuleItem = styled.li`
  margin: 1rem 0;
  font-size: 1.2rem;
  color: #333;
`;

const ReadyButton = styled.button`
  padding: 15px 30px;
  font-size: 1.2rem;
  background-color: #ff69b4;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
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

const Spinner = ({ onComplete }) => {
  const rules = [
    "Pasul 1: Fiți prezenți și bucurați-vă de moment",
    "Pasul 2: Uitați-vă la tot videoclipul",
    "Pasul 3: Completați puzzle-ul",
    "Pasul 4: Introduceți codul corect"
  ];

  return (
    <SpinnerContainer>
      <SpinningEmoji>💒</SpinningEmoji>
      <RulesList>
        {rules.map((rule, index) => (
          <RuleItem key={index}>{rule}</RuleItem>
        ))}
      </RulesList>
      <ReadyButton onClick={onComplete}>
        Suntem Gata!
      </ReadyButton>
    </SpinnerContainer>
  );
};

export default Spinner; 