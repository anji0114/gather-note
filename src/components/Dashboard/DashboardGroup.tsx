import { FC } from "react";
import Link from "next/link";
import useSWR from "swr";
import { PlusIcon, UserGroupIcon } from "@heroicons/react/24/outline";

import { LoadingBlock } from "@/components/Common/Loading/LoadingBlock";
import { DashboardGroupItem } from "@/components/Dashboard/DashboardGroupItem";
import { Group } from "@/types";
import { DashboardHeading } from "@/components/Common/Heading";

export const DashboardGroup: FC = () => {
  const { data, error, isLoading } = useSWR("/api/groups");

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <>
      <DashboardHeading text="グループ管理" icon={<UserGroupIcon />}>
        <Link
          className="flex items-center py-2.5 px-5 gap-2 rounded bg-[#222] text-white hover:bg-[#555]"
          href={"/group/new"}
        >
          <PlusIcon className="w-[18px] translate-y-[1px] " />
          <span className="text-sm inline-block">新規作成</span>
        </Link>
      </DashboardHeading>

      <div className="relative min-h-[100px] mt-8">
        {isLoading ? (
          <LoadingBlock />
        ) : error ? (
          <p className="text-center text-red-400">エラーが発生しました</p>
        ) : (
          <ul className="flex justify-between flex-wrap gap-4 md:gap-5">
            {data?.map((group: Group) => (
              <DashboardGroupItem
                key={group.id}
                id={group.id}
                name={group.name}
                description={group.description}
                thumbnail_url={group.thumbnail_url}
              />
            ))}
          </ul>
        )}
      </div>
    </>
  );
};
