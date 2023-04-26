import { NextPage } from "next";
import { Layout } from "@/components/Layout";
import { DashBoardLayout } from "@/components/Dashboard/DashboardLayout";
import { DashboardNotes } from "@/components/Dashboard/DashboardNotes";

const Dashboard: NextPage = () => {
  return (
    <Layout>
      <DashBoardLayout>
        <DashboardNotes />
      </DashBoardLayout>
    </Layout>
  );
};

export default Dashboard;
