import { GroupLayout } from "@/components/Group/GroupLayout";
import { useStore } from "@/store";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

const GroupSettingPage = () => {
  const user = useUser();
  const supabase = useSupabaseClient();
  const group = useStore((state) => state.editGroup);
  const router = useRouter();

  const handleUnregisterGroup = async () => {
    const { data, error } = await supabase
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
    <GroupLayout>
      <div className="border border-[#d0d7de]">設定</div>
      <button className="border border-gray-300 bg-white py-2 px-5" onClick={handleUnregisterGroup}>
        脱退する
      </button>
    </GroupLayout>
  );
};

export default GroupSettingPage;
