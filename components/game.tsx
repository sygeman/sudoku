import { Control } from "./control";
import { X3Grid } from "./x3-grid";
import { Cell } from "./cell";
import { useSudoku } from "../hooks/use-sudoku";

export const Game = () => {
  const { getValue, isSelected, setSelected, setValueSelected } = useSudoku();

  return (
    <div className="w-80 scale-150">
      <X3Grid
        gap={2}
        renderCell={(mainRowIndex, mainCellIndex) => (
          <X3Grid
            renderCell={(innerRowIndex, innerCellIndex) => {
              const rowIndex = innerRowIndex + mainRowIndex * 3;
              const cellIndex = innerCellIndex + mainCellIndex * 3;
              const cellSelected = isSelected(rowIndex, cellIndex);
              const value = getValue(rowIndex, cellIndex);

              return (
                <Cell
                  value={value}
                  selected={cellSelected}
                  onClick={() => setSelected([rowIndex, cellIndex])}
                />
              );
            }}
          />
        )}
      />

      <div className="mt-4">
        <Control
          onAction={(payload) => {
            switch (payload.type) {
              case "number":
                return setValueSelected(payload.value);
              case "remove":
                return setValueSelected(null);
            }
          }}
        />
      </div>
    </div>
  );
};

export default Game;
