import { shuffle } from "../utils/shuffle";
import { Cell, CellGroup } from "../types/board-all";

export const findCellWithMinCandidates = ({
  cellGroup,
  pickRandomCandidate = false,
}: {
  cellGroup: CellGroup;
  pickRandomCandidate: boolean;
}) => {
  if (cellGroup.size === 0) return null;

  const group = cellGroup.values().next().value as Set<Cell>;
  const groupAsArray = Array.from(group);

  if (!pickRandomCandidate) return groupAsArray[0] || null;

  return shuffle(groupAsArray)[0] || null;
};
