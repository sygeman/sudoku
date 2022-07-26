import { makeAutoObservable } from "mobx";
import { BLANK_BOARD, BLANK_CHAR, DIGITS, SQUARES } from "../constants";
import { getCandidates } from "../libs/get-candidates";
import { getIncludesCount } from "../libs/get-includes-count";
import { getSquareVals } from "../libs/get-square-vals";

export class Sudoku {
  constructor() {
    makeAutoObservable(this);
  }

  initBoard = BLANK_BOARD;
  board = BLANK_BOARD;
  selected = "A1";
  prevSetValuePayload: { id: string; value: string } | null = null;
  invalidCandidates: { id: string; value: string }[] = [];

  get initValues() {
    return getSquareVals(this.initBoard);
  }

  get values() {
    return getSquareVals(this.board);
  }

  get selectedData() {
    const [row, col] = this.selected.split("");
    return { row, col };
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
    for (let si in SQUARES) {
      const id = SQUARES[si];
      const [row, col] = id.split("");
      const initValue = this.initValues[id];
      const value = this.values[id];
      const selected = this.selectedData;

      cells[id] = {
        id,
        value,
        index: SQUARES.findIndex((v) => v === id),
        selected: this.selected === id,
        selectedLine: row === selected?.row || col === selected?.col,
        selectedSame:
          DIGITS.includes(value) && value === this.values[this.selected],
        protected: initValue !== BLANK_CHAR,
        error: false,
        candidates: (this.candidates[id] || "").split(""),
      };
    }

    return cells;
  }

  get includesCount() {
    return getIncludesCount(this.board);
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

    if (value !== BLANK_CHAR) {
      this.prevSetValuePayload = { id, value };
    }

    return true;
  }

  init(initBoard: string, board?: string, selected?: string) {
    console.log("init", { initBoard, board, selected });
    this.invalidCandidates = [];
    this.board = board || initBoard;
    this.initBoard = initBoard;
    this.selected = selected || "A1";
  }

  setValueSelected(value: string) {
    return this.setValue(this.selected, value);
  }

  addInvalidCandidate(id: string, value: string) {
    this.invalidCandidates.push({ id, value });
  }

  solveNext() {
    const cell = Object.values(this.boardAll).find(
      (c) => c.candidates.length === 1 && c.value === BLANK_CHAR
    );

    if (cell) {
      this.select(cell.id);
      const res = this.setValueSelected(cell.candidates[0]);
      if (!res) throw "Invalid value";
      return res;
    }

    const cellMultiple = Object.values(this.boardAll).find(
      (c) => c.value === BLANK_CHAR
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
          this.setValue(id, BLANK_CHAR);
          this.solve();
        }
      }
    }, 300);
  }

  reset() {
    this.invalidCandidates = [];
    this.board = this.initBoard;
    this.selected = "A1";
  }
}

export const sudoku = new Sudoku();
