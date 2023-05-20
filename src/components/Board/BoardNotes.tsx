import Link from "next/link";
import useSWR from "swr";
import { DocumentTextIcon, EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { Note } from "@/types";
import { DateFns } from "@/components/Common/DateFns";
import { useStore } from "@/store";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

export const BoardNotes = () => {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const user = useUser();
  const board = useStore((state) => state.board);

  const { data, error, isLoading } = useSWR(board.id ? `/api/boards/${board.id}/notes` : null);

  const handleDeleteNote = async (noteId: string) => {
    const { error } = await supabase
      .from("board_notes")
      .delete()
      .eq("note_id", noteId)
      .eq("board_id", board.id);
    if (error) {
      alert(error.message);
      return;
    }

    router.reload();
  };

  return (
    <ul className="mt-8 space-y-4">
      {data?.map((note: Note & { user_id: string }) => (
        <li
          key={note.id}
          className=" w-full pb-4 border-b border-[#d0d7de] md:flex md:justify-between md:flex-row-reverse"
        >
          <p className="flex items-center justify-between gap-2 px-1 text-[12px] md:px-0">
            <DateFns time={note.updated_at!} />
            {user?.id === note.user_id && (
              <button className="w-5 cursor-pointer" onClick={() => handleDeleteNote(note.id)}>
                <EllipsisVerticalIcon />
              </button>
            )}
          </p>
          <Link
            href={`/note/${note.id}`}
            className="relative inline-block pl-7 mt-2 text-[#4e6bb4] text-sm font-medium underline-offset-3 hover:underline md:mt-0"
          >
            <DocumentTextIcon className="absolute left-0 top-1/2 translate-y-[-50%] w-6" />
            <span>{note.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};
