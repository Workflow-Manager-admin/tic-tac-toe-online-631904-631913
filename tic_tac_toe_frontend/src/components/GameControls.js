import React from 'react';

// PUBLIC_INTERFACE
const GameControls = ({ onModeChange, onRestart, currentMode }) => {
  return (
    <div className="game-controls">
      <div className="mode-buttons">
        <button 
          className={`control-button ${currentMode === 'computer' ? 'active' : ''}`}
          onClick={() => onModeChange('computer')}
        >
          vs Computer
        </button>
        <button 
          className={`control-button ${currentMode === 'player' ? 'active' : ''}`}
          onClick={() => onModeChange('player')}
        >
          vs Player
        </button>
      </div>
      <button className="restart-button" onClick={onRestart}>
        Restart Game
      </button>
    </div>
  );
};

export default GameControls;
