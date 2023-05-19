import { NextPage } from "next";
import useSWR from "swr";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useStore } from "@/store";
import { useNoteAuthor } from "@/hooks/useNoteAuthor";
import { useNoteInBoard } from "@/hooks/useNoteInBoard";
import { Loading } from "@/components/Common/Loading";
import { NoteHeader } from "@/components/Note/NoteHeader";
import { Editor } from "@/components/Common/Editor";
import { Error } from "@/components/Common/Error";
import Link from "next/link";
import { Meta } from "@/components/Common/Meta";

const NoteId: NextPage = () => {
  const router = useRouter();
  const note = useStore((state) => state.note);
  const setNote = useStore((state) => state.setNote);
  const restNote = useStore((state) => state.resetNote);
  const {
    data: NoteData,
    isLoading,
    error,
  } = useSWR(router.query.id ? `/api/notes/${router.query.id}` : null); // note詳細の取得
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

  if (isLoading) return <Loading />;

  if (error)
    return (
      <Error>
        <div className="text-center">
          <p>エラーが発生しました。</p>
          <Link
            href="/dashboard"
            className="inline-block border border-[#222] mt-2 px-8 py-2 rounded"
          >
            トップへ戻る
          </Link>
        </div>
      </Error>
    );

  if (isAuthorLoading || isInBoardLoading) return <Loading />;

  return (
    <>
      <Meta pageTitle={note.name} />
      <NoteHeader isAuthor={isAuthor} />
      <Editor isEditor={isAuthor} post={note} setPost={setNote} />
    </>
  );
};

export default NoteId;
