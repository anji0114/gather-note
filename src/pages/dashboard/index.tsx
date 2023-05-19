import { NextPage } from "next";
import { DashboardFolder } from "@/components/Dashboard/DashboardFolder";
import { DashboardLayout } from "@/components/Dashboard/DashboardLayout";
import { Meta } from "@/components/Common/Meta";

const DashboardPage: NextPage = () => {
  return (
    <>
      <Meta pageTitle="フォルダ管理" />
      <DashboardLayout>
        <DashboardFolder />
      </DashboardLayout>
    </>
  );
};

export default DashboardPage;
