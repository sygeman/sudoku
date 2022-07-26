import clsx from "clsx";
import { observer } from "mobx-react-lite";
import { sudoku } from "../stores/sudoku";

export const Dubug = observer(() => {
  const { selected } = sudoku;

  return (
    <div className="absolute left-full top-8 px-2 text-xs">
      <button
        className={clsx(
          "flex px-2 py-1 rounded",
          "bg-slate-800 text-gray-400 font-medium uppercase text-xs",
          "disabled:opacity-20"
        )}
        onClick={() => sudoku.solve()}
      >
        Solve
      </button>
      <div className="py-1 text-white/50">
        <div className="text-xs whitespace-nowrap uppercase">
          Selected: {selected}
        </div>
      </div>
    </div>
  );
});
