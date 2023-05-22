import { useStore } from "@/store";
import useSWR from "swr";
import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline";
import { useGroupMembership } from "@/hooks/useGroupMembership";
import { GroupLayout } from "@/components/Group/GroupLayout";
import { DashboardHeading } from "@/components/Common/Heading";
import { GroupRegister } from "@/components/Group/GroupRegister";
import { PostItem } from "@/components/Common/Post/PostItem";
import { LoadingBlock } from "@/components/Common/Loading/LoadingBlock";
import { Board } from "@/types";
import { Meta } from "@/components/Common/Meta";
import { ButtonNew } from "@/components/Common/Buttons";

const GroupBoardPage = () => {
  const group = useStore((state) => state.group);
  const { data, isLoading } = useSWR<Board[], Error>(
    group.id ? `/api/groups/${group.id}/boards` : null
  );
  const { isMember, isAdmin, isLoading: isMemberLoading } = useGroupMembership(group.id);

  return (
    <>
      <Meta />
      <GroupLayout>
        <DashboardHeading text="ボード一覧" icon={<ClipboardDocumentListIcon />}>
          {isAdmin && <ButtonNew href={`/group/${group.id}/board-new`} />}
        </DashboardHeading>

        {isMemberLoading || isLoading ? (
          <div className=" relative w-full min-h-[300px]">
            <LoadingBlock />
          </div>
        ) : isMember ? (
          <ul className="mt-8 space-y-[1px]">
            {data?.map((board: any) => (
              <PostItem
                key={board.id}
                id={board.id}
                name={board.name}
                created_at={board.created_at}
                postName="board"
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

export default GroupBoardPage;
