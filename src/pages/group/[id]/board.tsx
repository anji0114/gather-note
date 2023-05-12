import { useStore } from "@/store";
import useSWR from "swr";
import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline";
import { GroupLayout } from "@/components/Group/GroupLayout";
import { DashboardHeading } from "@/components/Common/Heading";
import { BoardCreate } from "@/components/Board/BoardCreate";
import { useGroupMembership } from "@/hooks/useGroupMembership";
import { GroupRegister } from "@/components/Group/GroupRegister";
import { PostItem } from "@/components/Common/PostItem";

const GroupBoardPage = () => {
  const group = useStore((state) => state.group);

  const { data, error, isLoading } = useSWR(group.id ? `/api/groups/${group.id}/boards` : null);
  const { isMember, isLoading: isMemberLoading } = useGroupMembership(group.id);

  return (
    <GroupLayout>
      <DashboardHeading text="ボード一覧" icon={<ClipboardDocumentListIcon />}>
        {isMember && <BoardCreate />}
      </DashboardHeading>

      {isMemberLoading ? (
        <></>
      ) : isMember ? (
        <ul className="mt-8 space-y-[1px]">
          {data?.map((board: any) => (
            <PostItem
              key={board.key}
              id={board.id}
              name={board.name}
              description={board.description}
              created_at={board.created_at}
              postName="board"
            />
          ))}
        </ul>
      ) : (
        <GroupRegister groupId={group.id} />
      )}
    </GroupLayout>
  );
};

export default GroupBoardPage;
