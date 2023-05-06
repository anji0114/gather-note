import { DiscussionCreate } from "@/components/Discussion/DiscussionCreate";
import { Layout } from "@/components/Layout";
import { useRouter } from "next/router";

const BoardDiscussion = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Layout>
      <DiscussionCreate boardId={id} />
    </Layout>
  );
};

export default BoardDiscussion;
