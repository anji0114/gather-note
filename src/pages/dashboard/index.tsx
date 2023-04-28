import { NextPage } from "next";
import { Layout } from "@/components/Layout";
import { DashBoardLayout } from "@/components/Dashboard/DashboardLayout";
import { DashboardFolder } from "@/components/Dashboard/DashboardFolder";

const Dashboard: NextPage = () => {
  return (
    <Layout>
      <DashBoardLayout>
        <DashboardFolder />
      </DashBoardLayout>
    </Layout>
  );
};

export default Dashboard;
