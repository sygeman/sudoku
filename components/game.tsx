import { Control } from "./control";
import { X3Grid } from "./x3-grid";
import { Cell } from "./cell";
import { observer } from "mobx-react-lite";
import { sudoku } from "../stores/sudoku";
import { CellCandidates } from "./cell-candidates";
import { ROWS } from "../constants";

export const Game = observer(() => {
  const { boardAll } = sudoku;

  return (
    <div className="w-80 scale-150">
      <X3Grid
        gap={2}
        renderCell={(mainRowIndex, mainCellIndex) => (
          <X3Grid
            renderCell={(innerRowIndex, innerCellIndex) => {
              const rowIndex = innerRowIndex + mainRowIndex * 3;
              const cellIndex = innerCellIndex + mainCellIndex * 3;
              const id = `${ROWS[rowIndex]}${cellIndex + 1}`;
              const cellData = boardAll[id];

              const cellSelected = cellData.selected;
              const cellHighlightLine = cellData.selectedLine;
              const cellHighlightSame = cellData.selectedSame;
              const value = cellData.value;

              if (value === ".") {
                const candidates = cellData.candidates.join(" ");

                return (
                  <CellCandidates
                    candidates={candidates}
                    selected={cellSelected}
                    highlightLine={cellHighlightLine}
                    highlightSame={cellHighlightSame}
                    onClick={() => sudoku.select(id)}
                  />
                );
              }

              return (
                <Cell
                  value={value === "." ? "" : value}
                  selected={cellSelected}
                  highlightLine={cellHighlightLine}
                  highlightSame={cellHighlightSame}
                  notProtected={!cellData.protected}
                  onClick={() => sudoku.select(id)}
                />
              );
            }}
          />
        )}
      />

      <div className="mt-4">
        <Control />
      </div>
    </div>
  );
});

export default Game;
