import clsx from "clsx";
import React from "react";
import { BLANK_CHAR } from "../constants";
import { ControlButton } from "./control-button";

const x9Array = [...new Array(9)];

export const Control = ({
  debug = false,
  includesCount,
  selectedIsProtected,
  setValueSelected,
}: {
  debug: boolean;
  includesCount: {
    [key: string]: number;
  };
  selectedIsProtected: boolean;
  setValueSelected: (value: string) => void;
}) => (
  <>
    <div className="flex flex-wrap gap-1 w-full justify-center">
      {x9Array.map((_value, index) => (
        <ControlButton
          key={index}
          disabled={includesCount[index + 1] === 9}
          onClick={() => setValueSelected(`${index + 1}`)}
        >
          <>
            {index + 1}
            {debug && (
              <span className="absolute top-0 right-0 text-xs scale-75 px-0.5 opacity-50">
                {`${9 - includesCount[index + 1]}`}
              </span>
            )}
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
        disabled={selectedIsProtected}
        onClick={() => setValueSelected(BLANK_CHAR)}
      >
        Erase
      </button>
    </div>
  </>
);
