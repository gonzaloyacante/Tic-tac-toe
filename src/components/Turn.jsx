/* eslint-disable react/prop-types */
import { Square } from "./Square.jsx";

import { TURNS } from "../constants.js";

export const Turn = ({ turn }) => {
  const className = `square is-selected ${
    turn === TURNS.USER ? "turn-x" : "turn-o"
  }`;

  return (
    <section className="turn">
      <div className={className}></div>
      <Square>{TURNS.USER}</Square>
      <Square>{TURNS.COMPUTER}</Square>
    </section>
  );
};
