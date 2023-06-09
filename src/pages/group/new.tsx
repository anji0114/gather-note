import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import { useRouter } from "next/router";
import TextareaAutosize from "react-textarea-autosize";
import { v4 as uuidv4 } from "uuid";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { ChevronLeftIcon, PlusCircleIcon } from "@heroicons/react/24/outline";

import { Layout } from "@/components/Layout";
import { LayoutContainer } from "@/components/Layout/LayoutContainer";
import { Meta } from "@/components/Common/Meta";
import { EditMarkdownMemo as EditMarkdown } from "@/components/Common/EditMarkdown";
import Link from "next/link";

const GroupNewPage = () => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const router = useRouter();
  const [name, setName] = useState("");
  const nameRef = useRef<HTMLInputElement>(null);
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [createObjectURL, setCreateObjectURL] = useState<string | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files || files?.length == 0) {
      return;
    }
    setThumbnail(files[0]);
    setCreateObjectURL(URL.createObjectURL(files[0]));
  };

  const handleCreateGroup = async () => {
    let thumbnail_url = null;
    if (thumbnail) {
      const { data: storageData, error: storageError } = await supabase.storage
        .from("group")
        .upload(uuidv4(), thumbnail);

      if (storageError) {
        alert(storageError.message);
        return;
      }

      const { data: urlData } = supabase.storage.from("group").getPublicUrl(storageData.path);
      thumbnail_url = urlData.publicUrl;
    }

    const { data: groupData, error: groupError } = await supabase
      .from("groups")
      .insert({
        name: nameRef.current?.value,
        description: description,
        owner_id: user!.id,
        thumbnail_url: thumbnail_url,
      })
      .select()
      .single();

    if (groupError) {
      alert(groupError.message);
      return;
    }

    const { error: memberError } = await supabase
      .from("group_members")
      .insert({
        group_id: groupData.id,
        user_id: user!.id,
        role: "admin",
      })
      .select();

    if (memberError) {
      alert(memberError.message);
      return;
    }

    router.push(`/group/${groupData.id}`);
  };

  return (
    <>
      <Meta pageTitle="新規グループ作成" />
      <Layout classes="py-20">
        <LayoutContainer>
          <Link href="/dashboard/group" className="flex items-center gap-1 hover:opacity-75">
            <ChevronLeftIcon className="w-5" />
            <span className="text-sm font-medium pb-[1px]">前に戻る</span>
          </Link>
          <div className="max-w-[900px] mt-10 mx-auto">
            <h2 className="text-xl font-bold">新しいグループを作成する</h2>
            <div className="mt-5 pt-5 border-t border-[#eee]">
              <label className="pl- w-full inline-block font-medium">グループ名</label>
              <input
                ref={nameRef}
                type="text"
                className="mt-2 p-2 w-full max-w-[600px] border border-[#D0D7DE] rounded outline-none"
              />
            </div>
            <div className="mt-5">
              <label className="pl-[2px] w-full inline-block font-medium">グループ説明文</label>
              <EditMarkdown description={description} setDescription={setDescription} />
            </div>
            <div className="mt-5">
              <p className="pl-[2px] w-full inline-block font-medium">グループイメージ</p>
              <label
                htmlFor="thumbnail"
                className="overflow-hidden relative cursor-pointer block max-w-[360px] rounded-lg mt-1"
              >
                <Image
                  src={createObjectURL ? createObjectURL : "/no-image.jpg"}
                  className="w-full h-[220px] object-cover block rounded-lg "
                  width={600}
                  height={400}
                  alt="グループサムネイル"
                />
                <PlusCircleIcon className="w-7 absolute top-1/2 left-1/2 translate-x-[-50%]  text-white z-10" />
                <span className=" absolute inset-0 bg-black bg-opacity-20"></span>
              </label>
              <input type="file" id="thumbnail" className="hidden" onChange={handleImageChange} />
            </div>
            <div className="pt-5 mt-5 text-right border-t border-[#D0D7DE] ">
              <button
                className={`px-4 py-2.5 rounded text-sm font-medium text-white  ${
                  nameRef.current?.value && description
                    ? "bg-[#4e6bb4] hover:opacity-75"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                onClick={handleCreateGroup}
                disabled={!nameRef.current?.value || !description}
              >
                グループを作成
              </button>
            </div>
          </div>
        </LayoutContainer>
      </Layout>
    </>
  );
};

export default GroupNewPage;
