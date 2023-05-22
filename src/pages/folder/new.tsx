import { Meta } from "@/components/Common/Meta";
import { PostCreate } from "@/components/Common/Post/PostCreate";
import { FolderOpenIcon } from "@heroicons/react/24/outline";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

const FolderNew = () => {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const user = useUser();
  const handleCreateFolder = async (name: string, description: string) => {
    const { data, error } = await supabase
      .from("folders")
      .insert({
        name: name,
        user_id: user?.id,
        description: description,
      })
      .select("id")
      .single();

    if (error) {
      alert(error.message);
      return;
    }

    router.push(`/folder/${data.id}`);
  };

  return (
    <>
      <Meta pageTitle="フォルダの作成" />
      <PostCreate
        prevLink="/dashboard"
        title="フォルダの作成"
        icon={<FolderOpenIcon />}
        buttonText="フォルダを作成する"
        handleCreate={handleCreateFolder}
      />
    </>
  );
};

export default FolderNew;
