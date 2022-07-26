import type { NextPage } from "next";
import { useEffect } from "react";
import { useGenerate } from "../hooks/generate";

const Home: NextPage = () => {
  const { generate } = useGenerate();

  useEffect(() => {
    generate();
  }, [generate]);

  return null;
};

export default Home;
