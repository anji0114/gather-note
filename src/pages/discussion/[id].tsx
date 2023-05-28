import { useRouter } from "next/router";
import useSWR from "swr";
import { useEffect, useState } from "react";
import { useStore } from "@/store";
import { useGroupMembership } from "@/hooks/useGroupMembership";
import { Loading } from "@/components/Common/Loading";
import { DiscussionHeading } from "@/components/Discussion/DiscussionHeading";
import { Meta } from "@/components/Common/Meta";
import { Layout } from "@/components/Layout";
import { LayoutContainer } from "@/components/Layout/LayoutContainer";
import { DiscussionNewCommentMemo as DiscussionNewComment } from "@/components/Discussion/DiscussionNewComment";
import { Error404 } from "@/components/Common/Error/Error404";
import { DIscussionComment } from "@/components/Discussion/DIscussionComment";

const DiscussionIdPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, error, isLoading } = useSWR(id ? `/api/discussions/${id}` : null);
  const setDiscussion = useStore((state) => state.setDiscussion);
  const { isMember, isAdmin, isLoading: membershipLoading } = useGroupMembership(data?.group_id);

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

  // メンバーかどうか判定
  useEffect(() => {
    if (!membershipLoading && !isMember) {
      router.push("/dashboard");
    }
  }, [membershipLoading, isMember]);

  if (isLoading) {
    return <Loading />;
  }

  if (error || !data) {
    return <Error404 text="404 - ディスカッションは存在しません" />;
  }

  return (
    <>
      <Meta />
      <Layout>
        <DiscussionHeading />
        <LayoutContainer classes="py-14">
          <div className="max-w-[1000px] mx-auto">
            <DIscussionComment isAdmin={isAdmin} />
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
