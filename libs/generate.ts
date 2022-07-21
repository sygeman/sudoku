import {
  SQUARES,
  BLANK_CHAR,
  DIFFICULTY,
  MIN_GIVENS,
  NR_SQUARES,
} from "../constants";
import { randomRange } from "../utils/random-range";
import { forceRange } from "../utils/force-range";
import { shuffle } from "../utils/shuffle";
import { solve } from "./solve";
import { assign } from "./assign";
import { getCandidates } from "./get-candidates";

export function generate(difficulty = DIFFICULTY.medium): string {
  // Force difficulty between 17 and 81 inclusive
  difficulty = forceRange(difficulty, NR_SQUARES + 1, MIN_GIVENS);

  // Get a set of squares and all possible candidates for each square
  let blankBoard = new Array(NR_SQUARES).fill(BLANK_CHAR).join("");
  const candidates = getCandidates(blankBoard);

  if (candidates === false) throw "Invalid candidates";

  // For each item in a shuffled list of squares
  const shuffledSquares = shuffle(SQUARES);
  for (let si in shuffledSquares) {
    const square = shuffledSquares[si];

    // If an assignment of a random chioce causes a contradictoin, give
    // up and try again
    const randCandidateIdx = randomRange(candidates[square].length);
    const randCandidate = candidates[square][randCandidateIdx];
    if (!assign(candidates, square, randCandidate)) {
      break;
    }

    // Make a list of all single candidates
    const singleCandidates = [];
    for (const si in SQUARES) {
      const square = SQUARES[si];

      if (candidates[square].length == 1) {
        singleCandidates.push(candidates[square]);
      }
    }

    // If we have at least difficulty, and the unique candidate count is
    // at least 8, return the puzzle!
    if (
      singleCandidates.length >= difficulty &&
      new Set(singleCandidates).size >= 8
    ) {
      let board = "";
      let givensIdxs = [];
      for (const i in SQUARES) {
        const square = SQUARES[i];
        if (candidates[square].length == 1) {
          board += candidates[square];
          givensIdxs.push(i);
        } else {
          board += BLANK_CHAR;
        }
      }

      // If we have more than `difficulty` givens, remove some random
      // givens until we're down to exactly `difficulty`
      const nrGivens = givensIdxs.length;
      if (nrGivens > difficulty) {
        givensIdxs = shuffle(givensIdxs);
        for (let i = 0; i < nrGivens - difficulty; ++i) {
          const target = parseInt(givensIdxs[i]);
          board =
            board.substring(0, target) +
            BLANK_CHAR +
            board.substring(target + 1);
        }
      }

      // Double check board is solvable
      // TODO: Make a standalone board checker. Solve is expensive.
      if (solve(board)) return board;
    }
  }

  // Give up and try a new puzzle
  return generate(difficulty);
}
