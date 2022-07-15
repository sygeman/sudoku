import clsx from "clsx";

export const Cell = ({
  value,
  selected,
  highlightBackground,
  highlightText,
  onClick,
}: {
  value: number | null | string;
  selected?: boolean;
  highlightBackground?: boolean;
  highlightText?: boolean;
  onClick?: () => void;
}) => (
  <button
    className={clsx(
      "flex justify-center items-center h-8 w-8 font-medium text-xl cursor-pointer",
      selected || highlightText
        ? "text-gray-200"
        : highlightBackground
        ? "text-gray-400"
        : "text-gray-500",
      selected
        ? "bg-indigo-900"
        : highlightBackground
        ? "bg-slate-700/80"
        : "bg-slate-800"
    )}
    onClick={() => onClick && onClick()}
  >
    {value}
  </button>
);
