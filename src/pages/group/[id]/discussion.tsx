import useSWR from "swr";
import { useStore } from "@/store";
import { useGroupMembership } from "@/hooks/useGroupMembership";
import { Square2StackIcon } from "@heroicons/react/24/outline";
import { ButtonNew } from "@/components/Common/Buttons";
import { DashboardHeading } from "@/components/Common/Heading";
import { Meta } from "@/components/Common/Meta";
import { GroupLayout } from "@/components/Group/GroupLayout";
import { LoadingBlock } from "@/components/Common/Loading/LoadingBlock";
import { PostItem } from "@/components/Common/PostItem";
import { GroupRegister } from "@/components/Group/GroupRegister";

const GroupDiscussionPage = () => {
  const group = useStore((state) => state.group);
  const { isMember, isAdmin, isLoading: isMemberLoading } = useGroupMembership(group.id);
  const { data, isLoading } = useSWR(`/api/groups/36f89666-279b-4080-b1e7-2894f2bf32ef/discussion`);

  return (
    <>
      <Meta pageTitle="ディスカッション一覧" />
      <GroupLayout>
        <DashboardHeading text="ディスカッション一覧" icon={<Square2StackIcon />}>
          {isAdmin && <ButtonNew href={`/group/${group.id}/discussion-new`} />}
        </DashboardHeading>
        {isMemberLoading || isLoading ? (
          <div className=" relative w-full min-h-[300px]">
            <LoadingBlock />
          </div>
        ) : isMember ? (
          <ul className="mt-8 space-y-[1px]">
            {data?.map((discussion: any) => (
              <PostItem
                key={discussion.id}
                id={discussion.id}
                name={discussion.name}
                created_at={discussion.created_at}
                postName="discussion"
              />
            ))}
          </ul>
        ) : (
          <GroupRegister groupId={group.id} />
        )}
      </GroupLayout>
    </>
  );
};

export default GroupDiscussionPage;
