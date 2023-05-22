import { FC, ReactNode, useState } from "react";
import { FolderOpenIcon, UserGroupIcon, Cog8ToothIcon } from "@heroicons/react/24/outline";
import { GridLayout } from "@/components/Common/GridLayout";
import { Layout } from "@/components/Layout";
import { LayoutContainer } from "@/components/Layout/LayoutContainer";
import { useRouter } from "next/router";

export const DashboardLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();
  const asPath = router.asPath;

  const navItems = [
    {
      title: "フォルダ",
      href: "/dashboard",
      icon: <FolderOpenIcon className="w-[22px]" />,
      isPage: asPath === "/dashboard",
    },
    {
      title: "グループ",
      href: "/dashboard/group",
      icon: <UserGroupIcon className="w-[22px]" />,
      isPage: asPath === "/dashboard/group",
    },
    {
      title: "設定",
      href: "/dashboard/setting",
      icon: <Cog8ToothIcon className="w-[22px]" />,
      isPage: asPath === "/dashboard/setting",
    },
  ];

  return (
    <Layout classes="py-20 md:py-24">
      <LayoutContainer>
        <GridLayout items={navItems}>{children}</GridLayout>
      </LayoutContainer>
    </Layout>
  );
};
