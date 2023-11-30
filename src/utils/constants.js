export const TURNS = {
  USER: "✕",
  COMPUTER: "○",
};

export let COUNT_GAMES = {
  USER: 0,
  COMPUTER: 0,
}

export const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const CONFETTI_CONFIG = {
  particleCount: 500,
  spread: 70,
  origin: { y: 0.7 },
};

export const AI_DELAY = 1000;
