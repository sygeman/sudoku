export function boardToGrid(boardString: string) {
  let rows: (string | null)[][] = [];
  let curRow: (string | null)[] = [];
  for (let i = 0; i < boardString.length; i++) {
    // curRow.push(boardString[i]);
    curRow.push(boardString[i] === "." ? null : boardString[i]);
    if (i % 9 == 8) {
      rows.push(curRow);
      curRow = [];
    }
  }
  return rows;
}