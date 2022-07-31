import { useCallback, useEffect } from "react";
import { BLANK_CHAR, DIGITS, ROWS } from "../constants";

export const useKeyboardControl = ({
  selected,
  onValue,
  onSelect,
}: {
  selected: string;
  onValue: (value: string) => void;
  onSelect: (newSelected: string) => void;
}) => {
  const downHandler = useCallback(
    ({ key }: { key: string }) => {
      if (DIGITS.includes(key)) return onValue(key);

      if (["Backspace", "Delete", "Space"].includes(key))
        return onValue(BLANK_CHAR);

      const [row, col] = selected.split("");
      const rowsAsArray = ROWS.split("");
      const colsAsArray = DIGITS.split("");
      const indexRow = rowsAsArray.findIndex((r) => r === row);
      const indexCol = colsAsArray.findIndex((c) => c === col);
      let newRow = row;
      let newCol = col;

      switch (key) {
        case "ArrowUp":
          if (indexRow > 0) newRow = rowsAsArray[indexRow - 1];
          break;
        case "ArrowDown":
          if (indexRow < rowsAsArray.length - 1)
            newRow = rowsAsArray[indexRow + 1];
          break;
        case "ArrowLeft":
          if (indexCol > 0) newCol = colsAsArray[indexCol - 1];
          break;
        case "ArrowRight":
          if (indexCol < colsAsArray.length - 1)
            newCol = colsAsArray[indexCol + 1];
          break;
      }

      return onSelect(`${newRow}${newCol}`);
    },
    [selected, onValue, onSelect]
  );

  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    return () => {
      window.removeEventListener("keydown", downHandler);
    };
  }, [downHandler]);
};
