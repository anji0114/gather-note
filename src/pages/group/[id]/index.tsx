import { Loading } from "@/components/Common/Loading";
import { LoadingBlock } from "@/components/Common/Loading/LoadingBlock";
import { GroupDashboard } from "@/components/Group/GroupDashboard";
import { GroupRegister } from "@/components/Group/GroupRegister";
import { Layout } from "@/components/Layout";
import { useGroupMembership } from "@/hooks/useGroupMembership";
import { NextPage } from "next";
import { useRouter } from "next/router";

import useSWR from "swr";

const GroupId: NextPage = () => {
  const router = useRouter();
  const { data, error, isLoading } = useSWR(
    router.query.id ? `/api/groups/${router.query.id}` : null
  );

  const { isMember, isLoading: isMembershipLoading } = useGroupMembership(data?.id);

  if (isLoading) return <Loading />;

  return (
    <Layout>
      <div className=" max-w-[800px] mx-auto">
        <div className="bg-red-100 p-5 space-y-3">
          <p className="font-bold text-2xl">情報</p>
          <p>{data?.name}</p>
        </div>
        <div className="relative min-h-[100px]">
          {isMembershipLoading ? (
            <LoadingBlock />
          ) : isMember ? (
            <GroupDashboard group={data} />
          ) : (
            <GroupRegister groupId={data.id} />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default GroupId;
