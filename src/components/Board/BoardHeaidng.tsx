import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import { DocumentTextIcon, Square3Stack3DIcon } from "@heroicons/react/24/outline";
import { useStore } from "@/store";
import { BoardEdit } from "@/components/Board/BoardEdit";
import { BoardDelete } from "@/components/Board/BoardDelete";

export const BoardHeading = () => {
  const router = useRouter();
  const { id } = router.query;
  const asPath = router.asPath;
  const board = useStore((state) => state.board);
  const setBoard = useStore((state) => state.setBoard);
  const { data: boardData, error, isLoading } = useSWR(id ? `/api/boards/${id}` : null); //ボード詳細のapi
  const { data: groupData, error: groupError } = useSWR(
    board?.group_id ? `/api/groups/${board.group_id}` : null
  );
  const [isDiscussion, setIsDiscussion] = useState(false);

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

  useEffect(() => {
    // urlからDiscussionページか判定
    if (id && asPath) {
      const pathSegments = asPath.split("/");
      const lastSegment = pathSegments[pathSegments.length - 1];

      if (lastSegment === "discussion") {
        setIsDiscussion(true);
      }
    }
  }, [id, asPath]);

  return (
    <div className="pt-12 bg-[#FCFCFC] border-b border-[#f0f0f0]">
      <div className="max-w-[1140px] w-full mx-auto px-5 sm:px-7">
        <div className="max-w-[1000px] mx-auto">
          <div className="flex justify-between">
            <h1 className="text-lg sm:text-xl font-bold leading-tight w-[calc(100%_-_150px)]">
              <Link href={`/group/${groupData?.id}`} className="text-[#4E6BB4] hover:underline">
                {groupData?.name}
              </Link>
              <span className="text-black inline-block mx-1.5 translate-y-[-1px] ">/</span>
              {board.name}
            </h1>
            <div className="flex gap-2.5 h-[30px] mt-1">
              <BoardEdit />
              <BoardDelete />
            </div>
          </div>
          {board.description && <p className="mt-7 text-[15px] leading-7">{board.description}</p>}
          <div className="flex gap-10 mt-10 translate-y-[1px]">
            <Link
              href={`/board/${router.query.id}`}
              className={`flex items-center gap-1 pb-4 px-2 border-b-2 ${
                !isDiscussion ? "border-[#DE6868]" : "border-transparent"
              }`}
            >
              <DocumentTextIcon className="w-6 text-[#555]" />
              <span className="text-sm">ノート</span>
            </Link>
            <Link
              href={`/board/${router.query.id}/discussion`}
              className={`flex items-center gap-1 pb-4 px-2 border-b-2 ${
                isDiscussion ? "border-[#DE6868]" : "border-transparent"
              }`}
            >
              <Square3Stack3DIcon className="w-6 text-[#555]" />
              <span className="text-sm">ディスカッション</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
