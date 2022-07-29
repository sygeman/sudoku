import clsx from "clsx";
import { observer } from "mobx-react-lite";
import SimpleBar from "simplebar-react";
import { sudoku } from "../stores/sudoku";

export const History = observer(() => {
  const { selected, history, fillCount, emptyCount } = sudoku;

  return (
    <div className="absolute right-full top-2 w-24 px-2 text-xs h-full">
      <div className="py-1 text-white/50">
        <div className="text-xs whitespace-nowrap uppercase">
          Selected: {selected}
        </div>
        <div className="text-xs whitespace-nowrap uppercase">
          Fill: {fillCount}
        </div>
        <div className="text-xs whitespace-nowrap uppercase">
          Empty: {emptyCount}
        </div>
      </div>
      <SimpleBar className="h-[calc(100%-7rem)]">
        <div>
          {history
            .slice()
            .reverse()
            .map((item, i) => (
              <div key={i} className="flex">
                <div className="w-5 flex justify-end text-gray-50/50 font-medium">
                  {item.id}:
                </div>
                <div className="px-0.5">{item.value}</div>
              </div>
            ))}
        </div>
      </SimpleBar>
    </div>
  );
});
