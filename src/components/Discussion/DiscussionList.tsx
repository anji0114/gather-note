import { useRouter } from "next/router";
import useSWR from "swr";
import { Loading } from "@/components/Common/Loading";

export const DiscussionList = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, error, isLoading } = useSWR(id ? `/api/boards/${id}/discussion` : null);

  if (isLoading) return <Loading />;

  return (
    <ul>
      {data?.map((discussion: any) => (
        <li key={discussion.id} className="py-4 border-b border-[#333]">
          {discussion.name}
          <p>{discussion.content}</p>
        </li>
      ))}
    </ul>
  );
};
