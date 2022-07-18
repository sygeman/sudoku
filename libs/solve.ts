import { DIGITS, MIN_GIVENS } from "../constants";
import { getSquareVals } from "./get-square-vals";
import { search } from "./search";
import { validate } from "./validate";

export function solve(board: string) {
  validate(board);

  const nrGivens = board
    .split("")
    .filter((char) => DIGITS.includes(char)).length;

  if (nrGivens < MIN_GIVENS) {
    throw `Too few givens. Minimum givens is ${MIN_GIVENS}`;
  }

  const result = search(getSquareVals(board));

  if (!result) return false;

  let solution = "";
  for (let square in result) {
    solution += result[square];
  }
  return solution;
}
