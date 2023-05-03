import { FC, ReactNode, useEffect, useState } from "react";
import { GridLayout } from "@/components/Common/Grid/GridLayout";
import {
  HomeIcon,
  ClipboardDocumentListIcon,
  UsersIcon,
  Cog8ToothIcon,
} from "@heroicons/react/24/outline";
import { useStore } from "@/store";
import { useRouter } from "next/router";

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

  return <GridLayout items={navItems}>{children}</GridLayout>;
};
