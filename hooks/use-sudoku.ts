import { useEffect, useState } from "react";
import { DIFFICULTY } from "../constants";
import { boardToGrid } from "../libs/convert/board-to-grid";
import { boardToString } from "../libs/convert/board-to-string";
import { generate } from "../libs/generate";
import { getIncludesCount } from "../libs/get-includes-count";

export const useSudoku = () => {
  const [selected, setSelected] = useState<[number, number]>([0, 0]);
  const [includesCount, setIncludesCount] = useState<{ [key: string]: number }>(
    {}
  );
  const [matrix, setMatrix] = useState<string[][]>(
    boardToGrid(generate(DIFFICULTY.easy))
  );

  const board = boardToString(matrix);

  useEffect(() => {
    console.log(board);
    setIncludesCount(getIncludesCount(board));
  }, [board]);

  const getValue = (rowIndex: number, cellIndex: number) =>
    matrix[rowIndex][cellIndex];

  const isSelected = (rowIndex: number, cellIndex: number) =>
    selected[0] === rowIndex && selected[1] === cellIndex;

  const isHighlightLine = (rowIndex: number, cellIndex: number) =>
    selected[0] === rowIndex || selected[1] === cellIndex;

  const isHighlightSame = (rowIndex: number, cellIndex: number) => {
    const selectedValue = getValue(selected[0], selected[1]);
    const currentValue = getValue(rowIndex, cellIndex);
    return !!(selectedValue !== "." && selectedValue === currentValue);
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
    includesCount,
    getValue,
    isSelected,
    isHighlightLine,
    isHighlightSame,
    setSelected,
    setValueSelected,
  };
};
