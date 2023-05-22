import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { Dispatch, FC, SetStateAction } from "react";

type Props = {
  showDialog: boolean;
  setShowDialog: Dispatch<SetStateAction<boolean>>;
  handleDelete: () => void;
  title: string;
  description?: string;
};

export const DeleteDialog: FC<Props> = ({
  showDialog,
  setShowDialog,
  handleDelete,
  title,
  description,
}) => {
  return (
    <AlertDialog.Root open={showDialog} onOpenChange={setShowDialog}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="bg-black opacity-20 fixed inset-0 transition" />
        <AlertDialog.Content className="fixed p-6 top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] shadow-md bg-white rounded max-h-[90vh] overflow-auto w-[420px] max-w-[95vw]">
          <AlertDialog.Title className="font-bold text-center text-[#555]">
            {title}
          </AlertDialog.Title>

          {description && (
            <AlertDialog.Description className="text-sm mt-5 w-fit mx-auto">
              {description}
            </AlertDialog.Description>
          )}
          <div className="mt-5 flex justify-center gap-4">
            <AlertDialog.Cancel asChild>
              <button className="py-1.5 px-6 text-sm border border-[#222] bg-white  rounded cursor-pointer hover:bg-gray-100">
                キャンセル
              </button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button
                className="py-1.5 px-6 text-sm text-[#DE6868] border border-[#DE6868] cursor-pointer bg-white rounded hover:bg-red-50"
                onClick={handleDelete}
              >
                削除する
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};
