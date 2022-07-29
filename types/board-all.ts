export type Cell = {
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

export type BoardAll = {
  [key: string]: Cell;
};

export type CellGroup = Map<number, Set<Cell>>;
