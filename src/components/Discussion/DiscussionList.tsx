import { useRouter } from "next/router";
import useSWR from "swr";
import { Loading } from "@/components/Common/Loading";
import { NoteItem } from "@/components/Common/NoteItem";
import { Square2StackIcon } from "@heroicons/react/24/outline";
import { Discussion } from "@/types";

export const DiscussionList = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading } = useSWR(id ? `/api/boards/${id}/discussion` : null);

  if (isLoading) return <Loading />;

  return (
    <ul className="mt-8 space-y-4">
      {data?.map((discussion: Discussion) => (
        <NoteItem
          key={discussion.id}
          id={discussion.id}
          name={discussion.name}
          created_at={discussion.created_at!}
          postName="discussion"
          icon={<Square2StackIcon />}
        />
      ))}
    </ul>
  );
};
