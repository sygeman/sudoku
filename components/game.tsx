import clsx from "clsx";
import { Control } from "./control";
import { X3Grid } from "./x3-grid";
import { Cell } from "./cell";
import { CellCandidates } from "./cell-candidates";
import { BLANK_CHAR, ROWS } from "../constants";
import { useState } from "react";
import { useSudoku } from "../hooks/sudoku";

export const Game = () => {
  const [debug, setDebug] = useState(false);
  const { boardAll, generate, reset, select } = useSudoku();

  return (
    <div className="w-80 md:scale-150 relative">
      <div className="flex h-8 w-full items-end py-1 whitespace-nowrap">
        <div
          className="w-full uppercase text-sm font-medium text-white/30"
          onClick={() => setDebug(!debug)}
        >
          Sudoku
        </div>
        <div className="flex gap-1">
          <button
            className={clsx(
              "flex px-1 rounded",
              "bg-slate-900 text-gray-400 font-medium uppercase text-xs",
              "disabled:opacity-20"
            )}
            onClick={generate}
          >
            New Game
          </button>
          <button
            className={clsx(
              "flex px-1 rounded",
              "bg-slate-900 text-gray-400 font-medium uppercase text-xs",
              "disabled:opacity-20"
            )}
            onClick={reset}
          >
            Reset
          </button>
        </div>
      </div>
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

              if (debug && value === BLANK_CHAR) {
                const candidates = cellData.candidates.join(" ");

                return (
                  <CellCandidates
                    candidates={candidates}
                    selected={cellSelected}
                    highlightLine={cellHighlightLine}
                    highlightSame={cellHighlightSame}
                    onClick={() => select(id)}
                  />
                );
              }

              return (
                <Cell
                  value={value === BLANK_CHAR ? "" : value}
                  selected={cellSelected}
                  highlightLine={cellHighlightLine}
                  highlightSame={cellHighlightSame}
                  highlightError={cellData.error}
                  notProtected={!cellData.protected}
                  onClick={() => select(id)}
                />
              );
            }}
          />
        )}
      />

      <div className="mt-4">
        <Control debug={debug} />
      </div>
    </div>
  );
};
