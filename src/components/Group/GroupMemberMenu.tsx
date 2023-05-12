import { useRouter } from "next/router";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useStore } from "@/store";
import { ArrowLeftOnRectangleIcon, EllipsisHorizontalIcon } from "@heroicons/react/24/outline";

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

    // router.reload();
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
          className="bg-white shadow-md border border-[#F4F6F8] rounded w-[140px]"
          sideOffset={7}
        >
          <DropdownMenu.Item className="outline-none border-[#F4F6F8]">
            <button
              className="flex gap-2 justify-center items-center w-full py-3 px-4 text-[#DE6868]"
              onClick={handleUnregisterGroup}
            >
              <ArrowLeftOnRectangleIcon className="w-4" />
              <span className="text-[12px]">脱退させる</span>
            </button>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
