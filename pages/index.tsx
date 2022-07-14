import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { Layout } from "../components/layout";

const Game = dynamic(() => import("../components/game"), { ssr: false });

const Home: NextPage = () => {
  return (
    <Layout>
      <Game />
    </Layout>
  );
};

export default Home;
