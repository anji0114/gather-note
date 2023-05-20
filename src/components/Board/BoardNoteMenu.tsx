import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useStore } from "@/store";

import { EllipsisHorizontalIcon, TrashIcon } from "@heroicons/react/24/outline";
import { FC, useState } from "react";

type Props = {
  noteId: string | undefined;
};

export const BoardNoteMenu: FC<Props> = ({ noteId }) => {
  const supabase = useSupabaseClient();
  const board = useStore((state) => state.board);
  const router = useRouter();
  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false);

  const handleDeleteNote = async () => {
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
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild className="outline-none">
          <button className="w-5">
            <EllipsisHorizontalIcon />
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className="bg-white shadow-md border border-[#F4F6F8] rounded w-[140px]"
            sideOffset={7}
          >
            <DropdownMenu.Item className="outline-none">
              <button
                className="flex gap-2  items-center w-full py-2.5 px-4 text-[#DE6868] hover:bg-red-50"
                onClick={() => setShowDeleteAlert(true)}
              >
                <TrashIcon className="w-4" />
                <span className="text-[12px]">削除する</span>
              </button>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>

      <AlertDialog.Root open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialog.Portal>
          <AlertDialog.Overlay className="bg-black opacity-20 fixed inset-0 transition" />
          <AlertDialog.Content className="fixed px-6 py-10 top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] shadow-md bg-white rounded max-h-[90vh] overflow-auto w-[420px] max-w-[95vw]">
            <AlertDialog.Title className="font-bold text-center text-[#555]">
              ノートをボードから削除する
            </AlertDialog.Title>
            <div className="mt-5 flex justify-center gap-4">
              <AlertDialog.Cancel asChild>
                <button className="py-1.5 px-6 text-sm border border-[#222] bg-white  rounded cursor-pointer hover:bg-gray-100">
                  キャンセル
                </button>
              </AlertDialog.Cancel>
              <AlertDialog.Action asChild>
                <button
                  className="py-1.5 px-6 text-sm text-[#DE6868] border border-[#DE6868] cursor-pointer bg-white rounded hover:bg-red-50"
                  onClick={handleDeleteNote}
                >
                  削除する
                </button>
              </AlertDialog.Action>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </>
  );
};
