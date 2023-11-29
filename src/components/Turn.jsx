/* eslint-disable react/prop-types */
import { Square } from "./Square.jsx";

import { TURNS } from "../constants.js";

export const Turn = ({ turn }) => {
  const className = `square is-selected ${
    turn === TURNS.X ? "turn-x" : "turn-o"
  }`;

  return (
    <section className="turn">
      <div className={className}></div>
      <Square>{TURNS.X}</Square>
      <Square>{TURNS.O}</Square>
    </section>
  );
};
