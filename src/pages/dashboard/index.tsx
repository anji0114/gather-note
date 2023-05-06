import { NextPage } from "next";
import { Layout } from "@/components/Layout";
import { DashboardFolder } from "@/components/Dashboard/DashboardFolder";
import { DashboardLayout } from "@/components/Dashboard/DashboardLayout";
import Head from "next/head";
import { LayoutContainer } from "@/components/Layout/LayoutContainer";

const DashboardPage: NextPage = () => {
  return (
    <DashboardLayout>
      <Head>
        <title>フォルダ一覧 - Gather Note</title>
      </Head>

      <DashboardFolder />
    </DashboardLayout>
  );
};

export default DashboardPage;
