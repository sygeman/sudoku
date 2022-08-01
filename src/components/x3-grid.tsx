import clsx from "clsx";
import { JSX } from "solid-js";

const x3Array = [...new Array(3)];

export const X3Grid = (props: {
  renderCell: (rowIndex: number, cellIndex: number) => JSX.Element;
  gap?: 1 | 2;
}) => (
  <div
    class={clsx("grid grid-cols-3", props.gap === 1 ? "gap-0.5" : "gap-1.5")}
  >
    {x3Array.map((_row, x3RowIndex) =>
      x3Array.map((_cell, x3CellIndex) => (
        <>{props.renderCell(x3RowIndex, x3CellIndex)}</>
      ))
    )}
  </div>
);
