import { Loading } from "@/components/Common/Loading";
import { LoadingBlock } from "@/components/Common/Loading/LoadingBlock";
import { GroupDashboard } from "@/components/Group/GroupDashboard";
import { GroupLayout } from "@/components/Group/GroupLayout";
import { GroupRegister } from "@/components/Group/GroupRegister";
import { Layout } from "@/components/Layout";
import { useGroupMembership } from "@/hooks/useGroupMembership";
import { useStore } from "@/store";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

import useSWR from "swr";

const GroupId: NextPage = () => {
  const router = useRouter();
  const { data, error, isLoading } = useSWR(
    router.query.id ? `/api/groups/${router.query.id}` : null
  );
  const setGroup = useStore((state) => state.setEditGroup);

  const { isMember, isLoading: isMembershipLoading } = useGroupMembership(data?.id);

  useEffect(() => {
    if (data?.id) {
      setGroup({ id: data.id, name: data.name, description: data.description });
    }
  }, [data]);

  if (isLoading) return <Loading />;

  return (
    <GroupLayout>
      <div className="bg-red-100 p-5 space-y-3">
        <p className="font-bold text-2xl">情報</p>
        <p>{data?.name}</p>
      </div>
      <div className="relative min-h-[100px]">
        {isMembershipLoading ? (
          <LoadingBlock />
        ) : isMember ? (
          <GroupDashboard />
        ) : (
          <GroupRegister groupId={data.id} />
        )}
      </div>
    </GroupLayout>
  );
};

export default GroupId;
