import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { FC } from "react";

import { FlagIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { useStore } from "@/store";

export const GroupRegister: FC<{ groupId: string }> = ({ groupId }) => {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const user = useUser();
  const asPath = router.asPath;
  const group = useStore((state) => state.group);

  const handleRegisterGroup = async () => {
    const { error } = await supabase.from("group_members").insert({
      group_id: groupId,
      user_id: user!.id,
      role: "member",
    });

    if (error) {
      alert(error.message);
      return;
    }

    const lastSegment = asPath.substring(asPath.lastIndexOf("/") + 1);

    if (lastSegment === "setting") {
      router.push(`/group/${group.id}`);
      return;
    }

    router.reload();
  };

  return (
    <div className="text-center mt-6">
      <button
        className="w-full inline-block text-sm font-medium p-3 text-white bg-[#222] rounded-md hover:bg-[#555]"
        onClick={handleRegisterGroup}
      >
        <span className="flex justify-center items-center gap-3 pr-9">
          <FlagIcon className="w-6" />
          このグループに参加する
        </span>
      </button>
    </div>
  );
};
