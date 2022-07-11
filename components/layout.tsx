import React from "react";

export const Layout = ({ children }: { children?: React.ReactNode }) => (
  <div className="flex items-center justify-center h-screen bg-slate-900 text-white">
    {children}
  </div>
);
