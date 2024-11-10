import React, { useState, useEffect } from "react";
import "../css/CoinFlip.css";
import { openContractCall, UserSession } from "@stacks/connect";
import { fetchCallReadOnlyFunction, standardPrincipalCV, stringUtf8CV, uintCV } from "@stacks/transactions";

export default function CoinFlipGame() {
  // State variables
  const [userGuess, setUserGuess] = useState(null);  // User's guess (Heads or Tails)
  const [flipResult, setFlipResult] = useState(null);  // The result of the coin flip (Heads or Tails)
  const [gameStatus, setGameStatus] = useState("");  // Display win or lose message
  const [score, setScore] = useState(0);  // Track score
  const [flipping, setFlipping] = useState(false);  // State to manage coin flipping animation
  const [coinColor, setCoinColor] = useState("default");  // State to track coin color
  const [isBlue, setIsBlue] = useState(false);
  const [hasBlue, setHasBlue] = useState(false);

  useEffect(() => {
    checkNFTOwnership();
}, [isBlue, hasBlue]);

const checkNFTOwnership = async () => {
    // Set up the network and user session
    const network = "devnet";
    const userSession = new UserSession({ network });
    const userData = await userSession.loadUserData();
    const userAddress = userData.profile.stxAddress; // Get the user's address

    // Get the last token ID (this is the highest minted token ID)
    const contractAddress = "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM"; // Replace with your contract address
    const contractName = "contracts_dino_clar"; // Replace with your contract name
    const functionName = "get-last-token-id"; // Function to get the last token ID
    let lastTokenId = 0;

    try {
        // Get the last token ID
        const options = {
            contractAddress,
            contractName,
            functionName,
            functionArgs: [],
            network,
            senderAddress: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
        };
        let result = "";
        try {
            result = await fetchCallReadOnlyFunction(options);
        } catch (error) {
            console.log(error);
        }
        console.log("Result from get-last-token-id:", result.value); // Log the result for debugging
        lastTokenId = result.value; // This will be the last minted token ID
    } catch (error) {
        console.error("Error getting last token ID:", error);
        return;
    }

    // Now check for ownership of any token from ID 1 to lastTokenId
    let ownsNFT = false;

    for (let tokenId = 1; tokenId <= lastTokenId.value; tokenId++) {
        const ownerResult = await fetchCallReadOnlyFunction({
            contractAddress,
            contractName,
            functionName: "get-owner", // Function to get the owner of the token
            functionArgs: [uintCV(tokenId)],
            network,
            senderAddress: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM"
        });
        if (ownerResult.value.value.value === userAddress.testnet) {
            ownsNFT = true;
            console.log('worked')
            break; // Exit early if we find that the user owns this NFT
        }
    }

    setIsBlue(ownsNFT); // Set the state for the golden X
    if (ownsNFT) {
        console.log("User owns at least one NFT.");
        setHasBlue(true);
        setIsBlue(true);
        setCoinColor("blue");
    } else {
        
        console.log("User does not own any blue NFTs.");
    }
    };

  const buyBlue = async () => {
      const network = "devnet";
      const userSession = new UserSession({ network });
      const userData = await userSession.loadUserData();
      const userAddress = userData.profile.stxAddress.testnet; // Get the user's address
      const contractAddress = "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM";
      const contractName = "contracts_dino_clar";
      const functionName = "mint";
      const appDetails = { name : "Lattice", icon: "/diamond.png", }

      console.log("userAddress: ", userAddress);

      if (userAddress[0] !== 'S') {
        console.error("Invalid Stacks address: '", userAddress);
        return;
    }

      const options = {
          contractAddress,
          contractName,
          functionName,
          functionArgs: [standardPrincipalCV(userAddress)],
          network,
          appDetails,
          senderKey: userAddress,
          onFinish: (data) => {
            const { txId, txRaw, txType, stxAddress, error } = data;

            if (error) {
                console.error("Transaction Error:", error);
            } else {
                console.log("Transaction ID:", txId);
                console.log("Transaction Raw Data:", txRaw);
                console.log("Transaction Type:", txType);
                console.log("Sender Stacks Address:", stxAddress);
                // You can add more checks or handle the transaction result here
            }
        },
      };

      try {
          openContractCall(options);
          setHasBlue(true);
          setIsBlue(true);
      } catch (error) {
          console.log("Could not generate NFT: " + error);
      }
  };

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

  // Function to toggle the coin color
  const toggleCoinColor = () => {
    setCoinColor(coinColor === "default" ? "blue" : "default");
  };

  return (
    <div className="game-container">
      <h1>Guess Heads or Tails</h1>

      {/* Button to change coin color */}
      {(!hasBlue) && <button className="color-toggle" onClick={buyBlue}>
        Buy Blue Coin
      </button>}

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
        <div
          className={`coin ${flipping ? "flipping" : ""}`}
          style={{ backgroundColor: coinColor === "blue" ? "blue" : "#656565" }} // Change color dynamically
        >
          {flipResult === "Heads" ? "" : ""} {/* Using emojis for simplicity */}
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