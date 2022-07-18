import { makeAutoObservable } from "mobx";
import { generate } from "../libs/generate";
import { getCandidates } from "../libs/get-candidates";
import { getIncludesCount } from "../libs/get-includes-count";
import { getSquarePeers } from "../libs/get-square-peers";
import { getSquareUnits } from "../libs/get-square-units";
import { getSquareVals } from "../libs/get-square-vals";
import { getUnits } from "../libs/get-units";
import { cross } from "../utils/cross";

export class Sudoku {
  constructor() {
    makeAutoObservable(this);
    this.generate();
  }

  BLANK_CHAR = ".";
  DIGITS = "123456789";
  ROWS = "ABCDEFGHI";
  COLS = this.DIGITS;
  SQUARES = cross(this.ROWS, this.COLS);
  UNITS = getUnits(this.ROWS, this.COLS);
  SQUARE_UNITS = getSquareUnits(this.SQUARES, this.UNITS);
  SQUARE_PEERS = getSquarePeers(this.SQUARES, this.SQUARE_UNITS);
  MIN_GIVENS = 17;
  NR_SQUARES = 81;
  DIFFICULTY = {
    easy: 62,
    medium: 53,
    hard: 44,
  };

  initBoard = new Array(this.NR_SQUARES).fill(this.BLANK_CHAR).join("");
  board = this.initBoard;
  selected = "A1";
  prevSetValuePayload: { id: string; value: string } | null = null;
  invalidCandidates: { id: string; value: string }[] = [];

  get initValues() {
    return getSquareVals(this.initBoard);
  }

  get values() {
    return getSquareVals(this.board);
  }

  get selectedRow() {
    return this.selected.split("")[0];
  }

  get selectedCol() {
    return this.selected.split("")[1];
  }

  get candidates() {
    const allCandidates = { ...(getCandidates(this.board) || {}) };

    this.invalidCandidates.forEach(({ id, value }) => {
      if (!allCandidates[id]) return;
      allCandidates[id] = allCandidates[id]
        .split("")
        .filter((c) => c !== value)
        .join("");
    });

    return allCandidates;
  }

  get boardAll() {
    const cells: {
      [key: string]: {
        id: string;
        index: number;
        value: string;
        protected: boolean;
        selected: boolean;
        selectedLine: boolean;
        selectedSame: boolean;
        error?: boolean;
        candidates: string[];
      };
    } = {};

    // Start by assigning every digit as a candidate to every square
    for (let si in this.SQUARES) {
      const id = this.SQUARES[si];
      const [row, col] = id.split("");
      const initValue = this.initValues[id];
      const value = this.values[id];

      cells[id] = {
        id,
        value,
        index: this.SQUARES.findIndex((v) => v === id),
        selected: this.selected === id,
        selectedLine: row === this.selectedRow || col === this.selectedCol,
        selectedSame:
          this.DIGITS.includes(value) && value === this.values[this.selected],
        protected: initValue !== this.BLANK_CHAR,
        error: false,
        candidates: (this.candidates[id] || "").split(""),
      };
    }

    return cells;
  }

  get includesCount() {
    return getIncludesCount(this.board);
  }

  getSquareVals(board: string) {
    const squaresValsMap: { [key: string]: string } = {};

    // Make sure `board` is a string of length 81
    if (board.length != this.SQUARES.length) {
      // throw "Board/squares length mismatch.";
      return {};
    } else {
      for (let i = 0; i < this.SQUARES.length; i++) {
        squaresValsMap[this.SQUARES[i]] = board[i];
      }
    }

    return squaresValsMap;
  }

  select(id: string) {
    this.selected = id;
  }

  setValue(id: string, value: string) {
    if (!value) return false;

    const data = this.boardAll[id];

    if (data.protected) return false;

    this.board = this.board
      .split("")
      .map((char, index) => {
        if (data.index !== index) return char;
        return value;
      })
      .join("");

    if (value !== this.BLANK_CHAR) {
      this.prevSetValuePayload = { id, value };
    }

    return true;
  }

  setValueSelected(value: string) {
    return this.setValue(this.selected, value);
  }

  addInvalidCandidate(id: string, value: string) {
    this.invalidCandidates.push({ id, value });
  }

  generate() {
    this.invalidCandidates = [];
    const board = generate();
    this.board = board;
    this.initBoard = board;
  }

  solveNext() {
    const cell = Object.values(this.boardAll).find(
      (c) => c.candidates.length === 1 && c.value === "."
    );

    if (cell) {
      this.select(cell.id);
      const res = this.setValueSelected(cell.candidates[0]);
      if (!res) throw "Invalid value";
      return res;
    }

    const cellMultiple = Object.values(this.boardAll).find(
      (c) => c.value === "."
    );

    if (cellMultiple) {
      this.select(cellMultiple.id);
      const res = this.setValueSelected(cellMultiple.candidates[0]);
      if (!res) throw "Invalid value";
      return res;
    }

    return false;
  }

  solve() {
    const interval = setInterval(() => {
      try {
        const res = this.solveNext();
        if (!res) {
          clearInterval(interval);
        }
      } catch (error) {
        clearInterval(interval);

        if (this.prevSetValuePayload) {
          const { id, value } = this.prevSetValuePayload;
          console.log(`Invalid candidate ${id}:${value}`);

          this.addInvalidCandidate(id, value);
          this.setValue(id, ".");
          this.solve();
        }
      }
    }, 300);
  }
}

export const sudoku = new Sudoku();
