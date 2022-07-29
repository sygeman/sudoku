import { makeAutoObservable } from "mobx";
import {
  BLANK_BOARD,
  BLANK_CHAR,
  DIFFICULTY,
  DIGITS,
  SQUARES,
} from "../constants";
import { findCellWithMinCandidates } from "../libs/find-cell-with-min-candidates";
import { getCandidates } from "../libs/get-candidates";
import { getIncludesCount } from "../libs/get-includes-count";
import { getSquareVals } from "../libs/get-square-vals";
import { groupCellByCandidatesCount } from "../libs/group-cell-by-candidates-count";
import { BoardAll, Cell } from "../types/board-all";
import { shuffle } from "../utils/shuffle";

export class SudokuStore {
  constructor() {
    makeAutoObservable(this);
  }

  difficulty = DIFFICULTY.easy;
  debug = true;
  initBoard = BLANK_BOARD;
  board = BLANK_BOARD;
  solution = BLANK_BOARD;
  selected = "A1";
  prevSetValuePayload: { id: string; value: string } | null = null;
  invalidCandidates: { id: string; value: string }[] = [];
  history: { id: string; value: string }[] = [];
  invalidEliminateIds = new Set();

  get cellsForEliminate() {
    return shuffle<Cell>(
      Object.values(this.boardAll).filter(
        (cell) =>
          cell.value !== BLANK_CHAR && !this.invalidEliminateIds.has(cell.id)
      )
    );
  }

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

  get candidatesGroup() {
    return groupCellByCandidatesCount(this.boardAll);
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
    this.invalidCandidates = [];
    this.history = [];
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

  fillNext() {
    const cellGroup = groupCellByCandidatesCount(this.boardAll);
    const cell = findCellWithMinCandidates({
      cellGroup,
      pickRandomCandidate: true,
    });

    if (!cell) return false;

    this.select(cell.id);
    const res = this.setValueSelected(cell.candidates[0]);
    if (!res) throw "Invalid value";
    return res;
  }

  fill() {
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        try {
          const res = this.fillNext();
          if (!res) {
            clearInterval(interval);
            resolve(null);
          }
        } catch (error) {
          clearInterval(interval);

          if (this.prevSetValuePayload) {
            const { id, value } = this.prevSetValuePayload;
            console.log(`Invalid candidate ${id}:${value}`);

            this.addInvalidCandidate(id, value);
            this.setValue(id, BLANK_CHAR);
            this.fill();
          }

          resolve(null);
        }
      }, 50);
    });
  }

  eliminateRandom() {
    const randomCell = this.cellsForEliminate?.[0];
    if (!randomCell) return null;
    this.select(randomCell.id);
    this.setValue(randomCell.id, BLANK_CHAR);
    return randomCell;
  }

  eliminateNext() {
    let eliminatedCell: Cell | null = null;

    while (this.cellsForEliminate.length > 0) {
      const cell = this.eliminateRandom();
      if (cell) {
        const valid =
          this.candidatesGroup.size === 1 &&
          this.candidatesGroup.keys().next().value === 1;

        if (!valid) {
          this.invalidEliminateIds.add(cell.id);
          this.select(cell.id);
          this.setValue(cell.id, cell.value);
          break;
        }

        eliminatedCell = cell;
        break;
      }
    }

    return eliminatedCell;
  }

  eliminate() {
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        try {
          this.eliminateNext();
          if (
            this.cellsForEliminate.length === 0 ||
            this.emptyCount >= this.difficulty
          ) {
            this.invalidEliminateIds.clear();
            clearInterval(interval);
            resolve(null);
          }
        } catch (error) {
          clearInterval(interval);
          resolve(null);
        }
      }, 50);
    });
  }

  async generate() {
    this.empty();
    await this.fill();
    this.solution = this.board;
    await this.eliminate();
    this.initBoard = this.board;
  }

  reset() {
    this.invalidCandidates = [];
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
