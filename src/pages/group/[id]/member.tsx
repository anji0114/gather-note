import Image from "next/image";
import useSWR from "swr";
import { useRouter } from "next/router";
import { useUser } from "@supabase/auth-helpers-react";
import { useStore } from "@/store";
import { UserCircleIcon, UsersIcon } from "@heroicons/react/24/outline";
import { DashboardHeading } from "@/components/Common/Heading";
import { GroupLayout } from "@/components/Group/GroupLayout";
import { GroupMemberMenu } from "@/components/Group/GroupMemberMenu";
import { Profile } from "@/types";

const GroupMemberPage = () => {
  const router = useRouter();
  const group = useStore((state) => state.group);
  const user = useUser();

  const { data } = useSWR<Profile[], Error>(
    router.query.id ? `/api/groups/${router.query.id}/members` : null
  );

  return (
    <GroupLayout>
      <DashboardHeading text="メンバー" icon={<UsersIcon />} />

      <ul className="mt-8 border-b border-[#d0d7de]">
        {data?.map((member) => (
          <li
            key={member.id}
            className="flex items-center gap-4 p-3 pr-5 border-t border-[#d0d7de]"
          >
            <div className="w-10 h-10">
              {member.avatar_url ? (
                <Image
                  src={member.avatar_url}
                  alt="アバター"
                  width={60}
                  height={60}
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <UserCircleIcon className="text-[#777] w-full h-full" />
              )}
            </div>
            <span className="text-sm font-medium">{member.name}</span>
            {member.id === group.owner_id ? (
              <span className="ml-auto text-sm text-blue-900 font-medium">グループ代表</span>
            ) : group.owner_id === user?.id ? (
              <div className="ml-auto">
                <GroupMemberMenu userId={member.id} />
              </div>
            ) : null}
          </li>
        ))}
      </ul>
    </GroupLayout>
  );
};

export default GroupMemberPage;
