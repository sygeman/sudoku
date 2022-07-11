import clsx from "clsx";

export const Cell = ({
  value,
  selected,
  onClick,
}: {
  value: number | null | string;
  selected?: boolean;
  onClick?: () => void;
}) => (
  <button
    className={clsx(
      "flex justify-center items-center h-8 w-8 font-medium cursor-pointer",
      selected ? "bg-slate-700 text-gray-200" : "bg-slate-800 text-gray-500"
    )}
    onClick={() => onClick && onClick()}
  >
    {value}
  </button>
);
