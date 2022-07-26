import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import { Layout } from "../../components/layout";

const Game = dynamic(() => import("../../components/game"), { ssr: false });

const GamePage: NextPage = () => {
  const {
    query: { id },
  } = useRouter();

  return (
    <Layout>
      <Head>
        <title>Sudoku {id}</title>
        <link rel="icon" type="image/ico" href="/favicon.ico" />
      </Head>
      <Game />
    </Layout>
  );
};

export default GamePage;
