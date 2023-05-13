import { FC, useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { EllipsisHorizontalCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useStore } from "@/store";

export const NoteMenu: FC = () => {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const note = useStore((state) => state.note);
  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false);

  const handleNoteDelete = async () => {
    const { error } = await supabase
      .from("notes")
      .update({
        deleted_flag: true,
      })
      .eq("id", note.id);

    if (error) {
      alert(error.message);
      return;
    }

    router.back();
  };

  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild className="outline-none">
          <button className="w-6 cursor-pointer text-[#555] hover:opacity-70">
            <EllipsisHorizontalCircleIcon />
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content className="bg-white shadow-md rounded w-32" sideOffset={15}>
            <DropdownMenu.Item className="outline-none">
              <button
                className="box-border flex gap-2 items-center justify-center w-full max-w-full py-3 pr-2 text-[#DE6868] hover:bg-red-50 cursor-pointer"
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
          <AlertDialog.Content className="fixed p-6 top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] shadow-md bg-white rounded max-h-[90vh] overflow-auto w-[420px] max-w-[95vw]">
            <AlertDialog.Title className="font-bold text-center text-[#555]">
              ノートの削除
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
                  onClick={handleNoteDelete}
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
