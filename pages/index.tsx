import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import { Layout } from "../components/layout";

const Game = dynamic(() => import("../components/game"), { ssr: false });

const Home: NextPage = () => {
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

export default Home;
