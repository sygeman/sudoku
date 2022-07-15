export function boardToGrid(boardString: string) {
  let rows: string[][] = [];
  let curRow: string[] = [];
  for (let i = 0; i < boardString.length; i++) {
    curRow.push(boardString[i]);
    if (i % 9 == 8) {
      rows.push(curRow);
      curRow = [];
    }
  }
  return rows;
}
