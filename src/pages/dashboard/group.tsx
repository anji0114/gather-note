import { DashboardGroup } from "@/components/Dashboard/DashboardGroup";
import { DashboardLayout } from "@/components/Dashboard/DashboardLayout";
import { NextPage } from "next";

const DashboardGroupPage: NextPage = () => {
  return (
    <DashboardLayout>
      <DashboardGroup />
    </DashboardLayout>
  );
};

export default DashboardGroupPage;
