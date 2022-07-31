import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { BLANK_BOARD, BLANK_CHAR, DIGITS, ROWS, SQUARES } from "../constants";
import { generateBoard } from "../libs/generate-board";
import { getIncludesCount } from "../libs/get-includes-count";
import { isProtected } from "../libs/is-protected";
import { setBoardValue } from "../libs/set-board-value";
import { useBoardAll } from "./board-all";

export const useSudoku = () => {
  const router = useRouter();
  const initBoardFromUrl = (router.query?.id as string) || BLANK_BOARD;
  const boardFromUrl = (router.query?.board as string) || initBoardFromUrl;

  const [initBoard, setInitBoard] = useState(initBoardFromUrl);
  const [board, setBoard] = useState(boardFromUrl);
  const [selected, setSelected] = useState(SQUARES[0]);

  const boardAll = useBoardAll(initBoard, board, selected);
  const selectedIsProtected = isProtected(initBoard, selected);
  const includesCount = getIncludesCount(board);

  useEffect(() => {
    if (initBoardFromUrl !== BLANK_BOARD) {
      setInitBoard(initBoardFromUrl);
      setBoard(boardFromUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initBoardFromUrl]);

  const reset = () => {
    setBoard(initBoard);
    setSelected(SQUARES[0]);
  };
  const generate = () => router.push(`/game/${generateBoard()}`);
  const select = (id: string) => setSelected(id);

  const setValue = (id: string, value: string) => {
    if (!value) return false;
    if (isProtected(initBoard, id)) return false;
    setBoard(setBoardValue(board, id, value));
  };

  const setValueSelected = (value: string) => setValue(selected, value);

  const downHandler = useCallback(
    ({ key }: { key: string }) => {
      if (DIGITS.includes(key)) return setValueSelected(key);

      if (["Backspace", "Delete", "Space"].includes(key))
        return setValueSelected(BLANK_CHAR);

      const [row, col] = selected.split("");
      const rowsAsArray = ROWS.split("");
      const colsAsArray = DIGITS.split("");
      const indexRow = rowsAsArray.findIndex((r) => r === row);
      const indexCol = colsAsArray.findIndex((c) => c === col);
      let newRow = row;
      let newCol = col;

      switch (key) {
        case "ArrowUp":
          if (indexRow > 0) newRow = rowsAsArray[indexRow - 1];
          break;
        case "ArrowDown":
          if (indexRow < rowsAsArray.length - 1)
            newRow = rowsAsArray[indexRow + 1];
          break;
        case "ArrowLeft":
          if (indexCol > 0) newCol = colsAsArray[indexCol - 1];
          break;
        case "ArrowRight":
          if (indexCol < colsAsArray.length - 1)
            newCol = colsAsArray[indexCol + 1];
          break;
      }

      return select(`${newRow}${newCol}`);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selected, board]
  );

  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler);
    };
  }, [downHandler]); // Empty array ensures that effect is only run on mount and unmount

  return {
    boardAll,
    includesCount,
    selectedIsProtected,
    reset,
    select,
    generate,
    setValueSelected,
  };
};
