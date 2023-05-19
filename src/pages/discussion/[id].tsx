import { useRouter } from "next/router";
import useSWR from "swr";
import { Loading } from "@/components/Common/Loading";
import { useEffect } from "react";
import { useStore } from "@/store";
import { DiscussionHeader } from "@/components/Discussion/DiscussionHeader";
import { Editor } from "@/components/Common/Editor";
import { Meta } from "@/components/Common/Meta";

const DiscussionIdPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, error, isLoading } = useSWR(id ? `/api/discussions/${id}` : null);
  const discussion = useStore((state) => state.discussion);
  const setDiscussion = useStore((state) => state.setDiscussion);

  useEffect(() => {
    if (data?.id) {
      setDiscussion({
        id: data.id,
        name: data.name,
        content: data.content,
      });
    }
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Meta />
      <DiscussionHeader />
      <Editor isEditor={true} post={discussion} setPost={setDiscussion} />
    </>
  );
};

export default DiscussionIdPage;
