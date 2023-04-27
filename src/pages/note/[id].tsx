import { useRouter } from "next/router";
import useSWR from "swr";
import { useEffect } from "react";
import { useStore } from "@/store";
import { Layout } from "@/components/Layout";
import { Loading } from "@/components/Common/Loading";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { ButtonNew } from "@/components/Common/Button/ButtonNew";
import { NoteTop } from "@/components/Note/NoteTop";
import { NotePages } from "@/components/Note/NotePages";

const NoteId = () => {
  const router = useRouter();
  const user = useUser();
  const supabase = useSupabaseClient();
  const note = useStore((state) => state.editNote);
  const setNote = useStore((state) => state.setEditNote);
  const { data, isLoading } = useSWR(router.query.id ? `/api/notes/${router.query.id}` : null);

  useEffect(() => {
    setNote({
      id: data?.id,
      title: data?.title,
      description: data?.description,
    });
  }, [data]);

  const handleCreatePage = async () => {
    const { data, error } = await supabase
      .from("pages")
      .insert({
        note_id: note.id,
        user_id: user!.id,
        title: "新規ページ",
        content: "",
      })
      .select()
      .single();

    if (error) {
      alert(error.message);
      return;
    }

    router.push(`/page/${data.id}`);
  };

  if (isLoading) return <Loading />;

  return (
    <Layout>
      <div className=" max-w-[800px] mx-auto">
        <NoteTop />
        <NotePages />
        <div className="w-fit mx-auto mt-12">
          <ButtonNew text="ページ新規作成" handleCreate={handleCreatePage} />
        </div>
      </div>
    </Layout>
  );
};

export default NoteId;
