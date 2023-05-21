import { useRouter } from "next/router";
import useSWR from "swr";
import { Loading } from "@/components/Common/Loading";
import { useEffect } from "react";
import { useStore } from "@/store";
import { DiscussionHeading } from "@/components/Discussion/DiscussionHeading";

import { Meta } from "@/components/Common/Meta";
import { Layout } from "@/components/Layout";
import { LayoutContainer } from "@/components/Layout/LayoutContainer";

const DiscussionIdPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, error, isLoading } = useSWR(id ? `/api/discussions/${id}` : null);
  const setDiscussion = useStore((state) => state.setDiscussion);

  useEffect(() => {
    if (data?.id) {
      setDiscussion({
        id: data.id,
        board_id: data.board_id,
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
          <div></div>
        </LayoutContainer>
      </Layout>
    </>
  );
};

export default DiscussionIdPage;
