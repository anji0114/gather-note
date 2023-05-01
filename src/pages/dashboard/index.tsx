import { NextPage } from "next";
import { Layout } from "@/components/Layout";
import { DashboardFolder } from "@/components/Dashboard/DashboardFolder";
import { DashboardLayout } from "@/components/Dashboard/DashboardLayout";

const DashboardPage: NextPage = () => {
  return (
    <Layout>
      <DashboardLayout>
        <DashboardFolder />
      </DashboardLayout>
    </Layout>
  );
};

export default DashboardPage;
