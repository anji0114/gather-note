import { useRouter } from "next/router";
import useSWR from "swr";
import { Loading } from "@/components/Common/Loading";
import Link from "next/link";
import { DateFns } from "../Common/DateFns";
import { Square3Stack3DIcon } from "@heroicons/react/24/outline";

export const DiscussionList = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, error, isLoading } = useSWR(id ? `/api/boards/${id}/discussion` : null);

  if (isLoading) return <Loading />;

  return (
    <ul className="mt-8 space-y-4">
      {data?.map((discussion: any) => (
        <li
          key={discussion.id}
          className="flex justify-between w-full pb-4 border-b border-[#d0d7de]"
        >
          <Link
            href={`/discussion/${discussion.id}`}
            className="relative inline-block pl-8 text-[#4e6bb4] text-sm font-medium underline-offset-3 hover:underline"
          >
            <Square3Stack3DIcon className="absolute left-0 top-1/2 translate-y-[-50%] w-6" />
            <span>{discussion.name}</span>
          </Link>
          <p className="text-sm">
            <DateFns time={discussion.updated_at!} />
          </p>
        </li>
      ))}
    </ul>
  );
};
