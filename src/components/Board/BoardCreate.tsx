import TextareaAutosize from "react-textarea-autosize";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import * as Dialog from "@radix-ui/react-dialog";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { useRouter } from "next/router";
import { useStore } from "@/store";

export const BoardCreate = () => {
  const router = useRouter();
  const supabase = useSupabaseClient();
  const group = useStore((state) => state.group);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleCreateBoard = async () => {
    const { data, error } = await supabase
      .from("boards")
      .insert({
        group_id: group.id,
        name: name,
        description: description,
      })
      .select("id")
      .single();

    if (error) {
      alert(error.message);
      return;
    }

    router.push(`/board/${data.id}`);
  };

  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button className="flex items-center py-2.5 px-5 gap-2 rounded bg-[#222] text-white hover:bg-[#555]">
            <PlusIcon className="w-[18px] translate-y-[1px] " />
            <span className="text-sm inline-block">新規作成</span>
          </button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="bg-black opacity-10 fixed inset-0 transition" />
          <Dialog.Content className="fixed p-6 top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] shadow-md bg-white rounded max-h-[90vh] overflow-auto w-[420px] max-w-[95vw]">
            <Dialog.Title className="font-bold text-[#555]">ボードの作成</Dialog.Title>
            <fieldset className="mt-4">
              <label className="text-sm font-medium ">ボード名</label>
              <input
                type="text"
                value={name}
                placeholder="数学のボード"
                onChange={(e) => setName(e.target.value)}
                className="mt-2 text-sm p-2 border border-[#d0d7de] rounded w-full min-w-[300px] outline-none"
              />
            </fieldset>
            <fieldset className="mt-4">
              <label className="text-sm font-medium ">ボード概要</label>
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
                  onClick={handleCreateBoard}
                  disabled={!name ? true : false}
                >
                  ボードの作成
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
