import { NextPage } from "next";
import { DashboardSetting } from "@/components/Dashboard/DashboardSetting";
import { DashboardLayout } from "@/components/Dashboard/DashboardLayout";
import { DashboardHeading } from "@/components/Common/Heading";
import { Cog8ToothIcon } from "@heroicons/react/24/outline";

const DashboardSettingPage: NextPage = () => {
  return (
    <DashboardLayout>
      <DashboardHeading text="設定" icon={<Cog8ToothIcon />} />
      <DashboardSetting />
    </DashboardLayout>
  );
};

export default DashboardSettingPage;
