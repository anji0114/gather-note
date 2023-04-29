import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { FC } from "react";

export const GroupRegister: FC<{ groupId: string }> = ({ groupId }) => {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const user = useUser();

  const handleRegisterGroup = async () => {
    const { error } = await supabase.from("group_members").insert({
      group_id: groupId,
      user_id: user!.id,
    });

    if (error) {
      alert(error.message);
      return;
    }

    router.reload();
  };

  return (
    <div className="text-center mt-8">
      このグループに
      <button
        className="ml-5 inline-block text-sm py-2 px-6 text-white bg-[#222] rounded-sm"
        onClick={handleRegisterGroup}
      >
        参加する
      </button>
    </div>
  );
};
