import { useRouter } from "next/router";
import { Square2StackIcon } from "@heroicons/react/24/outline";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { ToastComponent } from "@/components/Common/Toast";

import { PostCreate } from "@/components/Common/Post/PostCreate";

const BoardDiscussionNew = () => {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const { id } = router.query;

  const [toastOpen, setToastOpen] = useState(false);

  const handleCreateDiscussion = async (name: string, description: string) => {
    const { data, error } = await supabase
      .from("discussions")
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

    router.push(`/discussion/${data.id}`);
  };

  return (
    <>
      <PostCreate
        prevLink={`/group/${id}/discussion`}
        title="ディスカッション作成"
        icon={<Square2StackIcon />}
        buttonText="ディスカッションを作成する"
        handleCreate={handleCreateDiscussion}
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

export default BoardDiscussionNew;
