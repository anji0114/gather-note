import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { useGroupMembership } from "@/hooks/useGroupMembership";
import { GroupDashboard } from "@/components/Group/GroupDashboard";
import { GroupLayout } from "@/components/Group/GroupLayout";
import { GroupRegister } from "@/components/Group/GroupRegister";
import { Meta } from "@/components/Common/Meta";
import { GroupOverview } from "@/components/Group/GroupOverview";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Group } from "@/types";
import { ParsedUrlQuery } from "querystring";

const GroupId: NextPage<{ group: Group }> = ({ group }) => {
  const { isMember, isLoading: isMemberLoading } = useGroupMembership(group.id);

  return (
    <>
      <Meta />
      <GroupLayout>
        <GroupOverview group={group} />
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

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext<ParsedUrlQuery>
) => {
  const supabase = createServerSupabaseClient(context);

  const { data, error } = await supabase
    .from("groups")
    .select("*")
    .eq("id", context.params?.id)
    .single();

  return {
    props: {
      group: data,
    },
  };
};
