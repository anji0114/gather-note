import { DateFns } from "@/components/Common/Date/DateFns";
import { GroupLayout } from "@/components/Group/GroupLayout";
import { Layout } from "@/components/Layout";
import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";

const GroupBoardPage = () => {
  const router = useRouter();

  const { data, error, isLoading } = useSWR(
    router.query.id ? `/api/groups/${router.query.id}/boards` : null
  );

  console.log(data);

  return (
    <Layout>
      <GroupLayout>
        <div className="flex items-center justify-between py-[14px] px-5 border border-[#d0d7de] rounded-md bg-white min-h-[72px]">
          <h1 className="flex items-center gap-2.5">
            <ClipboardDocumentListIcon className="w-[30px]" />
            <span className="inline-block whitespace-nowrap font-medium">ボード一覧</span>
          </h1>
        </div>
        <ul className="mt-8">
          {data?.map((board: any) => (
            <li className="dashboard-item01 py-5 px-7 bg-white border border-[#d0d7de]">
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
    </Layout>
  );
};

export default GroupBoardPage;
