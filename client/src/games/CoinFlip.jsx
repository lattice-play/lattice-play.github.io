import React, { useState } from "react";
import "../css/CoinFlip.css";

export default function CoinFlipGame() {
  // State variables
  const [userGuess, setUserGuess] = useState(null);  // User's guess (Heads or Tails)
  const [flipResult, setFlipResult] = useState(null);  // The result of the coin flip (Heads or Tails)
  const [gameStatus, setGameStatus] = useState("");  // Display win or lose message
  const [score, setScore] = useState(0);  // Track score
  const [flipping, setFlipping] = useState(false);  // State to manage coin flipping animation

  // Function to handle the user's guess (Heads or Tails)
  const handleGuess = (guess) => {
    setUserGuess(guess);
    setFlipping(true);  // Trigger flipping animation

    // Simulate the coin flip (random choice between "Heads" and "Tails")
    const randomChoice = Math.random() < 0.5 ? "Heads" : "Tails";

    // Set a timeout to simulate the coin flipping for 1.5 seconds before showing the result
    setTimeout(() => {
      setFlipResult(randomChoice);
      setFlipping(false);  // Stop the animation
      if (guess === randomChoice) {
        setGameStatus("You Win!");
        setScore(score + 1);  // Increment score if the user wins
      } else {
        setGameStatus("You Lose!");
      }
    }, 1500);  // Wait for 1.5 seconds before showing the result
  };

  // Function to reset the game
  const resetGame = () => {
    setUserGuess(null);
    setFlipResult(null);
    setGameStatus("");
  };

  return (
    <div className="game-container">
      <h1>Guess Heads or Tails</h1>

      <div className="score">
        <p>Coins: {score}</p>
      </div>

      {/* Guess buttons - only show if gameStatus is empty (i.e., game is not over) */}
      {gameStatus === "" && (
        <div className="guess-buttons">
          <button onClick={() => handleGuess("Heads")}>Heads</button>
          <button onClick={() => handleGuess("Tails")}>Tails</button>
        </div>
      )}

      {/* Coin Flip Animation */}
      <div className="coin-container">
        <div className={`coin ${flipping ? "flipping" : ""}`}>
          {flipResult === "Heads" ? "" : ""}  {/* Using emojis for simplicity */}
        </div>
      </div>

      {/* Result display after user makes a guess */}
      {userGuess && flipResult && (
        <div className="result">
          <p>Your Guess: {userGuess}</p>
          <p>Coin Flip Result: {flipResult}</p>
          <p>{gameStatus}</p>
        </div>
      )}

      {/* Play Again button */}
      {gameStatus && (
        <button className="reset-button" onClick={resetGame}>
          Play Again
        </button>
      )}
    </div>
  );
}