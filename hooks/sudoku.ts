import { useRouter } from "next/router";
import { BLANK_BOARD } from "../constants";
import { generateBoard } from "../libs/generate-board";
import { getBoardAll } from "../libs/get-board-all";
import { isProtected } from "../libs/is-protected";
import { setBoardValue } from "../libs/set-board-value";

export const useSudoku = () => {
  const router = useRouter();
  const initBoard = (router.query?.id as string) || BLANK_BOARD;
  const board = (router.query?.board as string) || initBoard;
  const selected = (router.query?.selected as string) || "A1";
  const boardAll = getBoardAll(initBoard, board, selected);

  const reset = () => router.push(`/game/${initBoard}`);
  const generate = () => router.push(`/game/${generateBoard()}`);
  const select = (id: string) => {
    router.push(`/game/${initBoard}?board=${board}&selected=${id}`);
  };

  const setValue = (id: string, value: string) => {
    if (!value) return false;
    if (isProtected(initBoard, id)) return false;
    const newBoard = setBoardValue(board, id, value);
    router.push(`/game/${initBoard}?board=${newBoard}&selected=${id}`);
  };

  const setValueSelected = (value: string) => setValue(selected, value);

  return { boardAll, generate, reset, select, setValueSelected };
};
