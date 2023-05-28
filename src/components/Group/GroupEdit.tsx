import { useStore } from "@/store";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { GroupDelete } from "@/components/Group/GroupDelete";
import { EditMarkdownMemo as EditMarkdown } from "@/components/Common/EditMarkdown";

export const GroupEdit = () => {
  const router = useRouter();
  const supabase = useSupabaseClient();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [createObjectURL, setCreateObjectURL] = useState<string | null>(null);
  const group = useStore((state) => state.group);

  useEffect(() => {
    setName(group.name);
    setDescription(group.description);
    setThumbnailUrl(group.thumbnail_url!);
  }, [group]);

  const onUploadImage = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files || files?.length == 0) {
      return;
    }

    setCreateObjectURL(URL.createObjectURL(files[0]));
    setThumbnail(files[0]);
  }, []);

  const handleUpdateGroup = async () => {
    let thumbnail_url = thumbnailUrl;

    if (thumbnail) {
      const { data: storageData, error: storageError } = await supabase.storage
        .from("group")
        .upload(uuidv4(), thumbnail);

      if (storageError) {
        alert(storageError.message);
        return;
      }

      if (thumbnail_url) {
        const fileName = thumbnail_url.split("/").slice(-1)[0];

        await supabase.storage.from("groups").remove([fileName]);
      }

      const { data: urlData } = supabase.storage.from("group").getPublicUrl(storageData.path);
      thumbnail_url = urlData.publicUrl;
    }

    const { error } = await supabase
      .from("groups")
      .update({
        name: name,
        description: description,
        thumbnail_url: thumbnail_url,
      })
      .eq("id", group.id);

    if (error) {
      alert(error.message);
      return;
    }

    router.reload();
  };

  return (
    <div className="py-8 px-5 border border-[#d0d7de] rounded-md md:py-10 md:px-12">
      <p className=" font-bold text-xl">グループ情報編集</p>
      <div className="mt-6">
        <p className="pl-1 text-sm font-medium">グループ名</p>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          className="mt-2.5 px-4 py-3 w-full max-w-[400px] text-sm border border-[#d0d7de] rounded outline-none"
          placeholder="Font Developer"
        />
      </div>
      <div className="mt-6">
        <p className="pl-1 text-sm font-medium">グループ概要</p>
        <EditMarkdown description={description} setDescription={setDescription} />
      </div>

      <div className="mt-5">
        <label
          htmlFor="thumbnail"
          className="block overflow-hidden relative cursor-pointer w-full pb-[66%] max-w-full rounded-lg sm:w-[360px] sm:h-[240px] sm:pb-0"
        >
          <Image
            src={createObjectURL ? createObjectURL : thumbnailUrl ? thumbnailUrl : "/no-image.jpg"}
            className="absolute inset-0 w-full h-full object-cover block rounded-lg"
            width={600}
            height={400}
            alt="グループサムネイル"
          />
          <PencilSquareIcon className="w-7 absolute top-1/2 left-1/2 translate-x-[-50%]  text-white z-10" />
          <span className="absolute inset-0 bg-black bg-opacity-20"></span>
        </label>
        <label htmlFor="thumbnail" className="text-sm mt-1 pl-1 text-[#555] cursor-pointer">
          画像を編集する
        </label>
        <input
          type="file"
          onChange={(e) => onUploadImage(e)}
          id="thumbnail"
          accept="image/*"
          className="hidden"
        />
      </div>
      <button
        className="mt-4 py-2 px-8 text-sm text-white bg-[#222] rounded hover:bg-[#555]"
        onClick={handleUpdateGroup}
      >
        保存する
      </button>
      <div className="mt-10 pt-10 border-t border-[#d0d7de] sm:mt-20 sm:pt-20">
        <p className=" font-bold text-xl">グループの削除</p>
        <p className="mt-2">グループに関する情報全てが削除されます。</p>
        <div className="mt-4">
          <GroupDelete />
        </div>
      </div>
    </div>
  );
};
