import type { NextPage } from "next";
import Head from "next/head";
import { HeaderButton } from "../components/header-button";
import { Layout } from "../components/layout";
import { DIFFICULTY } from "../constants";
import { useSudoku } from "../hooks/sudoku";

const Home: NextPage = () => {
  const { generate } = useSudoku();

  return (
    <Layout>
      <Head>
        <title>Sudoku</title>
        <link rel="icon" type="image/ico" href="/favicon.ico" />
      </Head>
      <div className="scale-150 flex flex-col items-center">
        <div className="uppercase font-medium text-gray-400">New game</div>
        <div className="flex gap-1 mt-2">
          <HeaderButton onClick={() => generate(DIFFICULTY.easy)}>
            Easy
          </HeaderButton>
          <HeaderButton onClick={() => generate(DIFFICULTY.medium)}>
            Medium
          </HeaderButton>
          <HeaderButton onClick={() => generate(DIFFICULTY.hard)}>
            Hard
          </HeaderButton>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
