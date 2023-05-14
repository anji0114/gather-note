import { FC } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Loading } from "@/components/Common/Loading";
import { Note } from "@/types";
import { NoteItem } from "@/components/Common/NoteItem";

export const FolderNoteList: FC = () => {
  const router = useRouter();
  const { data, isLoading } = useSWR(
    router.query.id ? `/api/folders/${router.query.id}/notes` : null
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {data?.length > 0 ? (
        <ul className="mt-8 space-y-4">
          {data?.map((note: Note) => (
            <NoteItem
              key={note.id}
              id={note.id}
              name={note.name}
              created_at={note.created_at!}
              postName="note"
            />
          ))}
        </ul>
      ) : (
        <p className="mt-8 text-center text-lg ">作成されたページはありません</p>
      )}
    </>
  );
};
