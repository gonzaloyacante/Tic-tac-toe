import { useState } from "react";
import confetti from "canvas-confetti";

import { TURNS } from "./constants.js";
import { checkWinner, checkEndGame, getNullSquares } from "./logic.js";
import { saveGameToStorage, resetGameToStorage } from "./storage.js";

import "./App.css";

import { Square } from "./components/Square.jsx";
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
    return TURNS.X;
  });
  const [winner, setWinner] = useState(null);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);

    resetGameToStorage()
  };

  const updateAI = ({newBoard, newTurn}) => {
    setTimeout(() => {
        const nullSquares = getNullSquares(newBoard);
        const randomSquare =
          nullSquares[Math.floor(Math.random() * nullSquares.length)];
        newBoard[randomSquare] = newTurn;
        console.log({newBoard});
        setBoard(newBoard);

        newTurn = TURNS.X;
        console.log( newTurn + ' 2' );
        setTurn(newTurn);

        saveGameToStorage({ newBoard, newTurn });

        const newWinnerAI = checkWinner(newBoard);
        if (newWinnerAI) {
          confetti();
          return setWinner(newWinnerAI);
        } else if (checkEndGame(newBoard)) {
          return setWinner(false);
        }
      }, 1000);
  }

  const updateBoard = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    const newTurn = TURNS.O;
    setTurn(newTurn);

    saveGameToStorage({ newBoard, newTurn });

    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      confetti();
      return setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      return setWinner(false);
    }
    console.log( newTurn + ' 1' );

    updateAI({newBoard, newTurn})
  };

  return (
    <main className="game">
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Empezar de nuevo</button>

      <section className="board">
        {board.map((square, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {square}
            </Square>
          );
        })}
      </section>

      <Turn turn={turn}></Turn>

      <WinnerModal winner={winner} resetGame={resetGame}></WinnerModal>
    </main>
  );
}

export default App;
