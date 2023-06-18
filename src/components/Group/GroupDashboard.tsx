import { FC } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline";
import { PostItem } from "@/components/Common/Post/PostItem";

export const GroupDashboard: FC = () => {
  const router = useRouter();

  const { data } = useSWR(router.query.id ? `/api/groups/${router.query.id}/latest-boards` : null);

  return (
    <div className="mt-10">
      <p className="flex items-center gap-2.5">
        <ClipboardDocumentListIcon className="w-[30px]" />
        <span className="text-lg inline-block whitespace-nowrap font-medium">新着ボード</span>
      </p>
      <ul className="mt-5 space-y-[1px]">
        {data?.map((board: any) => (
          <PostItem
            key={board.id}
            id={board.id}
            name={board.name}
            created_at={board.created_at}
            postName="board"
          />
        ))}
      </ul>
    </div>
  );
};
