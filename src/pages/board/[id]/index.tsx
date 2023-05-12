import { useRouter } from "next/router";
import useSWR from "swr";
import { Layout } from "@/components/Layout";
import { BoardNotes } from "@/components/Board/BoardNotes";
import { BoardHeading } from "@/components/Board/BoardHeaidng";
import { BoardAddNote } from "@/components/Board/BoardAddNote";
import { LayoutContainer } from "@/components/Layout/LayoutContainer";
import { useStore } from "@/store";
import { useEffect } from "react";

const BoardId = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: boardData, error, isLoading } = useSWR(id ? `/api/boards/${id}` : null); //ボード詳細のapi

  const setBoard = useStore((state) => state.setBoard);

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

  return (
    <Layout>
      <BoardHeading />
      <LayoutContainer classes="py-14">
        <div className=" max-w-[800px] mx-auto">
          <BoardNotes />
          <div className="mt-5">
            <BoardAddNote />
          </div>
        </div>
      </LayoutContainer>
    </Layout>
  );
};

export default BoardId;
