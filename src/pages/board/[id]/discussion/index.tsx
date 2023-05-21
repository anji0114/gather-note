import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";
import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/outline";
import { BoardHeading } from "@/components/Board/BoardHeaidng";
import { Loading } from "@/components/Common/Loading";
import { Meta } from "@/components/Common/Meta";
import { DiscussionList } from "@/components/Discussion/DiscussionList";
import { Layout } from "@/components/Layout";
import { LayoutContainer } from "@/components/Layout/LayoutContainer";
import { useStore } from "@/store";
import { Board } from "@/types";

const BoardDiscussion = () => {
  const router = useRouter();
  const { id } = router.query;
  const setBoard = useStore((state) => state.setBoard);
  const { data: boardData, isLoading } = useSWR<Board, Error>(id ? `/api/boards/${id}` : null); //ボード詳細のapi

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

  if (isLoading) return <Loading />;

  return (
    <>
      <Meta />
      <Layout>
        <BoardHeading />
        <LayoutContainer classes="py-14">
          <div className=" max-w-[800px] mx-auto">
            <DiscussionList />

            <Link
              href={`/board/${id}/discussion/new`}
              className="w-fit flex items-center mt-10 mx-auto py-2.5 px-5 gap-2 rounded bg-[#222] text-white hover:bg-[#555]"
            >
              <PlusIcon className="w-[18px] translate-y-[1px] " />
              <span className="text-sm inline-block">新規ディスカッション</span>
            </Link>
          </div>
        </LayoutContainer>
      </Layout>
    </>
  );
};

export default BoardDiscussion;
