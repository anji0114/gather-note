import { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useStore } from "@/store";
import TextareaAutosize from "react-textarea-autosize";

export const FolderTop = () => {
  const folder = useStore((state) => state.editFolder);
  const setFolder = useStore((state) => state.setEditFolder);
  const supabase = useSupabaseClient();
  const [isEdit, setIsEdit] = useState(false);

  const handleUpdateFolder = async () => {
    const { data, error } = await supabase
      .from("folders")
      .update({
        name: folder.name,
        description: folder.description,
      })
      .eq("id", folder.id);

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
            folder?.name
          ) : (
            <TextareaAutosize
              value={folder?.name}
              minRows={1}
              placeholder="タイトル"
              className="pb-4 w-full outline-none resize-none border-b border-[#d0d7de]"
              onChange={(e) => {
                setFolder({ ...folder, name: e.target.value });
              }}
            ></TextareaAutosize>
          )}
        </h1>
        <div className="absolute right-0 top-2">
          <button
            className="border border-[#222] rounded py-1 px-4 text-[12px] hover:bg-[#eee]"
            onClick={isEdit ? handleUpdateFolder : () => setIsEdit(true)}
          >
            {isEdit ? "保存する" : "編集する"}
          </button>
        </div>
      </div>
      {(folder?.description || isEdit) && (
        <p className="mt-5">
          {!isEdit ? (
            <span className="inline-block w-full px-1">{folder?.description}</span>
          ) : (
            <TextareaAutosize
              value={folder?.description}
              minRows={1}
              placeholder="説明が入ります"
              className="w-full p-3 outline-none leading-7 resize-none border border-[#d0d7de] rounded-sm"
              onChange={(e) => {
                setFolder({ ...folder, description: e.target.value });
              }}
            ></TextareaAutosize>
          )}
        </p>
      )}
    </>
  );
};
