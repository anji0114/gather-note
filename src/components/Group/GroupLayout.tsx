import { FC, ReactNode, useEffect, useState } from "react";
import {
  HomeIcon,
  ClipboardDocumentListIcon,
  UsersIcon,
  Cog8ToothIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { Layout } from "@/components/Layout";
import { GridLayout } from "@/components/Common/Grid/GridLayout";
import { LayoutContainer } from "@/components/Layout/LayoutContainer";

export const GroupLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();
  const { id } = router.query;
  const [navItems, setNavItems] = useState([
    {
      title: "ホーム",
      href: "",
      icon: <HomeIcon className="w-[22px]" />,
    },
    {
      title: "ボード",
      href: "",
      icon: <ClipboardDocumentListIcon className="w-[22px]" />,
    },
    {
      title: "メンバー",
      href: "",
      icon: <UsersIcon className="w-[22px]" />,
    },
    {
      title: "設定",
      href: "",
      icon: <Cog8ToothIcon className="w-[22px]" />,
    },
  ]);

  useEffect(() => {
    if (id) {
      setNavItems([
        {
          title: "ホーム",
          href: `/group/${id}`,
          icon: <HomeIcon className="w-[22px]" />,
        },
        {
          title: "ボード",
          href: `/group/${id}/board`,
          icon: <ClipboardDocumentListIcon className="w-[22px]" />,
        },
        {
          title: "メンバー",
          href: `/group/${id}/member`,
          icon: <UsersIcon className="w-[22px]" />,
        },
        {
          title: "設定",
          href: `/group/${id}/setting`,
          icon: <Cog8ToothIcon className="w-[22px]" />,
        },
      ]);
    }
  }, [id]);

  return (
    <Layout classes="py-20 sm:py-24">
      <LayoutContainer>
        <GridLayout items={navItems}>{children}</GridLayout>
      </LayoutContainer>
    </Layout>
  );
};
