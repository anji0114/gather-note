import { ChevronDownIcon, MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Link from "next/link";

export const DashboardGroupMenu = () => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="flex items-center py-2.5 px-5 gap-2 rounded bg-[#222] text-white hover:bg-[#555]">
        <ChevronDownIcon className="w-[18px] translate-y-[1px]" />
        <span className="text-sm inline-block"> メニュー</span>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="bg-white shadow-md border border-[#F4F6F8] rounded w-48"
          sideOffset={7}
        >
          <DropdownMenu.Item>
            <Link
              href="/group/search"
              className="flex gap-2 items-center w-full py-3 px-5 text-blue-900 hover:bg-[#F4F6F8]"
            >
              <MagnifyingGlassIcon className="w-5 " />
              <span className="text-sm">グループ検索</span>
            </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Item className="border-t border-[#F4F6F8]">
            <Link
              href="/group/new"
              className="flex gap-2 items-center w-full py-3 px-5 hover:bg-[#F4F6F8]"
            >
              <PlusIcon className="w-5" />
              <span className="text-sm">グループ新規作成</span>
            </Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
