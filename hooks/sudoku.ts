import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BLANK_BOARD } from "../constants";
import { generateBoard } from "../libs/generate-board";
import { getBoardAll } from "../libs/get-board-all";
import { getIncludesCount } from "../libs/get-includes-count";
import { isProtected } from "../libs/is-protected";
import { setBoardValue } from "../libs/set-board-value";

export const useSudoku = () => {
  const router = useRouter();
  const initBoardFromUrl = (router.query?.id as string) || BLANK_BOARD;
  const boardFromUrl = (router.query?.board as string) || initBoardFromUrl;
  const selectedFromUrl = (router.query?.selected as string) || "A1";

  const [initBoard, setInitBoard] = useState(initBoardFromUrl);
  const [board, setBoard] = useState(boardFromUrl);
  const [selected, setSelected] = useState("A1");

  const boardAll = getBoardAll(initBoard, board, selected);
  const selectedIsProtected = isProtected(initBoard, selected);
  const includesCount = getIncludesCount(board);

  useEffect(() => {
    if (initBoardFromUrl !== BLANK_BOARD) {
      setInitBoard(initBoardFromUrl);
      setBoard(boardFromUrl);
      setSelected(selectedFromUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initBoardFromUrl]);

  useEffect(() => {
    if (initBoard !== BLANK_BOARD) {
      router.push(`/game/${initBoard}?board=${board}&selected=${selected}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [board, selected]);

  const reset = () => router.push(`/game/${initBoard}`);
  const generate = () => router.push(`/game/${generateBoard()}`);
  const select = (id: string) => setSelected(id);

  const setValue = (id: string, value: string) => {
    if (!value) return false;
    if (isProtected(initBoard, id)) return false;
    setBoard(setBoardValue(board, id, value));
  };

  const setValueSelected = (value: string) => setValue(selected, value);

  return {
    boardAll,
    includesCount,
    selectedIsProtected,
    generate,
    reset,
    select,
    setValueSelected,
  };
};
