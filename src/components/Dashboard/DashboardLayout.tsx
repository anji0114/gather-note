import { FC, ReactNode } from "react";
import { FolderOpenIcon, UserGroupIcon, Cog8ToothIcon } from "@heroicons/react/24/outline";
import { GridLayout } from "@/components/Common/Grid/GridLayout";
import { Layout } from "@/components/Layout";
import { LayoutContainer } from "@/components/Layout/LayoutContainer";

const NAV_ITEMS = [
  {
    title: "フォルダ",
    href: "/dashboard",
    icon: <FolderOpenIcon className="w-[22px]" />,
  },
  {
    title: "グループ",
    href: "/dashboard/group",
    icon: <UserGroupIcon className="w-[22px]" />,
  },
  {
    title: "設定",
    href: "/dashboard/setting",
    icon: <Cog8ToothIcon className="w-[22px]" />,
  },
];

export const DashboardLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Layout classes="py-20 sm:py-24">
      <LayoutContainer>
        <GridLayout items={NAV_ITEMS}>{children}</GridLayout>
      </LayoutContainer>
    </Layout>
  );
};
