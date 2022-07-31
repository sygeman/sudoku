import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BLANK_BOARD, SQUARES } from "../constants";
import { generateBoard } from "../libs/generate-board";
import { getIncludesCount } from "../libs/get-includes-count";
import { isProtected } from "../libs/is-protected";
import { setBoardValue } from "../libs/set-board-value";
import { validateBoard } from "../libs/validate-board";
import { useBoardData } from "./board-data";
import { useKeyboardControl } from "./keyboard-control";

export const useSudoku = () => {
  const router = useRouter();
  const initBoardFromUrl = (router.query?.id as string) || BLANK_BOARD;
  const boardFromUrl = (router.query?.board as string) || initBoardFromUrl;

  const [initBoard, setInitBoard] = useState(initBoardFromUrl);
  const [board, setBoard] = useState(boardFromUrl);
  const [selected, setSelected] = useState(SQUARES[0]);
  const [failures, setFailures] = useState(0);

  const { boardData, solution } = useBoardData(initBoard, board, selected);
  const selectedIsProtected = isProtected(initBoard, selected);
  const includesCount = getIncludesCount(board);
  const soloved = board !== BLANK_BOARD && board === solution;
  const failed = failures > 2;

  useEffect(() => {
    if (initBoardFromUrl !== BLANK_BOARD) {
      setInitBoard(initBoardFromUrl);
      setBoard(boardFromUrl);
      setFailures(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initBoardFromUrl]);

  const reset = () => {
    setBoard(initBoard);
    setSelected(SQUARES[0]);
    setFailures(0);
  };
  const generate = () => router.push(`/game/${generateBoard()}`);
  const select = (id: string) => setSelected(id);

  const setValue = (id: string, value: string) => {
    if (!value) return false;
    if (isProtected(initBoard, id)) return false;
    const newBoard = setBoardValue(board, id, value);
    if (!validateBoard(newBoard)) {
      setFailures((prev) => prev + 1);
    }
    setBoard(newBoard);
  };

  const setValueSelected = (value: string) => setValue(selected, value);

  useKeyboardControl({
    selected,
    onValue: (value) => setValueSelected(value),
    onSelect: (newSelected) => select(newSelected),
  });

  return {
    failed,
    soloved,
    failures,
    boardData,
    includesCount,
    selectedIsProtected,
    reset,
    select,
    generate,
    setValueSelected,
  };
};
