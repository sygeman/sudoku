import React from "react";

export const Layout = ({ children }: { children?: React.ReactNode }) => (
  <div className="flex relative items-center justify-center h-screen bg-slate-900 text-white">
    <a
      className="absolute right-4 top-2 text-slate-400 font-medium"
      target="blank"
      href="https://github.com/sygeman/sudoku"
    >
      Github
    </a>
    {children}
  </div>
);
