import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Loading } from "@/components/Common/Loading";
import { GroupDashboard } from "@/components/Group/GroupDashboard";
import { GroupLayout } from "@/components/Group/GroupLayout";
import { GroupRegister } from "@/components/Group/GroupRegister";
import { useGroupMembership } from "@/hooks/useGroupMembership";

import useSWR from "swr";
import { DateFns } from "@/components/Common/DateFns";

const GroupId: NextPage = () => {
  const router = useRouter();
  const { data, error, isLoading } = useSWR(
    router.query.id ? `/api/groups/${router.query.id}` : null
  );
  const { isMember, isLoading: isMemberLoading } = useGroupMembership(data?.id);

  if (isLoading) return <Loading />;

  return (
    <GroupLayout>
      <div className="bg-[#FCFCFC] px-5 py-7 border border-[#e2e7ed] rounded">
        <div className="flex gap-10">
          <div className="text-center w-[300px] h-[200px]">
            <Image
              src="/test.jpg"
              alt="グループサムネイル"
              width={600}
              height={400}
              className="inline-block rounded-lg max-w-[600px] object-cover w-full h-full"
            />
          </div>
          <div className="w-[calc(100%_-_300px_-_40px)]">
            <p className="font-bold text-xl">{data?.name}</p>
            <p className="mt-3">{data?.description}</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li className="flex">
                <span className="w-[100px] font-medium">作成日:</span>
                <DateFns time={data?.created_at} />
              </li>
              <li className="flex">
                <span className="w-[100px] font-medium">メンバー数:</span>
                <span>12名</span>
              </li>
              <li className="flex">
                <span className="w-[100px] font-medium">ボード数:</span>
                <span>5個</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {isMemberLoading ? (
        <></>
      ) : isMember ? (
        <GroupDashboard />
      ) : (
        <GroupRegister groupId={data?.id} />
      )}
    </GroupLayout>
  );
};

export default GroupId;
