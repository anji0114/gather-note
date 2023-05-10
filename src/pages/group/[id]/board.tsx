import Link from "next/link";
import { useStore } from "@/store";
import useSWR from "swr";
import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline";
import { DateFns } from "@/components/Common/DateFns";
import { GroupLayout } from "@/components/Group/GroupLayout";
import { DashboardHeading } from "@/components/Common/Heading";
import { BoardCreate } from "@/components/Board/BoardCreate";

const GroupBoardPage = () => {
  const group = useStore((state) => state.group);

  const { data, error, isLoading } = useSWR(group.id ? `/api/groups/${group.id}/boards` : null);

  return (
    <GroupLayout>
      <DashboardHeading text="ボード一覧" icon={<ClipboardDocumentListIcon />}>
        <BoardCreate />
      </DashboardHeading>

      <ul className="mt-8 space-y-[1px]">
        {data?.map((board: any) => (
          <li
            className="dashboard-item01 py-5 px-7 bg-white border border-[#d0d7de]"
            key={board.id}
          >
            <p className="pl-[2px] text-[#555] text-[12px]">
              <DateFns time={board.created_at} />
            </p>
            <p className="mt-2.5">
              <Link
                href={`/board/${board.id}`}
                className="text-[#4e6bb4] font-medium underline-offset-2  hover:underline"
              >
                {board.name}
              </Link>
            </p>
          </li>
        ))}
      </ul>
    </GroupLayout>
  );
};

export default GroupBoardPage;
