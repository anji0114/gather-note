import Link from "next/link";
import useSWR from "swr";
import { ChevronUpDownIcon, DocumentTextIcon } from "@heroicons/react/24/outline";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { Note } from "@/types";
import { BoardNoteMenu } from "@/components/Board/BoardNoteMenu";
import { DateFns } from "@/components/Common/DateFns";
import { LoadingBlock } from "@/components/Common/Loading/LoadingBlock";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const BoardContent = () => {
  const user = useUser();
  const router = useRouter();
  const supabase = useSupabaseClient();
  const [notes, setNotes] = useState<any[]>([]);
  const [addNoteId, setAddNoteId] = useState(""); //追加するノートID
  const [addNotes, setAddNotes] = useState([]); //追加可能ノートをstateで管理

  // ボードのノート一覧
  const { data: notesData, isLoading } = useSWR(
    router.query.id ? `/api/boards/${router.query.id}/notes` : null
  );
  // 追加可能ノート
  const { data: addNotesData } = useSWR(
    router.query.id ? `/api/boards/${router.query.id}/add-notes` : null
  );

  useEffect(() => {
    if (addNotesData) {
      setAddNotes(addNotesData);
    }
  }, [addNotesData]);

  useEffect(() => {
    if (notesData) {
      setNotes(notesData);
    }
  }, [notesData]);

  // board追加
  const handleAddNoteToBoard = async () => {
    const { data, error } = await supabase
      .from("board_notes")
      .insert({
        board_id: router.query.id,
        note_id: addNoteId,
      })
      .select("*")
      .single();

    if (error) {
      alert(error.message);
      return;
    }

    const { data: noteData, error: noteError } = await supabase
      .from("notes")
      .select("*")
      .eq("id", data.note_id)
      .returns<Note[]>()
      .single();

    if (noteError) {
      alert(noteError.message);
      return;
    }

    setAddNotes((prevNotes: any) => prevNotes.filter((note: any) => note.id !== addNoteId));
    setAddNoteId(""); //selectを初期値に
    // 追加したノートをsetNotesに追加
    setNotes((prevState) => [...prevState, { ...noteData, user_id: user?.id }]);
  };

  if (isLoading) {
    return (
      <div className="relative min-h-[100px]">
        <LoadingBlock />
      </div>
    );
  }

  return (
    <>
      <ul className="space-y-4">
        {notes?.map((note: Note & { user_id: string }) => (
          <li
            key={note.id}
            className=" w-full pb-4 border-b border-[#d0d7de] md:flex md:justify-between md:flex-row-reverse"
          >
            <p className="flex items-center justify-between gap-2 px-1 text-[12px] md:px-0">
              <DateFns time={note.updated_at!} />
              {user?.id === note.user_id && <BoardNoteMenu noteId={note.id} setNotes={setNotes} />}
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

      <div className="mt-5 md:flex md:justify-between">
        <div className="relative w-full md:w-[calc(100%_-_180px)]  ">
          <select
            defaultValue={addNoteId}
            onChange={(e) => setAddNoteId(e.target.value)}
            className="py-3 px-4 w-full  border border-[#D0D7DE] rounded outline-none appearance-none cursor-pointer"
          >
            <option value="">---</option>
            {addNotes?.map((note: Note) => (
              <option key={note.id} value={note.id}>
                {note.name}
              </option>
            ))}
          </select>
          <ChevronUpDownIcon className="w-5 absolute right-3 top-1/2 translate-y-[calc(-50%_+_2px)] pointer-events-none" />
        </div>
        <div className="text-right mt-4 md:text-left md:mt-0">
          <button
            className={`py-3 px-5 h-full rounded text-sm text-white bg-[#222] ${
              !addNoteId ? "bg-[#888] cursor-not-allowed" : "hover:bg-[#555]"
            }`}
            onClick={handleAddNoteToBoard}
            disabled={!addNoteId ? true : false}
          >
            ノートを追加する
          </button>
        </div>
      </div>
    </>
  );
};

export default BoardContent;
