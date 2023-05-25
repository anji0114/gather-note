import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useStore } from "@/store";

import {
  AcademicCapIcon,
  ArrowLeftOnRectangleIcon,
  EllipsisHorizontalIcon,
  UserMinusIcon,
} from "@heroicons/react/24/outline";
import { FC, useState } from "react";

type Props = {
  userId: string | undefined;
  userName: string | undefined;
  role: string;
};

export const GroupMemberMenu: FC<Props> = ({ userId, userName, role }) => {
  const supabase = useSupabaseClient();
  const group = useStore((state) => state.group);
  const router = useRouter();
  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false);
  const [showEditAlert, setShowEditAlert] = useState<boolean>(false);

  // グループのメンバーを脱退させる
  const handleUnregisterGroup = async () => {
    const { error } = await supabase
      .from("group_members")
      .delete()
      .eq("group_id", group.id)
      .eq("user_id", userId);

    if (error) {
      alert(error.message);
      return;
    }

    router.reload();
  };

  const handleChangeAdminship = async () => {
    const { error } = await supabase
      .from("group_members")
      .update({
        role: role === "admin" ? "member" : "admin",
      })
      .eq("group_id", group.id)
      .eq("user_id", userId);

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
            className="bg-white shadow-md border border-[#F4F6F8] rounded w-[140px]"
            sideOffset={7}
          >
            <DropdownMenu.Item className="outline-none">
              <button
                className="border-t flex gap-2 items-center w-full py-2.5 px-4 hover:bg-gray-100"
                onClick={() => setShowEditAlert(true)}
              >
                {role === "admin" ? (
                  <>
                    <UserMinusIcon className="w-4 text-yellow-600" />
                    <span className="text-[12px] text-yellow-600">管理者を解除</span>
                  </>
                ) : (
                  <>
                    <AcademicCapIcon className="w-4 text-blue-900 " />
                    <span className="text-[12px] text-blue-900">管理者にする</span>
                  </>
                )}
              </button>
            </DropdownMenu.Item>
            <DropdownMenu.Item className="outline-none border-t border-[#F4F6F8]">
              <button
                className="flex gap-2  items-center w-full py-2.5 px-4 text-[#DE6868] hover:bg-red-50"
                onClick={() => setShowDeleteAlert(true)}
              >
                <ArrowLeftOnRectangleIcon className="w-4" />
                <span className="text-[12px]">脱退させる</span>
              </button>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>

      {/* delete */}
      <AlertDialog.Root open={showEditAlert} onOpenChange={setShowEditAlert}>
        <AlertDialog.Portal>
          <AlertDialog.Overlay className="bg-black opacity-20 fixed inset-0 transition" />
          <AlertDialog.Content className="fixed px-6 py-10 top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] shadow-md bg-white rounded max-h-[90vh] overflow-auto w-[420px] max-w-[95vw]">
            <AlertDialog.Title className="font-bold text-center text-[#555]">
              {userName}さんの権限編集
            </AlertDialog.Title>
            <div className="mt-5 flex justify-center gap-4">
              <AlertDialog.Cancel asChild>
                <button className="py-1.5 px-6 text-sm border border-[#222] bg-white  rounded cursor-pointer hover:bg-gray-100">
                  キャンセル
                </button>
              </AlertDialog.Cancel>
              <AlertDialog.Action asChild>
                <button
                  className={`py-1.5 px-6 text-sm border 
                   cursor-pointer bg-white rounded ${
                     role === "admin"
                       ? "text-yellow-600 border-yellow-600 hover:bg-yellow-50"
                       : "text-blue-900 border-blue-900 hover:bg-blue-50"
                   } `}
                  onClick={handleChangeAdminship}
                >
                  {role === "admin" ? "管理者を解除" : "管理者にする"}
                </button>
              </AlertDialog.Action>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>

      <AlertDialog.Root open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialog.Portal>
          <AlertDialog.Overlay className="bg-black opacity-20 fixed inset-0 transition" />
          <AlertDialog.Content className="fixed px-6 py-10 top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] shadow-md bg-white rounded max-h-[90vh] overflow-auto w-[420px] max-w-[95vw]">
            <AlertDialog.Title className="font-bold text-center text-[#555]">
              {userName}さんを脱退させる
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
                  onClick={handleUnregisterGroup}
                >
                  脱退させる
                </button>
              </AlertDialog.Action>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </>
  );
};
