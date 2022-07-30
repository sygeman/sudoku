import type { NextPage } from "next";
import { useEffect } from "react";
import { useSudoku } from "../hooks/sudoku";

const Home: NextPage = () => {
  const { generate } = useSudoku();

  useEffect(() => {
    generate();
  }, [generate]);

  return null;
};

export default Home;
