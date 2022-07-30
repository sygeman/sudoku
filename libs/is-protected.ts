import { BLANK_BOARD, BLANK_CHAR } from "../constants";
import { getSquareVals } from "./get-square-vals";

export const isProtected = (
  initBoard: string = BLANK_BOARD,
  selected: string = "A1"
) => getSquareVals(initBoard)[selected] !== BLANK_CHAR;
