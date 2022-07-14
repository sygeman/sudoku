import { BLANK_CHAR, DIGITS, MIN_GIVENS } from "../constants";
import { getSquareVals } from "./get-square-vals";
import { search } from "./search";
import { validate } from "./validate";

export function solve(board: string) {
  validate(board);

  let nrGivens = 0;

  for (let i = 0; i < board.length; i++) {
    if (board[i] !== BLANK_CHAR && DIGITS.includes(board[i])) {
      ++nrGivens;
    }
  }

  if (nrGivens < MIN_GIVENS) {
    throw `Too few givens. Minimum givens is ${MIN_GIVENS}`;
  }

  const candidates = getSquareVals(board);
  const result = search(candidates);

  if (result) {
    let solution = "";
    for (let square in result) {
      solution += result[square];
    }
    return solution;
  }
  return false;
}
