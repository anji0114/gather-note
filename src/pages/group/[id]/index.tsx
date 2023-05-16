import { NextPage } from "next";
import { useState } from "react";
import useSWR from "swr";
import Image from "next/image";
import { GroupDashboard } from "@/components/Group/GroupDashboard";
import { GroupLayout } from "@/components/Group/GroupLayout";
import { GroupRegister } from "@/components/Group/GroupRegister";
import { useGroupMembership } from "@/hooks/useGroupMembership";
import { DateFns } from "@/components/Common/DateFns";
import { useStore } from "@/store";
import { LinkIcon } from "@heroicons/react/24/solid";

const GroupId: NextPage = () => {
  const group = useStore((state) => state.group);
  const [isCopied, setIsCopied] = useState(false);
  const { isMember, isLoading: isMemberLoading } = useGroupMembership(group.id);
  const { data: MembersData, error: MembersError } = useSWR(
    group.id ? `/api/groups/${group.id}/members` : null
  );

  const handleCopyURL = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <GroupLayout>
      <div className="bg-[#FCFCFC] px-5 py-7 border border-[#e2e7ed] rounded">
        <div className="flex gap-10">
          <div className="text-center w-[300px] h-[200px]">
            <Image
              src={group.thumbnail_url ? group.thumbnail_url : "/no-image.jpg"}
              alt="グループサムネイル"
              width={600}
              height={400}
              className="inline-block rounded-lg max-w-[600px] object-cover w-full h-full"
            />
          </div>
          <div className="w-[calc(100%_-_300px_-_40px)]">
            <p className="font-bold text-xl">{group.name}</p>
            <p className="mt-3">{group.description}</p>

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
                !isCopied
                  ? "bg-white text-[#4e6bb4]"
                  : "bg-[#4e6bb4] text-white pointer-events-none"
              } `}
            >
              <LinkIcon className="w-4" />
              <span className="text-[12px] py-[1px] font-medium">
                {!isCopied ? "URLをコピーする" : "コピー完了！"}
              </span>
            </button>
          </div>
        </div>
      </div>
      {isMemberLoading ? (
        <></>
      ) : isMember ? (
        <GroupDashboard />
      ) : (
        <GroupRegister groupId={group.id} />
      )}
    </GroupLayout>
  );
};

export default GroupId;
