import clsx from "clsx";
import React from "react";

export const ControlButton = ({
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
      "h-8 w-8 flex items-center justify-center rounded",
      "bg-slate-800/50 text-gray-400 font-medium text-xl",
      "disabled:opacity-20"
    )}
    disabled={disabled}
    onClick={onClick}
  >
    {children}
  </button>
);
