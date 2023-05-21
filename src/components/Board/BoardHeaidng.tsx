import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";

import { useStore } from "@/store";
import { BoardEdit } from "@/components/Board/BoardEdit";
import { BoardDelete } from "@/components/Board/BoardDelete";
import { useGroupMembership } from "@/hooks/useGroupMembership";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

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
    <div className="pt-12 pb-10 bg-[#fcfcfc] border-b border-[#f0f0f0]">
      <div className="max-w-[1140px] w-full mx-auto px-5 md:px-7">
        <div className="max-w-[1000px] mx-auto">
          <div className="relative">
            <h1 className="text-lg md:text-xl font-bold leading-tight sm:w-[calc(100%_-_140px)]">
              <Link
                href={`/group/${groupData?.id}/board`}
                className="text-[#4E6BB4] underline-offset-2 underline hover:opacity-80"
              >
                {groupData?.name}
              </Link>
              <span className="text-black inline-block mx-1.5 translate-y-[-1px] ">/</span>
              {board.name}
            </h1>
            <div className="mt-10 bg-white border border-[#f0f0f0] p-5">
              <ReactMarkdown className="markDownContent text-base">
                {board.description}
              </ReactMarkdown>
            </div>
            {isAdmin && (
              <div className="flex gap-1 mt-3 sm:absolute sm:top-0 sm:right-0 sm:mt-0 sm:h-[30px]">
                <BoardEdit />
                <BoardDelete />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
