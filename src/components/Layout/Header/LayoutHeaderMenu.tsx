import { FC } from "react";
import { useRouter } from "next/router";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import useSWR from "swr";
import Image from "next/image";
import Link from "next/link";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  ArrowLeftOnRectangleIcon,
  Cog8ToothIcon,
  FolderOpenIcon,
  UserCircleIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

const NAV_ITEMS = [
  {
    text: "フォルダ管理",
    icon: <FolderOpenIcon className="w-5 text-[#465667]" />,
    href: "/dashboard",
  },
  {
    text: "グループ管理",
    icon: <UserGroupIcon className="w-5 text-[#465667]" />,
    href: "/dashboard/group",
  },
  {
    text: "設定",
    icon: <Cog8ToothIcon className="w-5 text-[#465667]" />,
    href: "/dashboard/setting",
  },
];

export const LayoutHeaderMenu: FC = () => {
  const router = useRouter();
  const supbase = useSupabaseClient();
  const user = useUser();
  const { data } = useSWR(user ? "/api/profile" : null);

  const logout = async () => {
    await supbase.auth.signOut();
    router.push("/auth/login");
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="w-12 h-12">
          {data?.avatar_url ? (
            <Image
              src={data.avatar_url}
              alt="ユーザーアバター"
              className="w-full h-full object-cover rounded-full"
              width={150}
              height={150}
            />
          ) : (
            <UserCircleIcon className="w-full text-[#777]" />
          )}
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="bg-white shadow-md border border-[#F4F6F8] rounded w-48"
          sideOffset={7}
        >
          {NAV_ITEMS.map((item) => (
            <DropdownMenu.Item key={item.text} className="">
              <Link
                href={item.href}
                className="flex gap-2 items-center w-full py-3 px-5 hover:bg-[#F4F6F8]"
              >
                {item.icon}
                <span className="text-sm">{item.text}</span>
              </Link>
            </DropdownMenu.Item>
          ))}

          <DropdownMenu.Item className="border-t border-[#F4F6F8]">
            <button
              className="flex gap-2 items-center w-full py-3 px-5 hover:bg-[#F4F6F8]"
              onClick={logout}
            >
              <ArrowLeftOnRectangleIcon className="w-5 text-[#465667]" />
              <span className="text-sm">ログアウト</span>
            </button>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
