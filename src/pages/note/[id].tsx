import { NextPage } from "next";
import useSWR from "swr";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useStore } from "@/store";
import { Loading } from "@/components/Common/Loading";
import { NoteHeader } from "@/components/Note/NoteHeader";
import { useNoteAuthor } from "@/hooks/useNoteAuthor";
import { NoteContent } from "@/components/Note/NoteContent";

const NoteId: NextPage = () => {
  const router = useRouter();
  const { data, isLoading } = useSWR(router.query.id ? `/api/notes/${router.query.id}` : null);
  const setNote = useStore((state) => state.setEditNote);
  const { isAuthor, isLoading: isAuthorLoading } = useNoteAuthor(data?.folder_id);

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
      <NoteHeader isAuthor={isAuthor} />
      <NoteContent isAuthor={isAuthor} />
    </>
  );
};

export default NoteId;
