import clsx from "clsx";
import React from "react";

const x3Array = [...new Array(3)];

export const X3Grid = ({
  renderCell,
  gap = 1,
}: {
  renderCell: (rowIndex: number, cellIndex: number) => React.ReactNode;
  gap?: 1 | 2;
}) => (
  <div className={clsx("grid grid-cols-3", gap === 1 ? "gap-1" : "gap-2")}>
    {x3Array.map((_row, x3RowIndex) =>
      x3Array.map((_cell, x3CellIndex) => (
        <React.Fragment key={`${x3RowIndex}-${x3CellIndex}`}>
          {renderCell(x3RowIndex, x3CellIndex)}
        </React.Fragment>
      ))
    )}
  </div>
);
