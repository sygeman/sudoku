import { BLANK_CHAR } from "../constants";
import { BoardAll, CellGroup } from "../types/board-all";

export const groupCellByCandidatesCount = (boardAll: BoardAll) => {
  const cellGroup: CellGroup = new Map();

  Object.values(boardAll).forEach((cell) => {
    const { candidates, value } = cell;
    if (value !== BLANK_CHAR) return;
    const key = candidates.length;
    if (!cellGroup.has(key)) cellGroup.set(key, new Set());
    cellGroup.get(key)?.add(cell);
  });

  const sortedCellGroup: CellGroup = new Map();

  Array.from(cellGroup.keys())
    .sort()
    .forEach((key) => {
      const item = cellGroup.get(key);
      if (item) sortedCellGroup.set(key, item);
    });

  return sortedCellGroup;
};
