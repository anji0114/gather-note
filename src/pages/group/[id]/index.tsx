import { NextPage } from "next";
import { useStore } from "@/store";
import { useGroupMembership } from "@/hooks/useGroupMembership";
import { GroupDashboard } from "@/components/Group/GroupDashboard";
import { GroupLayout } from "@/components/Group/GroupLayout";
import { GroupRegister } from "@/components/Group/GroupRegister";
import { Meta } from "@/components/Common/Meta";
import { GroupOverview } from "@/components/Group/GroupOverview";

const GroupId: NextPage = () => {
  const group = useStore((state) => state.group);
  const { isMember, isLoading: isMemberLoading } = useGroupMembership(group.id);

  return (
    <>
      <Meta />
      <GroupLayout>
        <GroupOverview />
        {isMemberLoading ? (
          <></>
        ) : isMember ? (
          <GroupDashboard />
        ) : (
          <GroupRegister groupId={group.id} />
        )}
      </GroupLayout>
    </>
  );
};

export default GroupId;
