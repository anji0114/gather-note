import { useRouter } from "next/router";
import useSWR from "swr";
import { useEffect } from "react";
import { useStore } from "@/store";
import { Layout } from "@/components/Layout";
import { Loading } from "@/components/Common/Loading";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { ButtonNew } from "@/components/Common/Button/ButtonNew";
import { FolderTop } from "@/components/Folder/FolderTop";
import { FolderNoteList } from "@/components/Folder/FolderNoteList";
import { NextPage } from "next";
import { Folder } from "@/types";

const FolderId: NextPage = () => {
  const user = useUser();
  const router = useRouter();
  const supabase = useSupabaseClient();
  const folder = useStore((state) => state.folder);
  const setFolder = useStore((state) => state.setFolder);
  const { data, error, isLoading } = useSWR<Folder, Error>(
    router.query.id ? `/api/folders/${router.query.id}` : null
  );

  useEffect(() => {
    if (user?.id && data?.user_id) {
      if (user.id !== data.user_id) router.push("/dashboard");
    }
  }, [user, data]);

  useEffect(() => {
    if (data) {
      setFolder({
        id: data?.id,
        name: data?.name,
        description: data?.description,
      });
    }
  }, [data]);

  const handleCreateNotes = async () => {
    const { data, error } = await supabase
      .from("notes")
      .insert({
        folder_id: folder.id,
        name: "新規ページ",
        content: "",
      })
      .select()
      .single();

    if (error) {
      alert(error.message);
      return;
    }

    router.push(`/note/${data.id}`);
  };

  if (isLoading || !user?.id) return <Loading />;

  return (
    <Layout>
      <div className=" max-w-[800px] mx-auto">
        {!error ? (
          <>
            <FolderTop />
            <FolderNoteList />
            <div className="w-fit mx-auto mt-12">
              <ButtonNew text="新規ノート作成" handleCreate={handleCreateNotes} />
            </div>
          </>
        ) : (
          <p className=" text-center text-red-500">{error.message}</p>
        )}
      </div>
    </Layout>
  );
};

export default FolderId;
