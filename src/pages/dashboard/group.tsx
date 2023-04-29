import { DashboardGroup } from "@/components/Dashboard/DashboardGroup";
import { DashBoardLayout } from "@/components/Dashboard/DashboardLayout";
import { Layout } from "@/components/Layout";
import { NextPage } from "next";

const DashboardGroupPage: NextPage = () => {
  return (
    <Layout>
      <DashBoardLayout>
        <DashboardGroup />
      </DashBoardLayout>
    </Layout>
  );
};

export default DashboardGroupPage;
