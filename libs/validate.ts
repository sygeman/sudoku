import { BLANK_CHAR, DIGITS, NR_SQUARES } from "../constants";

export function validate(board: string) {
  if (!board) throw "Empty board";

  if (board.length !== NR_SQUARES) {
    throw `Invalid board size. Board must be exactly ${NR_SQUARES} squares`;
  }

  for (let i = 0; i < board.length; i++) {
    if (!DIGITS.includes(board[i]) && board[i] !== BLANK_CHAR) {
      throw `Invalid board character encountered ${i}:${board[i]}`;
    }
  }
}
