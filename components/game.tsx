import { Control } from "./control";
import { X3Grid } from "./x3-grid";
import { Cell } from "./cell";
import { useSudoku } from "../hooks/use-sudoku";

export const Game = () => {
  const {
    includesCount,
    getValue,
    isSelected,
    setSelected,
    isHighlightLine,
    isHighlightSame,
    setValueSelected,
  } = useSudoku();

  return (
    <div className="w-80 scale-150">
      <X3Grid
        gap={2}
        renderCell={(mainRowIndex, mainCellIndex) => (
          <X3Grid
            renderCell={(innerRowIndex, innerCellIndex) => {
              const rowIndex = innerRowIndex + mainRowIndex * 3;
              const cellIndex = innerCellIndex + mainCellIndex * 3;
              const cellSelected = isSelected(rowIndex, cellIndex);
              const cellHighlightLine = isHighlightLine(rowIndex, cellIndex);
              const cellHighlightSame = isHighlightSame(rowIndex, cellIndex);
              const value = getValue(rowIndex, cellIndex);

              return (
                <Cell
                  value={value === "." ? "" : value}
                  selected={cellSelected}
                  highlightLine={cellHighlightLine}
                  highlightSame={cellHighlightSame}
                  onClick={() => setSelected([rowIndex, cellIndex])}
                />
              );
            }}
          />
        )}
      />

      <div className="mt-4">
        <Control
          includesCount={includesCount}
          onAction={(payload) => setValueSelected(payload.value)}
        />
      </div>
    </div>
  );
};

export default Game;
