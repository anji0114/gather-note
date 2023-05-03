import { NextPage } from "next";
import useSWR from "swr";

import { DashboardSetting } from "@/components/Dashboard/DashboardSetting";
import { Layout } from "@/components/Layout";
import { DashboardLayout } from "@/components/Dashboard/DashboardLayout";


const DashboardSettingPage: NextPage = () => {
  return (
    <Layout>
      <DashboardLayout>
        <DashboardSetting />
      </DashboardLayout>
    </Layout>
  );
};

export default DashboardSettingPage;
