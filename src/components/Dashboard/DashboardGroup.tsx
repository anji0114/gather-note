import { FC } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";

import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { UserGroupIcon } from "@heroicons/react/24/outline";
import { DashboardHeading } from "@/components/Dashboard/DashboardHeading";
import { ButtonNew } from "@/components/Common/Button/ButtonNew";
import { LoadingBlock } from "@/components/Common/Loading/LoadingBlock";
import { Group } from "@/types";
import { DashboardGroupItem } from "./DashboardGroupItem";

export const DashboardGroup: FC = () => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const router = useRouter();

  const { data, error, isLoading } = useSWR("/api/groups");

  const handleCreateGroup = async () => {
    const { data: groupData, error: groupError } = await supabase
      .from("groups")
      .insert({
        name: "新規グループ",
        owner_id: user!.id,
      })
      .select()
      .single();

    if (groupError) {
      alert(groupError.message);
      return;
    }

    const { data: memberData, error: memberError } = await supabase
      .from("group_members")
      .insert({
        group_id: groupData.id,
        user_id: user!.id,
        role: "manager",
      })
      .select();

    if (memberError) {
      alert(memberError.message);
      return;
    }

    router.push(`/group/${groupData.id}`);
  };

  return (
    <>
      <DashboardHeading title="グループ管理" icon={<UserGroupIcon className="w-[30px]" />}>
        <ButtonNew handleCreate={handleCreateGroup} />
      </DashboardHeading>

      <div className="relative min-h-[100px] mt-8">
        {isLoading ? (
          <LoadingBlock />
        ) : error ? (
          <p className="text-center text-red-400">エラーが発生しました</p>
        ) : (
          <ul className="space-y-[1px]">
            {data?.map((group: Group) => (
              <DashboardGroupItem
                key={group.id}
                id={group.id}
                name={group.name}
                description={group.description}
                created_at={group.description}
              />
            ))}
          </ul>
        )}
      </div>
    </>
  );
};
