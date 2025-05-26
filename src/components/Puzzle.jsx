import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';

const glow = keyframes`
  0% { filter: drop-shadow(0 0 2px #ff69b4); }
  50% { filter: drop-shadow(0 0 8px #ff69b4); }
  100% { filter: drop-shadow(0 0 2px #ff69b4); }
`;

const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(5deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const PuzzleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: #f8f9fa;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  padding: 20px;
  box-sizing: border-box;
`;

const Title = styled.h2`
  font-size: 8vw;
  color: #ff69b4;
  margin-bottom: 10px;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
`;

const Instructions = styled.p`
  font-size: 4vw;
  color: #666;
  margin-bottom: 20px;
  text-align: center;
  max-width: 80%;
`;

const GameArea = styled.div`
  position: relative;
  width: 90%;
  height: 60vh;
  background: linear-gradient(135deg, #fff5f8 0%, #fff 100%);
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  cursor: pointer;
  margin: 20px 0;
`;

const Item = styled.div`
  position: absolute;
  font-size: 5vw;
  transition: all 0.3s ease;
  user-select: none;
  cursor: pointer;
  opacity: ${props => props.$isRing ? 0.9 : 1};
  animation: ${props => props.$isRing ? css`${float} 3s ease-in-out infinite` : 'none'};
  filter: ${props => props.$isRing ? 'drop-shadow(0 0 5px rgba(255, 105, 180, 0.5))' : 'none'};
  
  &:hover {
    transform: scale(1.2);
    z-index: 2;
  }
`;

const Message = styled.div`
  font-size: 5vw;
  color: ${props => props.$success ? '#4CAF50' : '#ff69b4'};
  margin: 10px 0;
  text-align: center;
  animation: ${props => props.$success ? css`${glow} 2s infinite` : 'none'};
`;

const Score = styled.div`
  font-size: 4vw;
  color: #666;
  margin: 10px 0;
  display: flex;
  gap: 20px;
`;

const ScoreItem = styled.div`
  background: white;
  padding: 10px 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Puzzle = ({ onComplete }) => {
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState('Găsește inelul ascuns! 💍');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [remainingItems, setRemainingItems] = useState(35);

  const weddingItems = [
    '👗', '🎂', '💐', '📸', '💃', '💋', '❤️', '🎁', '🍾',
    '🎵', '🎊', '🎉', '💒', '👰', '🤵', '💑', '💝', '💖', '💗',
    '🎭', '🎪', '🎨', '🎯', '🎲', '🎮', '🎸', '🎹', '🎺', '🎻'
  ];

  const ringTypes = ['💍', '💎', '💫', '✨', '🌟'];
  const realRingType = ringTypes[Math.floor(Math.random() * ringTypes.length)];

  const generateRandomPosition = () => {
    // Add some padding to prevent items from being too close to the edges
    const padding = 5;
    return {
      x: padding + Math.random() * (90 - 2 * padding),
      y: padding + Math.random() * (90 - 2 * padding)
    };
  };

  useEffect(() => {
    const newItems = [];
    const ringPosition = Math.floor(Math.random() * 35);
    
    for (let i = 0; i < 35; i++) {
      const isRing = i === ringPosition;
      const emoji = isRing ? realRingType : 
        Math.random() < 0.3 ? ringTypes[Math.floor(Math.random() * ringTypes.length)] :
        weddingItems[Math.floor(Math.random() * weddingItems.length)];
      
      const position = generateRandomPosition();
      
      newItems.push({
        emoji,
        isRing,
        x: position.x,
        y: position.y,
        rotation: Math.random() * 360,
        scale: isRing ? 0.9 : 1,
        id: i
      });
    }
    setItems(newItems);

    const shuffleTimer = setInterval(() => {
      if (!gameOver) {
        setItems(prevItems => 
          prevItems.map(item => {
            const newPosition = generateRandomPosition();
            return {
              ...item,
              x: newPosition.x,
              y: newPosition.y,
              rotation: Math.random() * 360
            };
          })
        );
      }
    }, 2000);

    return () => clearInterval(shuffleTimer);
  }, []);

  const handleItemClick = (index) => {
    if (gameOver) return;

    if (items[index].isRing) {
      setMessage(`Ai găsit inelul! ${realRingType}`);
      setGameOver(true);
      setTimeout(() => {
        onComplete();
      }, 1500);
    } else {
      setMessage('Caută în continuare! 👀');
      setScore(prev => prev + 1);
      setItems(prevItems => prevItems.filter((_, i) => i !== index));
      setRemainingItems(prev => prev - 1);
    }
  };

  return (
    <PuzzleContainer>
      <Title>Găsește Inelul Adevărat!</Title>
      <Instructions>Sunt multe inele, dar doar unul este cel adevărat!</Instructions>
      <Score>
        <ScoreItem>Încercări: {score}</ScoreItem>
        <ScoreItem>Obiecte rămase: {remainingItems}</ScoreItem>
      </Score>
      <Message $success={gameOver && message.includes('găsit')}>{message}</Message>
      <GameArea>
        {items.map((item, index) => (
          <Item
            key={item.id}
            $isRing={item.isRing}
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
              transform: `scale(${item.scale}) rotate(${item.rotation}deg)`
            }}
            onClick={() => handleItemClick(index)}
          >
            {item.emoji}
          </Item>
        ))}
      </GameArea>
    </PuzzleContainer>
  );
};

export default Puzzle; 