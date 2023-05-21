import { useRouter } from "next/router";
import useSWR from "swr";
import { useEffect } from "react";
import { useStore } from "@/store";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Loading } from "@/components/Common/Loading";

import { DiscussionHeading } from "@/components/Discussion/DiscussionHeading";
import { Meta } from "@/components/Common/Meta";
import { Layout } from "@/components/Layout";
import { LayoutContainer } from "@/components/Layout/LayoutContainer";
import { DiscussionNewComment } from "@/components/Discussion/DiscussionNewComment";

const DiscussionIdPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading } = useSWR(id ? `/api/discussions/${id}` : null);
  const { data: CommentsData } = useSWR(id ? `/api/discussions/${id}/comments` : null);

  const setDiscussion = useStore((state) => state.setDiscussion);

  useEffect(() => {
    if (data?.id) {
      setDiscussion({
        id: data.id,
        group_id: data.group_id,
        name: data.name,
        description: data.description,
      });
    }
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Meta />
      <Layout>
        <DiscussionHeading />
        <LayoutContainer classes="py-14">
          <div className="max-w-[1000px] mx-auto">
            <h2 className="font-bold text-lg">コメント一覧</h2>
            <ul className="space-y-5 mt-10">
              {CommentsData?.map((comment: any) => (
                <li key={comment.id} className="border border-[#d0d7de] p-4 rounded">
                  <ReactMarkdown className="markDownContent isSmall">
                    {comment.comment}
                  </ReactMarkdown>
                </li>
              ))}
            </ul>
            <div className="mt-8 pt-8 border-t-2 border-[#d0d7de]">
              <DiscussionNewComment />
            </div>
          </div>
        </LayoutContainer>
      </Layout>
    </>
  );
};

export default DiscussionIdPage;
