import { DashboardGroup } from "@/components/Dashboard/DashboardGroup";
import { DashboardLayout } from "@/components/Dashboard/DashboardLayout";
import { Layout } from "@/components/Layout";
import { NextPage } from "next";

const DashboardGroupPage: NextPage = () => {
  return (
    <Layout>
      <DashboardLayout>
        <DashboardGroup />
      </DashboardLayout>
    </Layout>
  );
};

export default DashboardGroupPage;
