import { FC } from "react";
import { DashboardHeading } from "./DashboardHeading";
import { Cog8ToothIcon } from "@heroicons/react/24/outline";
import { useStore } from "@/store";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

export const DashboardSetting: FC = () => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const editProfile = useStore((state) => state.editProfile);
  const setEditProfile = useStore((state) => state.setEditProfile);

  const handleProfileUpdate = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .update({
        name: editProfile.name,
      })
      .eq("id", user!.id);

    if (error) {
      alert(error.message);
      return;
    }
  };

  return (
    <>
      <DashboardHeading title="設定" icon={<Cog8ToothIcon className="w-[30px]" />} />
      <div className="mt-8">
        <div className="py-10 px-16 border border-[#d0d7de] rounded-md space-y-7">
          <p className=" font-bold text-xl">プロフィール編集</p>
          <div>{/* <input type="file" /> */}</div>
          <div>
            <p className="pl-1 text-sm font-medium">ユーザーネーム</p>
            <input
              type="text"
              value={editProfile.name ? editProfile.name : ""}
              onChange={(e) => {
                setEditProfile({ ...editProfile, name: e.target.value });
              }}
              className="mt-2.5 px-4 py-3 w-full max-w-[400px] text-sm border border-[#d0d7de] rounded"
              placeholder="Font Developer"
            />
          </div>
          <div>
            <button
              className="py-2 px-8 text-sm text-white bg-[#222] rounded hover:bg-[#555]"
              onClick={handleProfileUpdate}
            >
              保存する
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
