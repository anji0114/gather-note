import { useRouter } from "next/router";
import TextareaAutosize from "react-textarea-autosize";
import useSWR from "swr";
import { Loading } from "@/components/Common/Loading";
import { useEffect } from "react";
import { useStore } from "@/store";
import { Layout } from "@/components/Layout";
import { DiscussionHeader } from "@/components/Discussion/DiscussionHeader";

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
      <DiscussionHeader />
      <div className="max-w-[700px] mx-auto py-16 px-5">
        <h1 className="text-2xl sm:text-4xl">
          <TextareaAutosize
            value={discussion.name}
            onChange={(e) => {
              setDiscussion({ ...discussion, name: e.target.value });
            }}
            minRows={1}
            placeholder="タイトル"
            className="w-full leading-snug font-bold outline-none resize-none overflow-visible"
          />
        </h1>
        <p className="mt-10">
          <TextareaAutosize
            value={discussion.content}
            onChange={(e) => {
              setDiscussion({ ...discussion, content: e.target.value });
            }}
            placeholder="内容を入力してください"
            className="w-full outline-none resize-none px-1 leading-8 overflow-hidden"
          />
        </p>
      </div>
    </>
  );
};

export default DiscussionIdPage;
