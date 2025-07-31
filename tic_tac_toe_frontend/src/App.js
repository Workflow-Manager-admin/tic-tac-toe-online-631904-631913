import React, { useState, useEffect } from 'react';
import './App.css';
import GameBoard from './components/GameBoard';
import ScoreBoard from './components/ScoreBoard';
import GameControls from './components/GameControls';

// PUBLIC_INTERFACE
function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [gameMode, setGameMode] = useState('player');
  const [scores, setScores] = useState({ X: 0, O: 0 });
  const [gameEnded, setGameEnded] = useState(false);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (let line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return squares.every(square => square !== null) ? 'draw' : null;
  };

  const handleClick = (i) => {
    if (gameEnded || squares[i]) return;

    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    
    const winner = calculateWinner(newSquares);
    if (winner && winner !== 'draw') {
      setScores(prev => ({
        ...prev,
        [winner]: prev[winner] + 1
      }));
      setGameEnded(true);
    } else if (winner === 'draw') {
      setGameEnded(true);
    } else {
      setXIsNext(!xIsNext);
    }
  };

  useEffect(() => {
    if (gameMode === 'computer' && !xIsNext && !gameEnded) {
      // Simple computer move - choose first available square
      const emptySquares = squares.map((square, index) => 
        square === null ? index : null
      ).filter(val => val !== null);
      
      if (emptySquares.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptySquares.length);
        setTimeout(() => handleClick(emptySquares[randomIndex]), 500);
      }
    }
  }, [xIsNext, gameMode, gameEnded, squares]);

  const handleRestart = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setGameEnded(false);
  };

  const handleModeChange = (mode) => {
    setGameMode(mode);
    handleRestart();
    setScores({ X: 0, O: 0 });
  };

  const status = gameEnded 
    ? (calculateWinner(squares) === 'draw' 
      ? "It's a draw!" 
      : `Winner: ${calculateWinner(squares)}`)
    : `Next player: ${xIsNext ? 'X' : 'O'}`;

  return (
    <div className="App">
      <div className="game-container">
        <h1>Tic Tac Toe</h1>
        <div className="status">{status}</div>
        <ScoreBoard scores={scores} />
        <GameBoard squares={squares} onSquareClick={handleClick} />
        <GameControls 
          onModeChange={handleModeChange}
          onRestart={handleRestart}
          currentMode={gameMode}
        />
      </div>
    </div>
  );
}

export default App;
