import { BoardHeading } from "@/components/Board/BoardHeaidng";
import { DiscussionCreate } from "@/components/Discussion/DiscussionCreate";
import { Layout } from "@/components/Layout";

import { LayoutHeader } from "@/components/Layout/Header";
import { LayoutContainer } from "@/components/Layout/LayoutContainer";
import { LayoutFooter } from "@/components/Layout/LayoutFooter";
import { useRouter } from "next/router";

const BoardDiscussion = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Layout>
      <BoardHeading />
      <LayoutContainer classes="mt-14">
        <div className=" max-w-[800px] mx-auto">
          <DiscussionCreate boardId={id} />
        </div>
      </LayoutContainer>
    </Layout>
  );
};

export default BoardDiscussion;
