import { BoardHeading } from "@/components/Board/BoardHeaidng";
import { DiscussionList } from "@/components/Discussion/DiscussionList";
import { Layout } from "@/components/Layout";
import { LayoutContainer } from "@/components/Layout/LayoutContainer";
import Link from "next/link";
import { useRouter } from "next/router";

const BoardDiscussion = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Layout>
      <BoardHeading />
      <LayoutContainer classes="mt-14">
        <div className=" max-w-[800px] mx-auto">
          <DiscussionList />
          <Link href={`/board/${id}/discussion/new`}>新規ディスカッション</Link>
        </div>
      </LayoutContainer>
    </Layout>
  );
};

export default BoardDiscussion;
