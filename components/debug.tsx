import clsx from "clsx";
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { sudoku } from "../stores/sudoku";

const Button = ({
  className,
  ...props
}: DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) => (
  <button
    className={clsx(
      "flex px-2 py-1 rounded w-full justify-center",
      "bg-slate-800 text-gray-400 font-medium uppercase text-xs",
      "hover:bg-slate-800/70",
      "disabled:opacity-20"
    )}
    {...props}
  />
);

export const Dubug = () => (
  <div className="absolute left-full top-8 px-2 text-xs w-32">
    <div className="gap-1 flex flex-col justify-center items-center">
      <Button onClick={() => sudoku.empty()}>Empty</Button>
      <div className="my-1" />
      <Button onClick={() => sudoku.fill()}>Fill</Button>
      <Button onClick={() => sudoku.fillNext()}>Fill Next</Button>
      <div className="my-1" />
      <Button onClick={() => sudoku.eliminate()}>Eliminate</Button>
      <Button onClick={() => sudoku.eliminateNext()}>Eliminate Next</Button>
      <div className="my-1" />
      <Button onClick={() => sudoku.generate()}>Generate</Button>
    </div>
  </div>
);
