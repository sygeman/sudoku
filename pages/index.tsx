import type { NextPage } from "next";
import { Game } from "../components/game";
import { Layout } from "../components/layout";

const Home: NextPage = () => {
  return (
    <Layout>
      <Game />
    </Layout>
  );
};

export default Home;
