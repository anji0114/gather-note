import { useStore } from "@/store";
import TextareaAutosize from "react-textarea-autosize";
import { XMarkIcon } from "@heroicons/react/24/outline";
import * as Dialog from "@radix-ui/react-dialog";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";

export const FolderEdit = () => {
  const supabase = useSupabaseClient();
  const folder = useStore((state) => state.folder);
  const setFolder = useStore((state) => state.setFolder);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleUpdateFolder = async () => {
    if (!name) {
      return;
    }

    const { error } = await supabase
      .from("folders")
      .update({
        name: name,
        description: description,
      })
      .eq("id", folder.id);

    if (error) {
      alert(error.message);
    }

    setFolder({ ...folder, name: name, description: description });
  };

  useEffect(() => {
    setName(folder.name);
    setDescription(folder.description);
  }, [folder]);

  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button className="bg-white border border-[#D0D7DE] rounded py-1 px-3 sm:px-4 text-[10px] sm:text-[12px] hover:bg-[#fafafa]">
            編集する
          </button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="bg-black opacity-10 fixed inset-0 transition" />
          <Dialog.Content className="fixed p-6 top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] shadow-md bg-white rounded max-h-[90vh] overflow-auto w-[420px] max-w-[95vw]">
            <Dialog.Title className="font-bold text-[#555]">編集</Dialog.Title>
            <fieldset className="mt-4">
              <label className="text-sm font-medium ">フォルダ名</label>
              <input
                type="text"
                value={name}
                placeholder="フォルダ名は必須です"
                onChange={(e) => setName(e.target.value)}
                className="mt-2 text-sm p-2 border border-[#d0d7de] rounded w-full min-w-[300px] outline-none"
              />
            </fieldset>
            <fieldset className="mt-4">
              <label className="text-sm font-medium ">フォルダ概要</label>
              <TextareaAutosize
                minRows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-2 text-sm p-2 border border-[#d0d7de] rounded w-full min-w-[300px] outline-none resize-none"
              />
            </fieldset>
            <div className="mt-4 text-center">
              <Dialog.Close asChild>
                <button
                  className={`py-1.5 px-6 text-sm text-white bg-[#222] rounded ${
                    !name ? "bg-[#888] cursor-not-allowed" : "hover:bg-[#555]"
                  }`}
                  onClick={handleUpdateFolder}
                  disabled={!name ? true : false}
                >
                  保存する
                </button>
              </Dialog.Close>
            </div>
            <Dialog.Close asChild>
              <button className="w-6 h-6 absolute top-4 right-4 text-[#555]" aria-label="Close">
                <XMarkIcon />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
};
