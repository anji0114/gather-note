import { useStore } from "@/store";
import { TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import * as Dialog from "@radix-ui/react-dialog";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

export const FolderDelete = () => {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const folder = useStore((state) => state.folder);

  const handleDeleteFolder = async () => {
    const { data: foldersData, error: foldersError } = await supabase
      .from("folders")
      .update({
        deleted_flag: true,
      })
      .eq("id", folder.id)
      .select("id")
      .single();

    if (foldersError) {
      alert(foldersError.message);
      return;
    }

    const { error: folderNotesError } = await supabase
      .from("notes")
      .update({
        deleted_flag: true,
      })
      .eq("folder_id", foldersData.id);

    if (folderNotesError) {
      alert(folderNotesError.message);
      return;
    }

    router.push("/dashboard");
  };

  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button className="flex items-center justify-center w-[30px] bg-white border border-[#DE6868] rounded hover:bg-red-50">
            <TrashIcon className="text-[#DE6868] w-4" />
          </button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="bg-black opacity-10 fixed inset-0 transition" />
          <Dialog.Content className="fixed p-6 top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] shadow-md bg-white rounded max-h-[90vh] overflow-auto w-[420px] max-w-[95vw]">
            <Dialog.Title className="font-bold text-[#555]">フォルダーの削除</Dialog.Title>
            <Dialog.Description className="text-sm mt-5">
              フォルダは、ノートを含めて完全に削除されます。このアクションは元に戻すことはできません。
            </Dialog.Description>
            <div className="mt-5 flex justify-center gap-4">
              <Dialog.Close asChild>
                <button className="py-1.5 px-6 text-sm border border-[#222] bg-white  rounded hover:bg-gray-100">
                  キャンセル
                </button>
              </Dialog.Close>
              <button
                className="py-1.5 px-6 text-sm text-[#DE6868] border border-[#DE6868] bg-white rounded hover:bg-red-50"
                onClick={handleDeleteFolder}
              >
                削除する
              </button>
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
