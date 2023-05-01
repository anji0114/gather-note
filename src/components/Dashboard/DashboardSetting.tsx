import { FC, useCallback, useEffect, useState } from "react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import useSWR from "swr";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";
import { DashboardHeading } from "./DashboardHeading";
import { Cog8ToothIcon } from "@heroicons/react/24/outline";

export const DashboardSetting: FC = () => {
  const router = useRouter();
  const supabase = useSupabaseClient();
  const user = useUser();
  const { data, error, isLoading } = useSWR(user ? "/api/profile" : null);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    if (data) {
      setName(data.name);
      setAvatarUrl(data.avatar_url);
    }
  }, [data]);

  const onUploadImage = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files || files?.length == 0) {
      return;
    }

    setAvatar(files[0]);
  }, []);

  const handleProfileUpdate = async () => {
    let avatar_url = avatarUrl;

    if (avatar) {
      // supabaseストレージに画像アップロード
      const { data: storageData, error: storageError } = await supabase.storage
        .from("profile")
        .upload(`${user!.id}/${uuidv4()}`, avatar);

      if (storageError) {
        alert(storageError.message);
        return;
      }

      if (avatar_url) {
        const fileName = avatar_url.split("/").slice(-1)[0];

        // 古い画像を削除
        await supabase.storage.from("profile").remove([`${user!.id}/${fileName}`]);
      }

      // 画像のURLを取得
      const { data: urlData } = supabase.storage.from("profile").getPublicUrl(storageData.path);

      avatar_url = urlData.publicUrl;
    }

    const { error } = await supabase
      .from("profiles")
      .update({
        name: name,
        avatar_url: avatar_url,
      })
      .eq("id", user!.id);

    if (error) {
      alert(error.message);
      return;
    }
    router.reload();
  };

  return (
    <>
      <DashboardHeading title="設定" icon={<Cog8ToothIcon className="w-[30px]" />} />
      <div className="mt-8">
        <div className="py-10 px-16 border border-[#d0d7de] rounded-md space-y-7">
          <p className=" font-bold text-xl">プロフィール編集</p>
          <div className="w-[150px]">
            <input type="file" accept="image/*" onChange={(e) => onUploadImage(e)} />
          </div>
          <div>
            <p className="pl-1 text-sm font-medium">ユーザーネーム</p>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
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
