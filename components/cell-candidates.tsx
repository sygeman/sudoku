import clsx from "clsx";

export const CellCandidates = ({
  candidates,
  selected,
  highlightLine,
  highlightSame,
  onClick,
}: {
  candidates: string;
  selected?: boolean;
  highlightLine?: boolean;
  highlightSame?: boolean;
  onClick?: () => void;
}) => (
  <button
    className={clsx(
      "flex flex-wrap justify-center items-center h-8 w-8 cursor-pointer rounded-sm",
      "font-medium text-white/30",
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
    <div className="text-xs scale-90">{candidates}</div>
  </button>
);
