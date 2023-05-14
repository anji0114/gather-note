import { ChangeEvent, FC, useCallback, useEffect, useState } from "react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import useSWR from "swr";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";
import Image from "next/image";
import { PencilIcon, PencilSquareIcon, UserCircleIcon } from "@heroicons/react/24/outline";

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

  const onUploadImage = useCallback((e: ChangeEvent<HTMLInputElement>) => {
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
    <div className="mt-8 py-10 px-16 border border-[#d0d7de] rounded-md space-y-7">
      <p className=" font-bold text-xl">プロフィール編集</p>
      <div>
        <label htmlFor="avatar" className="block w-[200px] h-[200px] relative cursor-pointer">
          <Image
            className="w-full h-full object-cover rounded-full"
            src={data?.avatar_url ? data.avatar_url : "/no-image/jpg"}
            alt=""
            width={200}
            height={200}
          />
          <span className="absolute bottom-0 right-[-10px] flex items-center gap-1.5 py-1.5 pl-2 pr-4 rounded bg-white border border-[#d0d7de]">
            <PencilIcon className="w-5 text-[#555]" />
            <span className="text-sm text-medium">編集</span>
          </span>
        </label>
        <input
          type="file"
          id="avatar"
          className="hidden"
          accept="image/*"
          onChange={(e) => onUploadImage(e)}
        />
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
  );
};
