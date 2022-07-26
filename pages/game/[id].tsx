import type { NextPage } from "next";
import Head from "next/head";
import { Game } from "../../components/game";
import { Layout } from "../../components/layout";

const GamePage: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Sudoku</title>
        <link rel="icon" type="image/ico" href="/favicon.ico" />
      </Head>
      <Game />
    </Layout>
  );
};

export default GamePage;
