import { FC, useEffect, useState } from "react";
import useSWR from "swr";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useStore } from "@/store";
import { PostHeading } from "@/components/Common/Post/PostHeading";

export const DiscussionHeading: FC = () => {
  const supabase = useSupabaseClient();
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const discussion = useStore((state) => state.discussion);
  const setDiscussion = useStore((state) => state.setDiscussion);
  const { data: groupData } = useSWR(
    discussion.group_id ? `/api/groups/${discussion.group_id}` : null
  );

  useEffect(() => {
    if (discussion.id) {
      setName(discussion.name);
      setDescription(discussion.description);
    }
  }, [discussion]);

  // discussionの削除
  const handleDiscussionDelete = async () => {
    const { error } = await supabase.from("discussions").delete().eq("id", discussion.id);
    if (error) {
      alert(error.message);
      return;
    }
    router.push(`/group/${groupData.id}/discussion`);
  };

  // discussionのアップデート
  const handleDiscussionUpdate = async () => {
    const { error } = await supabase
      .from("discussions")
      .update({
        name: name,
        description: description,
      })
      .eq("id", discussion.id);

    if (error) {
      return;
    }

    setDiscussion({
      ...discussion,
      name: name,
      description: description,
    });
  };

  return (
    <PostHeading
      post={discussion}
      parentHref={discussion.group_id ? `/group/${discussion.group_id}/discussion` : "/"}
      parentName={groupData?.name}
      name={name}
      setName={setName}
      description={description}
      setDescription={setDescription}
      handleDelete={handleDiscussionDelete}
      handleUpdate={handleDiscussionUpdate}
    />
  );
};
