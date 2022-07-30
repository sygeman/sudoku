import { BLANK_BOARD, BLANK_CHAR, DIGITS, SQUARES } from "../constants";
import { BoardAll } from "../types/board-all";
import { fillBoard } from "./fill-board";
import { getCandidates } from "./get-candidates";
import { getSquareVals } from "./get-square-vals";

export const getBoardAll = (
  initBoard: string,
  board: string,
  selected: string
) => {
  const cells: BoardAll = {};
  const initValues = getSquareVals(initBoard);
  const values = getSquareVals(board);
  const allCandidates = getCandidates(board) || {};
  const solution =
    initBoard === BLANK_BOARD ? BLANK_BOARD : fillBoard(initBoard);

  for (let si in SQUARES) {
    const id = SQUARES[si];
    const [row, col] = id.split("");
    const initValue = initValues[id];
    const value = values[id];
    const [selectedRow, selectedCol] = selected.split("");
    const candidates = (allCandidates[id] || "").split("");
    const index = SQUARES.findIndex((v) => v === id);
    const isError =
      solution[index] !== BLANK_CHAR &&
      value !== BLANK_CHAR &&
      solution[index] !== value;

    cells[id] = {
      id,
      value,
      index,
      selected: selected === id,
      selectedLine: row === selectedRow || col === selectedCol,
      selectedSame: DIGITS.includes(value) && value === values[selected],
      protected: initValue !== BLANK_CHAR,
      error: isError,
      candidates,
    };
  }

  return cells;
};
