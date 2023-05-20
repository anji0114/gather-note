import { useState } from "react";
import { Note } from "@/types";
import useSWR from "swr";
import { useRouter } from "next/router";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { useStore } from "@/store";

export const BoardAddNote = () => {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const board = useStore((state) => state.board);
  const [noteId, setNoteId] = useState("");
  const { data: notesData, error: notesError } = useSWR(
    board.id ? `/api/boards/${board.id}/add-notes` : null
  );

  const handleAddNoteToBoard = async () => {
    const { error } = await supabase
      .from("board_notes")
      .insert({
        board_id: board.id,
        note_id: noteId,
      })
      .select("*");
    if (error) {
      alert(error.message);
      return;
    }

    router.reload();
  };

  return (
    <div className="flex justify-between">
      <div className="w-[calc(100%_-_180px)] relative ">
        <select
          defaultValue={noteId}
          onChange={(e) => setNoteId(e.target.value)}
          className="py-3 px-4 w-full  border border-[#D0D7DE] rounded outline-none appearance-none cursor-pointer"
        >
          <option value="" disabled>
            ---
          </option>
          {notesData?.map((note: Note) => (
            <option key={note.id} value={note.id}>
              {note.name}
            </option>
          ))}
        </select>
        <ChevronUpDownIcon className="w-5 absolute right-3 top-1/2 translate-y-[calc(-50%_+_2px)] pointer-events-none" />
      </div>
      <button
        className={`py-1 px-5 rounded text-sm text-white bg-[#222] ${
          !noteId ? "bg-[#888] cursor-not-allowed" : "hover:bg-[#555]"
        }`}
        onClick={handleAddNoteToBoard}
        disabled={!noteId ? true : false}
      >
        ノートを追加する
      </button>
    </div>
  );
};
