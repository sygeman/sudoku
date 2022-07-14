import { cross } from "../utils/cross";
import { getUnits } from "../libs/get-units";
import { getSquareUnits } from "../libs/get-square-units";
import { getSquarePeers } from "../libs/get-square-peers";

export const BLANK_CHAR = ".";
export const DIGITS = "123456789";
export const ROWS = "ABCDEFGHI";
export const COLS = DIGITS;
export const SQUARES = cross(ROWS, COLS);
export const UNITS = getUnits(ROWS, COLS);
export const SQUARE_UNITS = getSquareUnits(SQUARES, UNITS);
export const SQUARE_PEERS = getSquarePeers(SQUARES, SQUARE_UNITS);

export const MIN_GIVENS = 17;
export const NR_SQUARES = 81;

export const DIFFICULTY = {
  easy: 62,
  medium: 53,
  hard: 44,
};
