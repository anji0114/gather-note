import Link from "next/link";
import { FolderOpenIcon, SquaresPlusIcon } from "@heroicons/react/24/outline";
import { FC } from "react";

const NAV_ITEM = [
  {
    title: "フォルダ",
    href: "/dashboard",
    icon: <FolderOpenIcon className="w-[22px]" />,
  },
  // {
  //   title: "スレッド",
  //   href: "/dashboard/template",
  //   icon: <SquaresPlusIcon className="w-[22px]" />,
  // },
];

export const DashboardNav:FC = () => {
  return (
    <nav>
      <ul className="space-y-[6px]">
        {NAV_ITEM.map((item) => (
          <li key={item.title}>
            <Link
              href={item.href}
              className="py-2.5 px-4 w-full flex gap-2 items-center border border-[#d0d7de] rounded-md bg-white hover:bg-[#fafafa]"
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
