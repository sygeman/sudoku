import clsx from "clsx";
import { observer } from "mobx-react-lite";
import { sudoku } from "../stores/sudoku";

export const Dubug = observer(() => {
  return (
    <div className="absolute left-full top-8 px-2 text-xs w-32">
      <div className="gap-1 flex flex-col justify-center items-center">
        <button
          className={clsx(
            "flex px-2 py-1 rounded w-full justify-center",
            "bg-slate-800 text-gray-400 font-medium uppercase text-xs",
            "disabled:opacity-20"
          )}
          onClick={() => sudoku.fill()}
        >
          Fill
        </button>
        <button
          className={clsx(
            "flex px-2 py-1 rounded w-full justify-center",
            "bg-slate-800 text-gray-400 font-medium uppercase text-xs",
            "disabled:opacity-20"
          )}
          onClick={() => sudoku.fillNext()}
        >
          Fill Next
        </button>
        <button
          className={clsx(
            "flex px-2 py-1 rounded w-full justify-center",
            "bg-slate-800 text-gray-400 font-medium uppercase text-xs",
            "disabled:opacity-20"
          )}
          onClick={() => sudoku.empty()}
        >
          Empty
        </button>
      </div>
    </div>
  );
});
