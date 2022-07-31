import clsx from "clsx";
import { Control } from "./control";
import { X3Grid } from "./x3-grid";
import { Cell } from "./cell";
import { CellCandidates } from "./cell-candidates";
import { BLANK_CHAR, ROWS } from "../constants";
import { useState } from "react";
import { useSudoku } from "../hooks/sudoku";
import { HeaderButton } from "./header-button";
import { useDifficulty } from "../hooks/difficulty";

export const Game = () => {
  const [debug, setDebug] = useState(false);
  const {
    failed,
    soloved,
    failures,
    boardData,
    difficulty,
    includesCount,
    selectedIsProtected,
    newGame,
    reset,
    select,
    setValueSelected,
  } = useSudoku();
  const difficultyLabel = useDifficulty(difficulty);

  return (
    <div className="relative w-80 md:scale-150">
      <div className={clsx("relative", soloved && "blur-sm")}>
        <div className="relative">
          <div className="flex h-8 w-full items-end py-1 whitespace-nowrap">
            <div className="w-full" onClick={() => setDebug(!debug)}>
              <div className="px-1 max-w-fit uppercase text-sm font-medium bg-indigo-900 text-white/50 rounded-sm">
                Sudoku
              </div>
            </div>
            <div className="flex gap-1">
              <HeaderButton onClick={newGame}>New Game</HeaderButton>
              <HeaderButton onClick={reset}>Reset</HeaderButton>
            </div>
          </div>

          <div className="flex justify-between font-medium text-xs py-0.5 text-gray-400">
            <div>{difficultyLabel}</div>
            <div>Failures: {failures}</div>
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
      {soloved && (
        <div className="absolute inset-0 w-full h-full flex items-center">
          <div
            className={clsx(
              "w-full py-4 flex flex-col justify-center items-center",
              "bg-indigo-900/80 "
            )}
          >
            <div className="font-medium">Awesome!</div>
            <div className="font-medium text-xs text-gray-400">
              Failures: {failures}
            </div>
            <div className="flex gap-1 mt-2">
              <HeaderButton onClick={newGame}>New Game</HeaderButton>
              <HeaderButton onClick={reset}>Again</HeaderButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
