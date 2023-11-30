/* eslint-disable react/prop-types */
import { Square } from "./Square.jsx";
import { CountGame } from "./CountGame.jsx";

import { TURNS } from "../utils/constants.js";

export const Turn = ({ turn, countGames }) => {
  const className = `square is-selected ${
    turn === TURNS.USER ? "turn-x" : "turn-o"
  }`;
  return (
    <section className="turn">
      <CountGame title='User'>{countGames.USER}</CountGame>
      <div>
        <div className={className}></div>
        <Square>{TURNS.USER}</Square>
        <Square>{TURNS.COMPUTER}</Square>
      </div>
      <CountGame title='AI'>{countGames.COMPUTER}</CountGame>
    </section>
  );
};
