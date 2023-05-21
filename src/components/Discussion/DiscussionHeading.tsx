import { FC } from "react";
import Link from "next/link";
import useSWR from "swr";
import { useStore } from "@/store";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

export const DiscussionHeading: FC = () => {
  const discussion = useStore((state) => state.discussion);
  const { data: groupData } = useSWR(
    discussion.group_id ? `/api/groups/${discussion.group_id}` : null
  );

  return (
    <div className="pt-12 pb-10 bg-[#fcfcfc] border-b border-[#f0f0f0]">
      <div className="max-w-[1140px] w-full mx-auto px-5 md:px-7">
        <div className="max-w-[1000px] mx-auto">
          <div className="relative">
            <h1 className="text-lg md:text-xl font-bold leading-tight sm:w-[calc(100%_-_140px)]">
              <Link
                href={discussion.group_id ? `/group/${discussion.group_id}/discussion` : "/"}
                className="text-[#4E6BB4] underline-offset-2 underline hover:opacity-80"
              >
                {groupData?.name}
              </Link>
              <span className="text-black inline-block mx-1.5 translate-y-[-1px] ">/</span>
              {discussion.name}
            </h1>
            <div className="mt-10 bg-white border border-[#f0f0f0] p-5">
              <ReactMarkdown className="markDownContent">{discussion.description}</ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
