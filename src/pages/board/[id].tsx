import { BoardNotes } from "@/components/Board/BoardNotes";
import { Layout } from "@/components/Layout";
import { Note } from "@/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";

const BoardId = () => {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const [isNotesOpen, setIsNotesOpen] = useState(false);

  const { data, error, isLoading } = useSWR(
    router.query.id ? `/api/boards/${router.query.id}` : null
  );

  const { data: notesData, error: notesError } = useSWR(`/api/notes`);

  const handleAddNoteToBoard = async (id: string) => {
    const { data, error } = await supabase
      .from("board_notes")
      .insert({
        board_id: router.query.id,
        note_id: id,
      })
      .select("*");
    if (error) {
      alert(error.message);
      return;
    }

    alert("success");
  };

  return (
    <Layout>
      <div className=" max-w-[800px] mx-auto">
        <h1 className="text-4xl font-bold leading-tight">/{data?.name}</h1>

        <div>
          <button onClick={() => setIsNotesOpen((prevState) => !prevState)}>ノートを表示</button>
          {isNotesOpen && (
            <ul
              className="mt-5 border-b border-[#eee
            ]"
            >
              {notesData?.map((note: Note) => (
                <li
                  key={note.id}
                  className="py-4 border-t border-[#eee
                  ]"
                  onClick={() => handleAddNoteToBoard(note.id)}
                >
                  <span>{note.name}</span>
                  <button className=" py-2 px-3 text-[12px] text-white bg-[#222] rounded-sm">
                    ボードに追加する
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <BoardNotes />
      </div>
    </Layout>
  );
};

export default BoardId;
