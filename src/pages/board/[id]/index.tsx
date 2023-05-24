import { useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useStore } from "@/store";
import { Board } from "@/types";
import { useGroupMembership } from "@/hooks/useGroupMembership";
import { Layout } from "@/components/Layout";
import { BoardNotes } from "@/components/Board/BoardNotes";
import { BoardHeading } from "@/components/Board/BoardHeaidng";
import { BoardAddNote } from "@/components/Board/BoardAddNote";
import { LayoutContainer } from "@/components/Layout/LayoutContainer";
import { Meta } from "@/components/Common/Meta";
import { Loading } from "@/components/Common/Loading";

const BoardId = () => {
  const router = useRouter();
  const { id } = router.query;
  const board = useStore((state) => state.board);
  const setBoard = useStore((state) => state.setBoard);
  const { data: boardData, isLoading } = useSWR<Board, Error>(id ? `/api/boards/${id}` : null); //ボード詳細のapi
  const { isMember, isLoading: membershipLoading } = useGroupMembership(board.group_id);

  useEffect(() => {
    if (boardData && !isLoading) {
      setBoard({
        id: boardData.id,
        name: boardData.name,
        description: boardData.description,
        group_id: boardData.group_id,
      });
    }
  }, [boardData, id]);

  // メンバーかどうか判定
  useEffect(() => {
    if (!membershipLoading && !isMember) {
      router.push("/dashboard");
    }
  }, [membershipLoading, isMember]);

  if (isLoading) return <Loading />;

  return (
    <>
      <Meta />
      <Layout>
        <BoardHeading />
        <LayoutContainer classes="py-14">
          <div className=" max-w-[800px] mx-auto">
            <div className="mt-8">
              <BoardNotes />
            </div>
            <div className="mt-5">
              <BoardAddNote />
            </div>
          </div>
        </LayoutContainer>
      </Layout>
    </>
  );
};

export default BoardId;
