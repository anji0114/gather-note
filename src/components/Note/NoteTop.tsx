import { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useStore } from "@/store";
import TextareaAutosize from "react-textarea-autosize";

export const NoteTop = () => {
  const note = useStore((state) => state.editNote);
  const setNote = useStore((state) => state.setEditNote);
  const supabase = useSupabaseClient();
  const [isEdit, setIsEdit] = useState(false);

  const handleUpdateNote = async () => {
    const { data, error } = await supabase
      .from("notes")
      .update({
        title: note.title,
        description: note.description,
      })
      .eq("id", note.id);

    if (error) {
      alert(error.message);
    }

    setIsEdit(false);
  };

  return (
    <>
      <div className=" relative pr-24">
        <h1 className="text-4xl font-bold leading-tight">
          {!isEdit ? (
            note?.title
          ) : (
            <TextareaAutosize
              value={note?.title}
              minRows={1}
              placeholder="タイトル"
              className="pb-4 w-full outline-none resize-none border-b border-[#d0d7de]"
              onChange={(e) => {
                setNote({ ...note, title: e.target.value });
              }}
            ></TextareaAutosize>
          )}
        </h1>
        <div className="absolute right-0 top-2">
          <button
            className="border border-[#222] rounded py-1 px-4 text-[12px] hover:bg-[#eee]"
            onClick={isEdit ? handleUpdateNote : () => setIsEdit(true)}
          >
            {isEdit ? "保存する" : "編集する"}
          </button>
        </div>
      </div>
      {(note?.description || isEdit) && (
        <p className="mt-5">
          {!isEdit ? (
            <span className="inline-block w-full px-1">{note?.description}</span>
          ) : (
            <TextareaAutosize
              value={note?.description}
              minRows={1}
              placeholder="説明が入ります"
              className="w-full p-3 outline-none leading-7 resize-none border border-[#d0d7de] rounded-sm"
              onChange={(e) => {
                setNote({ ...note, description: e.target.value });
              }}
            ></TextareaAutosize>
          )}
        </p>
      )}
    </>
  );
};
