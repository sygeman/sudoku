import clsx from "clsx";
import { observer } from "mobx-react-lite";
import React from "react";
import { sudoku } from "../stores/sudoku";
import { ControlButton } from "./control-button";

const x9Array = [...new Array(9)];

export const Control = observer(() => {
  const { includesCount } = sudoku;

  return (
    <>
      <div className="flex flex-wrap gap-1 w-full justify-center">
        {x9Array.map((_value, index) => (
          <ControlButton
            key={index}
            disabled={includesCount[index + 1] === 9}
            onClick={() => sudoku.setValueSelected(`${index + 1}`)}
          >
            <>
              {index + 1}
              <span className="absolute top-0 right-0 text-xs scale-75 px-0.5 opacity-50">
                {`${9 - includesCount[index + 1]}`}
              </span>
            </>
          </ControlButton>
        ))}
      </div>
      <div className="mt-2 flex flex-wrap gap-1 w-full justify-center">
        <button
          className={clsx(
            "py-1 px-2 rounded",
            "bg-slate-800/50 text-gray-400 font-medium uppercase text-sm",
            "disabled:opacity-20"
          )}
          onClick={() => sudoku.generate()}
        >
          New Game
        </button>
        <button
          className={clsx(
            "py-1 px-2 rounded",
            "bg-slate-800/50 text-gray-400 font-medium uppercase text-sm",
            "disabled:opacity-20"
          )}
          onClick={() => sudoku.setValueSelected(".")}
        >
          Erase
        </button>
        <button
          className={clsx(
            "py-1 px-2 rounded",
            "bg-slate-800/50 text-gray-400 font-medium uppercase text-sm",
            "disabled:opacity-20"
          )}
          onClick={() => sudoku.solve()}
        >
          Solve
        </button>
      </div>
    </>
  );
});
