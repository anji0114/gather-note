import { useStore } from "@/store";
import Image from "next/image";
import useSWR from "swr";
import { DateFns } from "@/components/Common/DateFns";
import { useState } from "react";
import { LinkIcon } from "@heroicons/react/24/outline";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

export const GroupOverview = () => {
  const group = useStore((state) => state.group);
  const { data: MembersData, error: MembersError } = useSWR(
    group.id ? `/api/groups/${group.id}/members` : null
  );
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyURL = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <div className="bg-[#FCFCFC] px-5 py-7 border border-[#e2e7ed] rounded">
      <div className="gap-10 sm:flex">
        <div className="relative w-full pb-[66%] sm:w-[300px] sm:h-[200px] sm:pb-0">
          <Image
            src={group.thumbnail_url ? group.thumbnail_url : "/no-image.jpg"}
            alt="グループサムネイル"
            width={600}
            height={400}
            className="absolute inset-0 inline-block rounded-lg max-w-[600px] object-cover w-full h-full"
          />
        </div>
        <div className="mt-5 sm:w-[calc(100%_-_300px_-_40px)] sm:mt-0">
          <p className="font-bold text-xl">{group.name}</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li className="flex">
              <span className="w-[100px] font-medium">作成日:</span>
              <DateFns time={group.created_at} />
            </li>
            <li className="flex">
              <span className="w-[100px] font-medium">メンバー数:</span>
              <span>{MembersData?.length}名</span>
            </li>
          </ul>
          <button
            onClick={handleCopyURL}
            className={`mt-5 py-1 w-[160px] flex items-center justify-center gap-2 border border-[#4e6bb4] rounded-lg   ${
              !isCopied ? "bg-white text-[#4e6bb4]" : "bg-[#4e6bb4] text-white pointer-events-none"
            } `}
          >
            <LinkIcon className="w-4" />
            <span className="text-[12px] py-[1px] font-medium">
              {!isCopied ? "URLをコピーする" : "コピー完了！"}
            </span>
          </button>
        </div>
      </div>
      <div className="mt-3 border border-[#f0f0f0] bg-white p-4 rounded">
        <ReactMarkdown className="markDownContent isSmall">{group.description}</ReactMarkdown>
      </div>
    </div>
  );
};
