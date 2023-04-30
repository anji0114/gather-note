import Link from "next/link";
import { FC } from "react";
import { useRouter } from "next/router";
import { FolderOpenIcon, UserGroupIcon, Cog8ToothIcon } from "@heroicons/react/24/outline";

const NAV_ITEM = [
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

export const DashboardNav: FC = () => {
  const router = useRouter();

  return (
    <nav>
      <ul className="space-y-[6px]">
        {NAV_ITEM.map((item) => (
          <li key={item.title}>
            <Link
              href={item.href}
              className={`py-2.5 px-4 w-full flex gap-2 items-center rounded-md font-medium ${
                router.pathname === item.href
                  ? "text-white bg-[#9DAEBF] pointer-events-none"
                  : "bg-white border border-[#d0d7de] hover:bg-[#fafafa]"
              }`}
            >
              {item.icon}
              <span className=" inline-block text-sm pb-[1px]">{item.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
