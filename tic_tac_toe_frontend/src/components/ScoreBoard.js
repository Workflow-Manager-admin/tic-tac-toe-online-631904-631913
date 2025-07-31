import React from 'react';

// PUBLIC_INTERFACE
const ScoreBoard = ({ scores }) => {
  return (
    <div className="score-board">
      <div className="score-item">
        <span className="player">X</span>
        <span className="score">{scores.X}</span>
      </div>
      <div className="score-item">
        <span className="player">O</span>
        <span className="score">{scores.O}</span>
      </div>
    </div>
  );
};

export default ScoreBoard;
