import { NextPage } from "next";
import useSWR from "swr";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useStore } from "@/store";
import { Loading } from "@/components/Common/Loading";
import { NoteHeader } from "@/components/Note/NoteHeader";
import { useNoteAuthor } from "@/hooks/useNoteAuthor";
import { NoteContent } from "@/components/Note/NoteContent";
import { useNoteInBoard } from "@/hooks/useNoteInBoard";

const NoteId: NextPage = () => {
  const router = useRouter();
  const { data: NoteData, isLoading } = useSWR(
    router.query.id ? `/api/notes/${router.query.id}` : null
  );
  const setNote = useStore((state) => state.setNote);
  const restNote = useStore((state) => state.resetNote);
  const { isAuthor, isLoading: isAuthorLoading } = useNoteAuthor(NoteData?.folder_id);
  const { isInBoard, isLoading: isInBoardLoading } = useNoteInBoard(NoteData?.id);

  useEffect(() => {
    setNote({
      id: NoteData?.id,
      name: NoteData?.name,
      content: NoteData?.content,
    });

    // 論理削除されてアクセスされた場合
    if (NoteData?.id && NoteData.deleted_flag) {
      router.push(`/dashboard`);
    }

    return () => {
      restNote();
    };
  }, [NoteData]);

  useEffect(() => {
    if (!isAuthorLoading && !isInBoardLoading) {
      if (!isAuthor && !isInBoard) {
        router.push(`/dashboard`);
      }
    }
  }, [isAuthorLoading, isInBoardLoading]);

  if (isLoading || isAuthorLoading || isInBoardLoading) return <Loading />;

  return (
    <>
      <NoteHeader isAuthor={isAuthor} />
      <NoteContent isAuthor={isAuthor} />
    </>
  );
};

export default NoteId;
