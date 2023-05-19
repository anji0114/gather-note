import { Meta } from "@/components/Common/Meta";
import { DashboardGroup } from "@/components/Dashboard/DashboardGroup";
import { DashboardLayout } from "@/components/Dashboard/DashboardLayout";
import { NextPage } from "next";

const DashboardGroupPage: NextPage = () => {
  return (
    <>
      <Meta pageTitle="グループ一覧" />
      <DashboardLayout>
        <DashboardGroup />
      </DashboardLayout>
    </>
  );
};

export default DashboardGroupPage;
