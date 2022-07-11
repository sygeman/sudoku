import { useState } from "react";
import { generateMatrix } from "./generate-matrix";

export const useSudoku = () => {
  const [selected, setSelected] = useState<[number, number]>([0, 0]);
  const [matrix, setMatrix] = useState<(number | null)[][]>(generateMatrix());

  const isSelected = (rowIndex: number, cellIndex: number) =>
    selected[0] === rowIndex && selected[1] === cellIndex;

  const getValue = (rowIndex: number, cellIndex: number) =>
    matrix[rowIndex][cellIndex];

  const setValue = (
    rowIndex: number,
    cellIndex: number,
    value: number | null
  ) => {
    setMatrix((m) =>
      m.map((row, rI) => {
        if (rI !== rowIndex) return row;
        return row.map((cell, cI) => {
          return cI !== cellIndex ? cell : value;
        });
      })
    );
  };

  const setValueSelected = (value: number | null) => {
    setValue(selected[0], selected[1], value);
  };

  return {
    getValue,
    isSelected,
    setSelected,
    setValueSelected,
  };
};
