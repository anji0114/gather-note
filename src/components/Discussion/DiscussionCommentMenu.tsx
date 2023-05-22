import { EllipsisHorizontalIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { DeleteDialog } from "../Common/DeleteDialog";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

type Props = {
  id: string;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
};

export const DiscussionCommentMenu: FC<Props> = ({ id, setIsEdit }) => {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false);

  const handleCommentDelete = async () => {
    const { error } = await supabase.from("discussion_comments").delete().eq("id", id);

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
          <button className="w-6">
            <EllipsisHorizontalIcon />
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className="bg-white shadow-md rounded w-32 border border-[#eee]"
            sideOffset={2}
          >
            <DropdownMenu.Item className="outline-none">
              <button
                className="box-border flex gap-2 items-center justify-center w-full max-w-full py-2.5 pr-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setIsEdit(true);
                }}
              >
                <PencilSquareIcon className="w-4" />
                <span className="text-[12px]">編集する</span>
              </button>
            </DropdownMenu.Item>
            <DropdownMenu.Item className="outline-none border-t border-[#eee]">
              <button
                className="box-border flex gap-2 items-center justify-center w-full max-w-full py-2.5 pr-2 text-[#DE6868] hover:bg-red-50 cursor-pointer"
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
        handleDelete={handleCommentDelete}
        title="コメントの削除"
      />
    </>
  );
};
