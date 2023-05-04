import Head from "next/head";
import { Layout } from "@/components/Layout";
import { HomeMv } from "@/components/Home/HomeMv";
import { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Gather Note</title>
        <meta name="description" content="1ページずつ、ノートを一緒に集める - GatherNote" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Layout>
        <HomeMv />
      </Layout>
    </>
  );
};

export default Home;
