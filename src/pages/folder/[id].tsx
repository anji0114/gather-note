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
import { DashBoardLayout } from "@/components/Dashboard/DashboardLayout";

const FolderId = () => {
  const router = useRouter();
  const user = useUser();
  const supabase = useSupabaseClient();
  const folder = useStore((state) => state.editFolder);
  const setFolder = useStore((state) => state.setEditFolder);
  const { data, isLoading } = useSWR(router.query.id ? `/api/folders/${router.query.id}` : null);

  useEffect(() => {
    setFolder({
      id: data?.id,
      name: data?.name,
      description: data?.description,
    });
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

  if (isLoading) return <Loading />;

  return (
    <Layout>
      <div className=" max-w-[800px] mx-auto">
        <FolderTop />
        <FolderNoteList />
        <div className="w-fit mx-auto mt-12">
          <ButtonNew text="新規ノート作成" handleCreate={handleCreateNotes} />
        </div>
      </div>
    </Layout>
  );
};

export default FolderId;
