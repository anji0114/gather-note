import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import {
  DocumentTextIcon,
  Square2StackIcon,
  Square3Stack3DIcon,
} from "@heroicons/react/24/outline";
import { useStore } from "@/store";
import { BoardEdit } from "@/components/Board/BoardEdit";
import { BoardDelete } from "@/components/Board/BoardDelete";
import { useGroupMembership } from "@/hooks/useGroupMembership";

export const BoardHeading = () => {
  const router = useRouter();
  const asPath = router.asPath;
  const board = useStore((state) => state.board);
  const { data: groupData } = useSWR(board?.group_id ? `/api/groups/${board.group_id}` : null);
  const { isMember, isAdmin, isLoading: membershipLoading } = useGroupMembership(board.group_id);
  const [isDiscussion, setIsDiscussion] = useState(false);

  useEffect(() => {
    // urlからDiscussionページか判定
    if (asPath) {
      const pathSegments = asPath.split("/");
      const lastSegment = pathSegments[pathSegments.length - 1];

      if (lastSegment === "discussion") {
        setIsDiscussion(true);
      }
    }
  }, [asPath]);

  useEffect(() => {
    if (!membershipLoading && !isMember) {
      router.push("/dashboard");
    }
  }, [membershipLoading, isMember]);

  return (
    <div className="pt-12 bg-[#fcfcfc] border-b border-[#f0f0f0]">
      <div className="max-w-[1140px] w-full mx-auto px-5 md:px-7">
        <div className="max-w-[1000px] mx-auto">
          <div className="relative">
            <h1 className="text-lg md:text-xl font-bold leading-tight sm:w-[calc(100%_-_140px)]">
              <Link
                href={`/group/${groupData?.id}`}
                className="text-[#4E6BB4] underline-offset-2 underline hover:opacity-80"
              >
                {groupData?.name}
              </Link>
              <span className="text-black inline-block mx-1.5 translate-y-[-1px] ">/</span>
              {board.name}
            </h1>
            {board.description && (
              <p className="mt-3 text-[15px] leading-7 sm:mt-7">{board.description}</p>
            )}
            {isAdmin && (
              <div className="flex gap-1 mt-3 sm:absolute sm:top-0 sm:right-0 sm:mt-0 sm:h-[30px]">
                <BoardEdit />
                <BoardDelete />
              </div>
            )}
          </div>
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
              <Square2StackIcon className="w-6 text-[#555]" />
              <span className="text-sm">ディスカッション</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
