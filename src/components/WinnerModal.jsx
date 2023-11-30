/* eslint-disable react/prop-types */
import { Square } from "./Square";
import { CountGame } from "./CountGame.jsx";

import { TURNS } from "../utils/constants.js";

export function WinnerModal({ winner, resetGame, countGames }) {
  if (winner === null) return null;

  const winnerText = winner === false ? "Empate" : "Ganó:";
  const lossesGames =
    winner === TURNS.USER ? countGames.COMPUTER : countGames.USER;
  const victoryGames =
    winner === TURNS.USER ? countGames.USER : countGames.COMPUTER;
  return (
    <section className="winner">
      <article className="text">
        <h2>{winnerText}</h2>
        {winner && (
          <header>
            <CountGame title="Losses">{lossesGames}</CountGame>
            <div className="win">{winner && <Square>{winner}</Square>}</div>
            <CountGame title="Victories">{victoryGames}</CountGame>
          </header>
        )}

        <button onClick={resetGame}>Play Again</button>
      </article>
    </section>
  );
}
