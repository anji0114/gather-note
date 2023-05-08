import Link from "next/link";
import { useRouter } from "next/router";
import { useStore } from "@/store";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import useSWR from "swr";
import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline";
import { DateFns } from "@/components/Common/DateFns";
import { GroupLayout } from "@/components/Group/GroupLayout";

const GroupBoardPage = () => {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const group = useStore((state) => state.editGroup);

  const handleCreateBoard = async () => {
    const { data, error } = await supabase
      .from("boards")
      .insert({
        group_id: group.id,
        name: "新規ボード",
      })
      .select("id")
      .single();

    if (error) {
      alert(error.message);
      return;
    }

    router.push(`/board/${data.id}`);
  };

  const { data, error, isLoading } = useSWR(
    router.query.id ? `/api/groups/${router.query.id}/boards` : null
  );

  return (
    <GroupLayout>
      <div className="flex gap-5">
        <button className="bg-blue-500 text-white py-2 px-5" onClick={handleCreateBoard}>
          ボード作成
        </button>
      </div>
      <h1 className="flex items-center gap-2.5">
        <ClipboardDocumentListIcon className="w-[30px]" />
        <span className="inline-block whitespace-nowrap font-medium">ボード一覧</span>
      </h1>
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
