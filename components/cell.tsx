import clsx from "clsx";

export const Cell = ({
  value,
  selected,
  highlightLine,
  highlightSame,
  onClick,
}: {
  value: string;
  selected?: boolean;
  highlightLine?: boolean;
  highlightSame?: boolean;
  onClick?: () => void;
}) => (
  <button
    className={clsx(
      "flex justify-center items-center h-8 w-8 font-medium text-xl cursor-pointer rounded-sm",
      selected || highlightSame ? "text-gray-300" : "text-gray-500",
      selected
        ? "bg-indigo-900"
        : highlightLine
        ? "bg-slate-700/60"
        : "bg-slate-800/70"
    )}
    onClick={() => onClick && onClick()}
  >
    {value}
  </button>
);
