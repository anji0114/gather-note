import { useEffect, useState } from "react";
import useSWR from "swr";
import { useRouter } from "next/router";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useStore } from "@/store";
import { PostHeading } from "@/components/Common/Post/PostHeading";
import { useGroupMembership } from "@/hooks/useGroupMembership";

export const BoardHeading = () => {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const board = useStore((state) => state.board);
  const setBoard = useStore((state) => state.setBoard);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { data: groupData } = useSWR(board?.group_id ? `/api/groups/${board.group_id}` : null);
  const { isAdmin } = useGroupMembership(board.group_id);

  const handleBoardDelete = async () => {
    const { error } = await supabase.from("boards").delete().eq("id", board.id);
    if (error) {
      return;
    }
    router.push(`/group/${groupData.id}/board`);
  };

  const handleBoardUpdate = async () => {
    const { error } = await supabase
      .from("boards")
      .update({
        name: name,
        description: description,
      })
      .eq("id", board.id);

    if (error) {
      return;
    }

    setBoard({
      ...board,
      name: name,
      description: description,
    });
  };

  useEffect(() => {
    if (board.id) {
      setName(board.name);
      setDescription(board.description);
    }
  }, [board]);

  return (
    <PostHeading
      post={board}
      parentHref={groupData?.id ? `/group/${groupData?.id}/board` : "/"}
      parentName={groupData?.name}
      name={name}
      setName={setName}
      description={description}
      setDescription={setDescription}
      handleDelete={handleBoardDelete}
      handleUpdate={handleBoardUpdate}
      isAdmin={isAdmin}
    />
  );
};
