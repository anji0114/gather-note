import { useRouter } from "next/router";
import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { ToastComponent } from "@/components/Common/Toast";
import { PostCreate } from "@/components/Common/Post/PostCreate";
import { useGroupMembership } from "@/hooks/useGroupMembership";

const GroupBoardNew = () => {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const { id } = router.query;
  const [toastOpen, setToastOpen] = useState(false);
  const { isAdmin, isLoading } = useGroupMembership(String(id));

  const handleBoardCreate = async (name: string, description: string) => {
    const { data, error } = await supabase
      .from("boards")
      .insert({
        name: name,
        description: description,
        group_id: id,
      })
      .select("*")
      .single();

    if (error) {
      setToastOpen(true);
      return;
    }

    router.push(`/board/${data.id}`);
  };

  useEffect(() => {
    if (!isLoading && isAdmin) {
      router.push(`/group/${id}/board`);
    }
  }, [id, isAdmin, isLoading]);

  return (
    <>
      <PostCreate
        prevLink={`/group/${id}/discussion`}
        title="ボードの作成"
        icon={<ClipboardDocumentListIcon />}
        buttonText="ボードを作成する"
        handleCreate={handleBoardCreate}
      />
      <ToastComponent
        text="エラーが発生しました。"
        color="text-[#DE6868]"
        open={toastOpen}
        setOpen={setToastOpen}
      />
    </>
  );
};

export default GroupBoardNew;
