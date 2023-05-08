import { FC } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline";
import { DateFns } from "../Common/DateFns";
import Link from "next/link";

export const GroupDashboard: FC = () => {
  const router = useRouter();

  const { data, error, isLoading } = useSWR(
    router.query.id ? `/api/groups/${router.query.id}/boards` : null
  );

  return (
    <div className="mt-10">
      <p className="flex items-center gap-2.5">
        <ClipboardDocumentListIcon className="w-[30px]" />
        <span className="text-lg inline-block whitespace-nowrap font-medium">新着ボード</span>
      </p>
      <ul className="mt-5 space-y-[1px]">
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
    </div>
  );
};
