import { FC, ReactNode, useEffect, useState } from "react";
import {
  HomeIcon,
  ClipboardDocumentListIcon,
  UsersIcon,
  Cog8ToothIcon,
  ArrowUturnLeftIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { Layout } from "@/components/Layout";
import { GridLayout } from "@/components/Common/Grid/GridLayout";
import { LayoutContainer } from "@/components/Layout/LayoutContainer";
import { useStore } from "@/store";
import useSWR from "swr";

export const GroupLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();
  const { id } = router.query;
  const asPath = router.asPath;
  const { data, error, isLoading } = useSWR(id ? `/api/groups/${id}` : null);
  const setGroup = useStore((state) => state.setGroup);

  const [navItems, setNavItems] = useState([
    {
      title: "ホーム",
      href: "",
      icon: <HomeIcon className="w-[22px]" />,
      isPage: false,
    },
    {
      title: "ボード",
      href: "",
      icon: <ClipboardDocumentListIcon className="w-[22px]" />,
      isPage: false,
    },
    {
      title: "メンバー",
      href: "",
      icon: <UsersIcon className="w-[22px]" />,
      isPage: false,
    },
    {
      title: "設定",
      href: "",
      icon: <Cog8ToothIcon className="w-[22px]" />,
      isPage: false,
    },
    {
      title: "グループ一覧",
      href: "/dashboard/group",
      icon: <ArrowUturnLeftIcon className="w-[22px]" />,
      isPage: false,
    },
  ]);

  useEffect(() => {
    if (id && asPath) {
      const lastSegment = asPath.substring(asPath.lastIndexOf("/") + 1);
      setNavItems([
        {
          title: "ホーム",
          href: `/group/${id}`,
          icon: <HomeIcon className="w-[22px]" />,
          isPage: lastSegment === id,
        },
        {
          title: "ボード",
          href: `/group/${id}/board`,
          icon: <ClipboardDocumentListIcon className="w-[22px]" />,
          isPage: lastSegment === "board",
        },
        {
          title: "メンバー",
          href: `/group/${id}/member`,
          icon: <UsersIcon className="w-[22px]" />,
          isPage: lastSegment === "member",
        },
        {
          title: "設定",
          href: `/group/${id}/setting`,
          icon: <Cog8ToothIcon className="w-[22px]" />,
          isPage: lastSegment === "setting",
        },
        {
          title: "グループ一覧",
          href: "/dashboard/group",
          icon: <ArrowUturnLeftIcon className="w-[22px]" />,
          isPage: false,
        },
      ]);
    }
  }, [id, asPath]);

  useEffect(() => {
    if (data) {
      setGroup({
        id: data.id,
        name: data.name,
        description: data.description,
        owner_id: data.owner_id,
        thumbnail_url: data.thumbnail_url,
        created_at: data.created_at,
      });
    }
  }, [data]);

  return (
    <Layout classes="py-20 sm:py-24">
      <LayoutContainer>
        <GridLayout items={navItems}>{children}</GridLayout>
      </LayoutContainer>
    </Layout>
  );
};
