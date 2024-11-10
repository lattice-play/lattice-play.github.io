import React, { useState } from "react";
import "../css/TTT.css";
import { UserSession } from "@stacks/connect";
import { fetchCallReadOnlyFunction } from '@stacks/transactions';

export default function TTT() {
  // The state of the game (3x3 board, current player, winner)
  const [board, setBoard] = useState(Array(9).fill(null)); // 9 empty cells
  const [isXNext, setIsXNext] = useState(true); // Who's turn it is
  const [winner, setWinner] = useState(null); // Winner of the game
  const [winningLine, setWinningLine] = useState([]); // Indices of the winning line
  const [isGoldX, setIsGoldX] = useState(false); // State to toggle golden X symbol (simulating NFT check)
  
  
  const checkNFTOwnership = async () => {
    // Set up the network and user session
    const network = "devnet";
    const userSession = new UserSession({ network });
    const userData = await userSession.loadUserData();
    const userAddress = userData.profile.stxAddress; // Get the user's address
  
    // Get the last token ID (this is the highest minted token ID)
    const contractAddress = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM';  // Replace with your contract address
    const contractName = 'contracts_ttt_clar';  // Replace with your contract name
    const functionName = 'get-last-token-id';  // Function to get the last token ID
    let lastTokenId = 0;
  
    try {
      // Get the last token ID
      const options = {
        contractAddress,
        contractName,
        functionName,
        functionArgs: [],
        network,
        senderAddress: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM"
      };
      let result = "";
      try {
        result = await fetchCallReadOnlyFunction(options);
      }
      catch (error) {
        console.log(error);
      }
      console.log("Result from get-last-token-id:", result.value);  // Log the result for debugging
      lastTokenId = result.value;  // This will be the last minted token ID
    } catch (error) {
      console.error('Error getting last token ID:', error);
      return;
    }
  
    // Now check for ownership of any token from ID 1 to lastTokenId
    let ownsNFT = false;
    
    for (let tokenId = 1; tokenId <= lastTokenId; tokenId++) {
      const ownerResult = await fetchCallReadOnlyFunction({
        contractAddress,
        contractName,
        functionName: 'get-owner',  // Function to get the owner of the token
        functionArgs: [tokenId],
        network,
      });
  
      if (ownerResult.value === userAddress) {
        ownsNFT = true;
        break;  // Exit early if we find that the user owns this NFT
      }
    }
  
    setIsGoldX(ownsNFT);  // Set the state for the golden X
    if (ownsNFT) {
      console.log('User owns at least one NFT.');
    } else {
      console.log('User does not own any NFTs.');
    }
  };

  // Handle a player's move
  const handleClick = (index) => {
    if (board[index] || winner) return; // If the cell is already filled or there's a winner, do nothing

    const newBoard = board.slice();
    newBoard[index] = isXNext ? (isGoldX ? '💛' : 'X') : 'O'; // Apply golden X if isGoldX is true
    setBoard(newBoard);
    setIsXNext(!isXNext); // Switch turns

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
        setWinner(board[a]); // If three in a row, set the winner
        setWinningLine([a, b, c]); // Set the winning line
        return;
      }
    }

    // Check if the board is full (draw condition)
    if (board.every((cell) => cell !== null)) {
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
    setBoard(Array(9).fill(null)); // Reset board
    setWinner(null); // Reset winner
    setIsXNext(true); // Reset turn to X
    setWinningLine([]); // Reset winning line
  };

  return (
    <div className="game">
      <h1>Tic-Tac-Toe</h1>

      {/* Button to simulate NFT check (Buy Golden 💛 or check NFT ownership) */}
      <button className="golden-x-toggle" onClick={checkNFTOwnership}>
        Check NFT: {isGoldX ? "Gold X Active" : "Normal X"}
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
            "It's a Draw!"
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
              return (
                <div key={colIndex} className="board-cell">
                  {renderSquare(index)}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Restart button */}
      <button
        className="restart"
        onClick={handleRestart}
        style={{
          padding: '12px 25px',
          fontSize: '18px',
          backgroundColor: '#478c3e',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease',
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