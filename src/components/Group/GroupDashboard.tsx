import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { FC } from "react";

export const GroupDashboard: FC<{ group: any }> = ({ group }) => {
  const supabase = useSupabaseClient();
  const user = useUser();
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
    <>
      <div className="mt-8 p-5 bg-blue-100">
        <div className="flex gap-5">
          <button
            className="border border-gray-300 bg-white py-2 px-5"
            onClick={handleUnregisterGroup}
          >
            脱退する
          </button>
          <button className="bg-blue-500 text-white py-2 px-5">ボード作成</button>
        </div>
      </div>

      <div className="mt-8 p-5 bg-gray-100">ボードを表示</div>

      <div className="mt-8 p-5 bg-green-100">メンバーを表示</div>
    </>
  );
};
