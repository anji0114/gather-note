import Head from "next/head";
import { Layout } from "@/components/Layout";
import { HomeMv } from "@/components/Home/HomeMv";
import { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Prompt Note</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <HomeMv />
      </Layout>
    </>
  );
};

export default Home;
