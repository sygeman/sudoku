import clsx from "clsx";
import React from "react";
import { ControlButton } from "./control-button";

const x9Array = [...new Array(9)];

export const Control = ({
  onAction,
}: {
  onAction: (payload: { type: string; value: string }) => void;
}) => (
  <>
    <div className="flex flex-wrap gap-1 w-full justify-center">
      {x9Array.map((_value, index) => (
        <ControlButton
          key={index}
          onClick={() => onAction({ type: "number", value: `${index + 1}` })}
        >
          {index + 1}
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
        onClick={() => onAction({ type: "remove", value: "." })}
      >
        Erase
      </button>
    </div>
  </>
);
