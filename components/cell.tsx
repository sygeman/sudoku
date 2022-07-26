import clsx from "clsx";

export const Cell = ({
  value,
  selected,
  highlightLine,
  highlightSame,
  notProtected,
  onClick,
}: {
  value: string;
  selected?: boolean;
  highlightLine?: boolean;
  highlightSame?: boolean;
  notProtected?: boolean;
  onClick?: () => void;
}) => (
  <button
    className={clsx(
      "flex justify-center items-center h-8 w-8 cursor-pointer rounded-sm",
      "font-medium text-xl text-white/50",
      notProtected && !selected ? "text-indigo-400" : "text-white/50",
      selected
        ? "bg-indigo-900"
        : highlightSame
        ? "bg-transparent"
        : highlightLine
        ? "bg-slate-700/60"
        : "bg-slate-800/70"
    )}
    onClick={() => onClick && onClick()}
  >
    {value}
  </button>
);
