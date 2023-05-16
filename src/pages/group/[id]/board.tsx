import { useStore } from "@/store";
import useSWR from "swr";
import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline";
import { useGroupMembership } from "@/hooks/useGroupMembership";
import { GroupLayout } from "@/components/Group/GroupLayout";
import { DashboardHeading } from "@/components/Common/Heading";
import { BoardCreate } from "@/components/Board/BoardCreate";
import { GroupRegister } from "@/components/Group/GroupRegister";
import { PostItem } from "@/components/Common/PostItem";
import { LoadingBlock } from "@/components/Common/Loading/LoadingBlock";
import { Board } from "@/types";

const GroupBoardPage = () => {
  const group = useStore((state) => state.group);

  const { data, error, isLoading } = useSWR<Board[], Error>(
    group.id ? `/api/groups/${group.id}/boards` : null
  );
  const { isMember, isLoading: isMemberLoading } = useGroupMembership(group.id);

  return (
    <GroupLayout>
      <DashboardHeading text="ボード一覧" icon={<ClipboardDocumentListIcon />}>
        {isMember && <BoardCreate />}
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
