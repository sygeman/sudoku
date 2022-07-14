export function boardToString(boardGrid: string[][]) {
  let boardString = "";
  for (let r = 0; r < 9; ++r) {
    for (let c = 0; c < 9; ++c) {
      boardString += boardGrid[r][c];
    }
  }
  return boardString;
}
