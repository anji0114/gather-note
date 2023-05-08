import { useState } from "react";
import { Note } from "@/types";
import useSWR from "swr";
import { useRouter } from "next/router";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

export const BoardAddNote = () => {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const [noteId, setNoteId] = useState("");
  const { data: notesData, error: notesError } = useSWR(`/api/notes`);

  const handleAddNoteToBoard = async () => {
    const { data, error } = await supabase
      .from("board_notes")
      .insert({
        board_id: router.query.id,
        note_id: noteId,
      })
      .select("*");
    if (error) {
      alert(error.message);
      return;
    }

    alert("success");
  };

  return (
    <div className="flex gap-5">
      <select
        value={noteId}
        onChange={(e) => setNoteId(e.target.value)}
        className="p-2 w-full max-w-[400px] border border-[#D0D7DE] rounded outline-none"
      >
        {notesData?.map((note: Note) => (
          <option key={note.id} value={note.id}>{note.name}</option>
        ))}
      </select>
      <button onClick={handleAddNoteToBoard}>ノートを追加する</button>
    </div>
  );
};
