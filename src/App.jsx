import { useState } from "react";
import confetti from "canvas-confetti";

import { TURNS, CONFETTI_CONFIG, AI_DELAY } from "./utils/constants.js";
import { checkWinner, checkEndGame, getNullSquares } from "./utils/logic.js";
import { saveGameToStorage, resetGameToStorage } from "./utils/storage.js";

import "./App.css";

import { Board } from "./components/Board.jsx";
import { WinnerModal } from "./components/WinnerModal.jsx";
import { Turn } from "./components/Turn.jsx";

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem("board");
    return boardFromStorage
      ? JSON.parse(boardFromStorage)
      : Array(9).fill(null);
  });
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem("turn");
    if (turnFromStorage) return turnFromStorage;
    return TURNS.USER;
  });
  const [winner, setWinner] = useState(null);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.USER);
    setWinner(null);

    resetGameToStorage();
  };

  const updateAI = ({ newBoard, newTurn }) => {
    setTimeout(() => {
      const nullSquares = getNullSquares(newBoard);
      const randomSquare =
        nullSquares[Math.floor(Math.random() * nullSquares.length)];
      newBoard[randomSquare] = newTurn;
      setBoard(newBoard);

      newTurn = TURNS.USER;
      setTurn(newTurn);

      saveGameToStorage({ newBoard, newTurn });

      const newWinnerAI = checkWinner(newBoard);
      if (newWinnerAI) {
        confetti(CONFETTI_CONFIG);
        resetGame();
        return setWinner(newWinnerAI);
      } else if (checkEndGame(newBoard)) {
        resetGame();
        return setWinner(false);
      }
    }, AI_DELAY);
  };

  const updateBoard = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    const newTurn = TURNS.COMPUTER;
    setTurn(newTurn);

    saveGameToStorage({ newBoard, newTurn });

    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      confetti(CONFETTI_CONFIG);
      resetGame();
      return setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      resetGame();
      return setWinner(false);
    }

    updateAI({ newBoard, newTurn });
  };

  return (
    <>
      <main className="game">
        <h1>Tic Tac Toe</h1>
        <button onClick={resetGame}>Empezar de nuevo</button>

        <Board board={board} updateBoard={updateBoard} />

        <Turn turn={turn} />

        <WinnerModal winner={winner} resetGame={resetGame} />
      </main>
      <footer>
        <a
          href="https://github.com/gonzaloyacante"
          rel="noreferrer"
          target="_blank">
          Built by Gonzalo Yacante
        </a>
      </footer>
    </>
  );
}

export default App;
