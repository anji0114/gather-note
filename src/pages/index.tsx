import Head from "next/head";
import { Layout } from "@/components/Layout";
import { HomeMv } from "@/components/Home/HomeMv";
import { NextPage } from "next";
import { Meta } from "@/components/Common/Meta";

const Home: NextPage = () => {
  return (
    <>
      <Meta />
      <Layout>
        <HomeMv />
      </Layout>
    </>
  );
};

export default Home;
