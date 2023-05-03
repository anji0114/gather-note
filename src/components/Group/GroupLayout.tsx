import { FC, ReactNode, useEffect, useState } from "react";
import { GridLayout } from "@/components/Common/Grid/GridLayout";
import {
  HomeIcon,
  ClipboardDocumentListIcon,
  UsersIcon,
  Cog8ToothIcon,
} from "@heroicons/react/24/outline";
import { useStore } from "@/store";

export const GroupLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const group = useStore((state) => state.editGroup);
  const [navItems, setNavItems] = useState([
    {
      title: "ホーム",
      href: `/`,
      icon: <HomeIcon className="w-[22px]" />,
    },
    {
      title: "ボード",
      href: `/`,
      icon: <ClipboardDocumentListIcon className="w-[22px]" />,
    },
    {
      title: "メンバー",
      href: `/`,
      icon: <UsersIcon className="w-[22px]" />,
    },
    {
      title: "設定",
      href: `/`,
      icon: <Cog8ToothIcon className="w-[22px]" />,
    },
  ]);

  useEffect(() => {
    if (group?.id) {
      setNavItems([
        {
          title: "ホーム",
          href: `/group/${group.id}`,
          icon: <HomeIcon className="w-[22px]" />,
        },
        {
          title: "ボード",
          href: `/group/${group.id}/board`,
          icon: <ClipboardDocumentListIcon className="w-[22px]" />,
        },
        {
          title: "メンバー",
          href: `/group/${group.id}/member`,
          icon: <UsersIcon className="w-[22px]" />,
        },
        {
          title: "設定",
          href: `/group/${group.id}/setting`,
          icon: <Cog8ToothIcon className="w-[22px]" />,
        },
      ]);
    }
  }, [group]);

  return <GridLayout items={navItems}>{children}</GridLayout>;
};
