import { FC, memo, useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { EllipsisHorizontalCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { DeleteDialog } from "@/components/Common/DeleteDialog";

export const NoteMenuComponent: FC = () => {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false);

  const handleNoteDelete = async () => {
    const { error } = await supabase
      .from("notes")
      .update({
        deleted_flag: true,
      })
      .eq("id", router.query.id);

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

      <DeleteDialog
        showDialog={showDeleteAlert}
        setShowDialog={setShowDeleteAlert}
        handleDelete={handleNoteDelete}
        title="ノートの削除"
      />
    </>
  );
};

export const NoteMenu = memo(NoteMenuComponent);
