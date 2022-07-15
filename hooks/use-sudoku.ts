import { useState } from "react";
import { DIFFICULTY } from "../constants";
import { boardToGrid } from "../libs/convert/board-to-grid";
import { generate } from "../libs/generate";

export const useSudoku = () => {
  const [selected, setSelected] = useState<[number, number]>([0, 0]);
  const [matrix, setMatrix] = useState<string[][]>(
    boardToGrid(generate(DIFFICULTY.easy))
  );

  const getValue = (rowIndex: number, cellIndex: number) =>
    matrix[rowIndex][cellIndex];

  const isSelected = (rowIndex: number, cellIndex: number) =>
    selected[0] === rowIndex && selected[1] === cellIndex;

  const isHighlightBackground = (rowIndex: number, cellIndex: number) =>
    selected[0] === rowIndex || selected[1] === cellIndex;

  const isHighlightText = (rowIndex: number, cellIndex: number) => {
    const selectedValue = getValue(selected[0], selected[1]);
    const currentValue = getValue(rowIndex, cellIndex);
    return !!(selectedValue && selectedValue === currentValue);
  };

  const setValue = (rowIndex: number, cellIndex: number, value: string) => {
    setMatrix((m) =>
      m.map((row, rI) => {
        if (rI !== rowIndex) return row;
        return row.map((cell, cI) => (cI !== cellIndex ? cell : value));
      })
    );
  };

  const setValueSelected = (value: string) => {
    setValue(selected[0], selected[1], value);
  };

  return {
    getValue,
    isSelected,
    isHighlightBackground,
    isHighlightText,
    setSelected,
    setValueSelected,
  };
};
