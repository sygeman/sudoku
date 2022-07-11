import clsx from "clsx";
import React from "react";

export const ControlButton = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) => (
  <button
    className={clsx(
      "h-8 w-8 flex items-center justify-center rounded",
      "bg-slate-800 text-gray-400 font-medium"
    )}
    onClick={onClick}
  >
    {children}
  </button>
);
