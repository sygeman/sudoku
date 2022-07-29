import { DIFFICULTY } from "../constants";
import { SudokuStore } from "../stores/sudoku";

export function generate(difficulty = DIFFICULTY.easy): string {
  const sudoku = new SudokuStore();
  sudoku.difficulty = difficulty;
  sudoku.generate();
  return sudoku.board;
}
