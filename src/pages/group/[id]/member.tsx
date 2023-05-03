import { GroupLayout } from "@/components/Group/GroupLayout";
import { Layout } from "@/components/Layout";
import { Profile } from "@/types";
import { UserCircleIcon, UsersIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRouter } from "next/router";
import useSWR from "swr";

const GroupMemberPage = () => {
  const router = useRouter();

  const { data, error, isLoading } = useSWR<Profile[], Error>(
    router.query.id ? `/api/groups/${router.query.id}/members` : null
  );

  return (
    <Layout>
      <GroupLayout>
        <h1 className="flex items-center gap-2.5">
          <UsersIcon className="w-[30px]" />
          <span className="inline-block whitespace-nowrap font-medium">メンバー一覧</span>
        </h1>

        <ul className="mt-8 border-b border-[#d0d7de]">
          {data?.map((member) => (
            <li key={member.id} className="flex items-center gap-4 p-3 border-t border-[#d0d7de]">
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
            </li>
          ))}
        </ul>
      </GroupLayout>
    </Layout>
  );
};

export default GroupMemberPage;
