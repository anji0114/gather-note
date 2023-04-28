import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import useSWR from "swr";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useStore } from "@/store";
import TextareaAutosize from "react-textarea-autosize";
import { Loading } from "@/components/Common/Loading";
import { NoteHeader } from "@/components/Note/NoteHeader";

const NoteId = () => {
  const router = useRouter();
  const supabase = useSupabaseClient();
  const { data, isLoading } = useSWR(router.query.id ? `/api/notes/${router.query.id}` : null);
  const note = useStore((state) => state.editNote);
  const setNote = useStore((state) => state.setEditNote);

  const handleNoteUpdate = async () => {
    const { data, error } = await supabase
      .from("notes")
      .update({
        name: note.name,
        content: note.content,
      })
      .eq("id", note.id)
      .select()
      .single();

    if (error) {
      alert(error);
    }

    router.push(`/folder/${data?.folder_id}`);
  };

  useEffect(() => {
    setNote({
      id: data?.id,
      name: data?.name,
      content: data?.content,
    });
  }, [data]);

  if (isLoading) return <Loading />;

  return (
    <>
      <NoteHeader handleUpdate={handleNoteUpdate} />
      <div>
        <div className="max-w-[660px] mx-auto mt-16">
          <h1>
            <TextareaAutosize
              value={note.name}
              minRows={1}
              placeholder="タイトル"
              className="w-full text-4xl font-bold outline-none resize-none"
              onChange={(e) => {
                setNote({ ...note, name: e.target.value });
              }}
            />
          </h1>
          <p className="mt-10">
            <TextareaAutosize
              value={note.content}
              minRows={6}
              placeholder="内容を入力してください"
              className="w-full outline-none resize-none px-1 leading-8"
              onChange={(e) => {
                setNote({ ...note, content: e.target.value });
              }}
            />
          </p>
        </div>
      </div>
    </>
  );
};

export default NoteId;
