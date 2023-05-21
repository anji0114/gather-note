import { FC } from "react";
import Link from "next/link";
import useSWR from "swr";
import { useStore } from "@/store";

export const DiscussionHeading: FC = () => {
  const discussion = useStore((state) => state.discussion);
  const { data: boardData } = useSWR(
    discussion.board_id ? `/api/boards/${discussion.board_id}` : null
  );

  return (
    <div className="pt-12 pb-10 bg-[#FCFCFC] border-b border-[#f0f0f0]">
      <div className="max-w-[1140px] w-full mx-auto px-5 md:px-7">
        <div className="max-w-[1000px] mx-auto">
          <div className="relative">
            <h1 className="text-lg md:text-xl font-bold leading-tight sm:w-[calc(100%_-_140px)]">
              <Link
                href={`/board/${discussion.board_id}/discussion`}
                className="text-[#4E6BB4] underline-offset-2 underline hover:opacity-80"
              >
                {boardData?.name}
              </Link>
              <span className="text-black inline-block mx-1.5 translate-y-[-1px] ">/</span>
              {discussion.name}
            </h1>
            <p className="mt-3 text-[15px] leading-7 sm:mt-7">{discussion.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
