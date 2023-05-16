import { useRouter } from "next/router";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useStore } from "@/store";
import {
  AdjustmentsHorizontalIcon,
  ArrowLeftOnRectangleIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";

export const GroupMemberMenu = ({ userId }: { userId: string | undefined }) => {
  const supabase = useSupabaseClient();
  const group = useStore((state) => state.group);
  const router = useRouter();

  const handleUnregisterGroup = async () => {
    const { data, error } = await supabase
      .from("group_members")
      .delete()
      .eq("group_id", group.id)
      .eq("user_id", userId)
      .select();

    if (error) {
      alert(error.message);
      return;
    }

    console.log(data);
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild className="outline-none">
        <button className="w-6">
          <EllipsisHorizontalIcon />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="bg-white shadow-md border border-[#F4F6F8] rounded w-[150px]"
          sideOffset={7}
        >
          <DropdownMenu.Item className="outline-none">
            <button className=" border-t flex gap-2  items-center w-full py-2.5 px-4">
              <AdjustmentsHorizontalIcon className="w-5" />
              <span className="text-sm">権限編集</span>
            </button>
          </DropdownMenu.Item>
          <DropdownMenu.Item className="outline-none border-t border-[#F4F6F8]">
            <button
              className="flex gap-2  items-center w-full py-2.5 px-4 text-[#DE6868]"
              onClick={handleUnregisterGroup}
            >
              <ArrowLeftOnRectangleIcon className="w-5" />
              <span className="text-sm">脱退させる</span>
            </button>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
