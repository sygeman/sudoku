import { makeAutoObservable } from "mobx";
import {
  BLANK_BOARD,
  BLANK_CHAR,
  DIFFICULTY,
  DIGITS,
  SQUARES,
} from "../constants";
import { eliminateBoard } from "../libs/eliminate-board";
import { fillBoard } from "../libs/fill-board";
import { getCandidates } from "../libs/get-candidates";
import { getIncludesCount } from "../libs/get-includes-count";
import { getSquareVals } from "../libs/get-square-vals";
import { setBoardValue } from "../libs/set-board-value";
import { BoardAll } from "../types/board-all";

export class SudokuStore {
  constructor() {
    makeAutoObservable(this);
  }

  difficulty = DIFFICULTY.easy;
  debug = false;
  initBoard = BLANK_BOARD;
  board = BLANK_BOARD;
  solution = BLANK_BOARD;
  selected = "A1";
  history: { id: string; value: string }[] = [];

  get initValues() {
    return getSquareVals(this.initBoard);
  }

  get values() {
    return getSquareVals(this.board);
  }

  get selectedData() {
    const [row, col] = this.selected.split("");
    return {
      row,
      col,
      protected: this.initValues[this.selected] !== BLANK_CHAR,
    };
  }

  get candidates() {
    return { ...(getCandidates(this.board) || {}) };
  }

  get boardAll() {
    const cells: BoardAll = {};

    // Start by assigning every digit as a candidate to every square
    for (let si in SQUARES) {
      const id = SQUARES[si];
      const [row, col] = id.split("");
      const initValue = this.initValues[id];
      const value = this.values[id];
      const selected = this.selectedData;
      const candidates = (this.candidates[id] || "").split("");
      const index = SQUARES.findIndex((v) => v === id);

      cells[id] = {
        id,
        value,
        index,
        selected: this.selected === id,
        selectedLine: row === selected?.row || col === selected?.col,
        selectedSame:
          DIGITS.includes(value) && value === this.values[this.selected],
        protected: initValue !== BLANK_CHAR,
        error:
          this.solution[index] !== BLANK_CHAR &&
          value !== BLANK_CHAR &&
          this.solution[index] !== value,
        candidates,
      };
    }

    return cells;
  }

  get includesCount() {
    return getIncludesCount(this.board);
  }

  get fillCount() {
    return this.board.split("").filter((c) => c !== BLANK_CHAR).length;
  }

  get emptyCount() {
    return this.board.split("").filter((c) => c === BLANK_CHAR).length;
  }

  select(id: string) {
    this.selected = id;
  }

  setValue(id: string, value: string) {
    if (!value) return false;
    this.history.push({ id, value });

    const data = this.boardAll[id];

    if (data.protected) return false;

    this.board = setBoardValue(this.board, id, value);

    return true;
  }

  init(initBoard: string, board?: string, selected?: string) {
    this.history = [];
    this.board = board || initBoard;
    this.initBoard = initBoard;
    this.selected = selected || "A1";
  }

  setValueSelected(value: string) {
    return this.setValue(this.selected, value);
  }

  fill() {
    this.board = fillBoard(this.board);
  }

  eliminate() {
    this.board = eliminateBoard(this.board, this.difficulty);
  }

  generate() {
    this.empty();
    this.fill();
    this.eliminate();
    this.initBoard = this.board;
  }

  reset() {
    this.board = this.initBoard;
    this.selected = "A1";
  }

  toggleDebug() {
    this.debug = !this.debug;
  }

  empty() {
    this.init(BLANK_BOARD);
  }
}

export const sudoku = new SudokuStore();
