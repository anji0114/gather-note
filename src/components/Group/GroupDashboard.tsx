import { FC } from "react";
import { useRouter } from "next/router";
import { useStore } from "@/store";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

export const GroupDashboard: FC = () => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const router = useRouter();
  const group = useStore((state) => state.editGroup);

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

  const handleCreateBoard = async () => {
    const { data, error } = await supabase
      .from("boards")
      .insert({
        group_id: group.id,
        name: "新規ボード",
      })
      .select("id")
      .single();

    if (error) {
      alert(error.message);
      return;
    }

    router.push(`/board/${data.id}`);
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
          <button className="bg-blue-500 text-white py-2 px-5" onClick={handleCreateBoard}>
            ボード作成
          </button>
        </div>
      </div>

      <div className="mt-8 p-5 bg-gray-100">
        <p>ボードを表示</p>
        <button className="mt-3 bg-blue-500 text-white py-2 px-4">ボード作成</button>
      </div>
    </>
  );
};
