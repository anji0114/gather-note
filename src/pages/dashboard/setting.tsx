import { NextPage } from "next";
import { DashBoardLayout } from "@/components/Dashboard/DashboardLayout";
import { DashboardSetting } from "@/components/Dashboard/DashboardSetting";
import { Layout } from "@/components/Layout";

const DashboardSettingPage: NextPage = () => {
 

  return (
    <div>
      <Layout>
        <DashBoardLayout>
          <DashboardSetting />
        </DashBoardLayout>
      </Layout>
    </div>
  );
};

export default DashboardSettingPage;
