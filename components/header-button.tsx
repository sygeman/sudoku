import clsx from "clsx";
import React from "react";

export const HeaderButton = ({
  children,
  disabled,
  onClick,
}: {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}) => (
  <button
    className={clsx(
      "flex px-2 py-0.5 rounded transition-colors delay-75",
      "bg-slate-800 text-gray-400 font-medium uppercase text-xs",
      "hover:bg-slate-700",
      "disabled:opacity-20"
    )}
    disabled={disabled}
    onClick={onClick}
  >
    {children}
  </button>
);
