import { BLANK_BOARD, BLANK_CHAR, DIGITS, SQUARES } from "../constants";
import { BoardData } from "../types/board-all";
import { fillBoard } from "../libs/fill-board";
import { getCandidates } from "../libs/get-candidates";
import { getSquareVals } from "../libs/get-square-vals";
import { useMemo } from "react";

export const useBoardData = (
  initBoard: string,
  board: string,
  selected: string
) => {
  const boardData: BoardData = {};
  const initValues = useMemo(() => getSquareVals(initBoard), [initBoard]);
  const values = useMemo(() => getSquareVals(board), [board]);
  const allCandidates = useMemo(() => getCandidates(board) || {}, [board]);
  const solution = useMemo(
    () => (initBoard === BLANK_BOARD ? BLANK_BOARD : fillBoard(initBoard)),
    [initBoard]
  );
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

    boardData[id] = {
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

  return { boardData, solution };
};
