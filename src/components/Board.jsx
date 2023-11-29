/* eslint-disable react/prop-types */
import { Square } from "./Square.jsx";

export const Board = ({ board, updateBoard }) => {
  return (
    <section className="board">
      {board.map((square, index) => {
        return (
          <Square key={index} index={index} updateBoard={updateBoard}>
            {square}
          </Square>
        );
      })}
    </section>
  );
};
