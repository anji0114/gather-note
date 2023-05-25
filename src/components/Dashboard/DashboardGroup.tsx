import { FC } from "react";
import Link from "next/link";
import useSWR from "swr";
import { PlusIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import { LoadingBlock } from "@/components/Common/Loading/LoadingBlock";
import { DashboardGroupItem } from "@/components/Dashboard/DashboardGroupItem";

import { DashboardHeading } from "@/components/Common/Heading";
import { Group } from "@/types";
import { DashboardGroupMenu } from "./DashBoardGroupMenu";

export const DashboardGroup: FC = () => {
  const { data, error, isLoading } = useSWR("/api/groups");

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <>
      <DashboardHeading text="グループ管理" icon={<UserGroupIcon />}>
        <DashboardGroupMenu />
      </DashboardHeading>

      <div className="relative min-h-[100px] mt-6">
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
