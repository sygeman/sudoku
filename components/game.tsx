import clsx from "clsx";
import { Control } from "./control";
import { X3Grid } from "./x3-grid";
import { Cell } from "./cell";
import { CellCandidates } from "./cell-candidates";
import { BLANK_CHAR, ROWS } from "../constants";
import { useState } from "react";
import { useSudoku } from "../hooks/sudoku";
import { HeaderButton } from "./header-button";

export const Game = () => {
  const [debug, setDebug] = useState(false);
  const {
    failed,
    soloved,
    failures,
    boardData,
    includesCount,
    selectedIsProtected,
    generate,
    reset,
    select,
    setValueSelected,
  } = useSudoku();

  return (
    <div className="relative w-80 md:scale-150">
      <div className={clsx("relative", (failed || soloved) && "blur-sm")}>
        <div className="relative">
          <div className="flex h-8 w-full items-end py-1 whitespace-nowrap">
            <div className="w-full" onClick={() => setDebug(!debug)}>
              <div className="px-1 max-w-fit uppercase text-sm font-medium bg-indigo-900 text-white/50 rounded-sm">
                Sudoku
              </div>
            </div>
            <div className="flex gap-1">
              <HeaderButton onClick={generate}>New Game</HeaderButton>
              <HeaderButton onClick={reset}>Reset</HeaderButton>
            </div>
          </div>

          <div className="flex justify-between font-medium text-xs py-0.5 text-gray-400">
            <div>Easy</div>
            <div>Failures: {failures}/3</div>
          </div>

          <X3Grid
            gap={2}
            renderCell={(mainRowIndex, mainCellIndex) => (
              <X3Grid
                renderCell={(innerRowIndex, innerCellIndex) => {
                  const rowIndex = innerRowIndex + mainRowIndex * 3;
                  const cellIndex = innerCellIndex + mainCellIndex * 3;
                  const id = `${ROWS[rowIndex]}${cellIndex + 1}`;
                  const cellData = boardData[id];

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
            <Control
              debug={debug}
              includesCount={includesCount}
              selectedIsProtected={selectedIsProtected}
              setValueSelected={setValueSelected}
            />
          </div>
        </div>
      </div>
      {(failed || soloved) && (
        <div className="absolute inset-0 w-full h-full flex items-center">
          <div
            className={clsx(
              "w-full py-4 flex flex-col justify-center items-center",
              failed ? "bg-red-900/60 " : "bg-indigo-900/80 "
            )}
          >
            <div className="font-medium">
              {failed ? "Oh, no..." : "Awesome!"}
            </div>
            <div className="flex gap-1 mt-2">
              <HeaderButton onClick={generate}>New Game</HeaderButton>
              <HeaderButton onClick={reset}>Again</HeaderButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
