import { NextPage } from "next";
import { Layout } from "@/components/Layout";
import { DashboardFolder } from "@/components/Dashboard/DashboardFolder";
import { DashboardLayout } from "@/components/Dashboard/DashboardLayout";
import Head from "next/head";

const DashboardPage: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>フォルダ一覧 - Gather Note</title>
      </Head>
      <DashboardLayout>
        <DashboardFolder />
      </DashboardLayout>
    </Layout>
  );
};

export default DashboardPage;
