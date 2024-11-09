import React, { useState } from "react";
import "../css/TTT.css";

export default function TTT() {
    // The state of the game (3x3 board, current player, winner)
    const [board, setBoard] = useState(Array(9).fill(null));  // 9 empty cells
    const [isXNext, setIsXNext] = useState(true);  // Who's turn it is
    const [winner, setWinner] = useState(null);  // Winner of the game
    const [winningLine, setWinningLine] = useState([]);  // Indices of the winning line
    const [isGoldX, setIsGoldX] = useState(false);  // State to toggle golden X symbol
    
    // Handle a player's move
    const handleClick = (index) => {
      if (board[index] || winner) return;  // If the cell is already filled or there's a winner, do nothing
      
      const newBoard = board.slice();
      newBoard[index] = isXNext ? (isGoldX ? '💛' : 'X') : 'O';  // Apply golden X if isGoldX is true
      setBoard(newBoard);
      setIsXNext(!isXNext);  // Switch turns
      
      // Check for winner
      checkWinner(newBoard);
    };
  
    // Check if there is a winner
    const checkWinner = (board) => {
      const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ];
      
      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
          setWinner(board[a]);  // If three in a row, set the winner
          setWinningLine([a, b, c]);  // Set the winning line
          return;
        }
      }
  
      // Check if the board is full (draw condition)
      if (board.every(cell => cell !== null)) {
        setWinner('Draw');
      }
    };
  
    // Render each square of the board
    const renderSquare = (index) => {
      return (
        <button
          className={`square ${winningLine.includes(index) ? 'winner' : ''}`}
          onClick={() => handleClick(index)}
        >
          {board[index]}
        </button>
      );
    };
  
    // Handle restart game
    const handleRestart = () => {
      setBoard(Array(9).fill(null));  // Reset board
      setWinner(null);  // Reset winner
      setIsXNext(true);  // Reset turn to X
      setWinningLine([]);  // Reset winning line
    };
  
    // Handle the toggle for the golden X button
    const toggleGoldX = () => {
      setIsGoldX(!isGoldX);  // Toggle the golden X state
    };
  
    return (
      <div className="game">
        <h1>Tic-Tac-Toe</h1>
        
        {/* Button to toggle the golden X symbol */}
        <button className="golden-x-toggle" onClick={toggleGoldX}>
          Buy Golden 💛
        </button>
  
        {/* Status with conditional inline styles */}
        <div
          className="status"
          style={{
            color: '#f0f0f0', // X is blue, O is red
            fontFamily: 'Courier New, monospace', // Change font for X and O
            fontWeight: 'bold',
            fontSize: '24px'
          }}
        >
          {winner ? (
            winner === 'Draw' ? (
              'It\'s a Draw!'
            ) : (
              `${winner} Wins!`
            )
          ) : (
            `Next player: ${isXNext ? (isGoldX ? '💛' : 'X') : 'O'}` // Show X or O as the next player
          )}
        </div>
  
        {/* Render the 3x3 grid of squares */}
        <div className="board">
          {Array.from({ length: 3 }).map((_, rowIndex) => (
            <div key={rowIndex} className="board-row">
              {Array.from({ length: 3 }).map((_, colIndex) => {
                const index = rowIndex * 3 + colIndex;
                return <div key={colIndex} className="board-cell">{renderSquare(index)}</div>;
              })}
            </div>
          ))}
        </div>
  
        {/* Restart button */}
         {/* Restart button with inline styles */}
         <button
          className="restart"
          onClick={handleRestart}
          style={{
            padding: '12px 25px', // Button padding
            fontSize: '18px', // Font size
            backgroundColor: '#ff5722', // Orange background color
            color: 'white', // Text color
            border: 'none', // No border
            borderRadius: '8px', // Rounded corners
            cursor: 'pointer', // Pointer cursor
            transition: 'background-color 0.3s ease', // Smooth color transition
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#397032'; // Change to darker orange on hover
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#478c3e'; // Reset to original color
          }}
        >
          Restart Game
        </button>
      </div>
    );
  }