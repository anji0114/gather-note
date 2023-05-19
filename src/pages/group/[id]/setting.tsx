import { useRouter } from "next/router";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useStore } from "@/store";
import { Cog8ToothIcon } from "@heroicons/react/24/outline";
import { useCheckGroupOwnership } from "@/hooks/useCheckGroupOwnership";
import { useGroupMembership } from "@/hooks/useGroupMembership";
import { DashboardHeading } from "@/components/Common/Heading";
import { GroupEdit } from "@/components/Group/GroupEdit";
import { GroupLayout } from "@/components/Group/GroupLayout";
import { GroupRegister } from "@/components/Group/GroupRegister";
import { Meta } from "@/components/Common/Meta";

const GroupSettingPage = () => {
  const user = useUser();
  const supabase = useSupabaseClient();
  const router = useRouter();
  const group = useStore((state) => state.group);
  const { isOwnership, isLoading } = useCheckGroupOwnership(group.id);
  const { isMember, isLoading: isMemberLoading } = useGroupMembership(group.id);

  const handleUnregisterGroup = async () => {
    const { error } = await supabase
      .from("group_members")
      .delete()
      .eq("group_id", group.id)
      .eq("user_id", user?.id);

    if (error) {
      alert(error.message);
      return;
    }

    router.reload();
  };

  return (
    <>
    <Meta />
      <GroupLayout>
        <DashboardHeading icon={<Cog8ToothIcon />} text="設定" />
        {isMemberLoading ? (
          <></>
        ) : isMember ? (
          <div className="mt-8">
            {isLoading ? (
              <></>
            ) : isOwnership ? (
              <GroupEdit />
            ) : (
              <button
                className="py-2 px-7 text-sm text-[#DE6868] border border-[#DE6868] bg-white rounded-sm hover:bg-red-50"
                onClick={handleUnregisterGroup}
              >
                このグループを脱退する
              </button>
            )}
          </div>
        ) : (
          // グループ未加入の場合
          <GroupRegister groupId={group.id} />
        )}
      </GroupLayout>
    </>
  );
};

export default GroupSettingPage;
