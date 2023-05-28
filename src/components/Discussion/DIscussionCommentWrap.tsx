import React, { Dispatch, FC, SetStateAction, useState } from "react";
import useSWR from "swr";
import { DiscussionCommentItem } from "@/components/Discussion/DiscussionCommentItem";
import { Comment } from "@/types";
import { useRouter } from "next/router";
import { useStore } from "@/store";

type Props = {
  isAdmin: boolean;
  setGptComment: Dispatch<SetStateAction<string>>;
};

export const DIscussionCommentWrap: FC<Props> = ({ isAdmin, setGptComment }) => {
  const router = useRouter();
  const { id } = router.query;
  const discussion = useStore((state) => state.discussion);
  const { data: CommentsData } = useSWR(id ? `/api/discussions/${id}/comments` : null);
  const [isCheckOpen, setIsCheckOpen] = useState(false);
  const [promptComments, setPromptComments] = useState<string[]>([]);

  const handleChangeCheck = () => {
    setIsCheckOpen((prevState) => !prevState);
    setPromptComments([]);
  };

  const handleCreateGpt = async () => {
    const prompt = promptComments.join("---");
    const promptMessage = `
    以降のディスカッションを、議論の整理してください。
    ---
    ディスカッションのテーマ: ${discussion.name}
    以下各ディスカッションへのコメント
    ${prompt}`;

    const OpenAiResponse = await fetch("/api/openai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: [
          {
            role: "user",
            content: promptMessage,
          },
        ],
      }),
    });

    const OpenAiData = await OpenAiResponse.json();
    console.log(OpenAiData.content);
    setGptComment(OpenAiData.content);
  };

  return (
    <>
      <h2 className="font-bold text-lg">コメント一覧</h2>
      <ul className="space-y-3 mt-10">
        {CommentsData?.map((comment: Comment) => (
          <DiscussionCommentItem
            key={comment.id}
            id={comment.id}
            user_id={comment.user_id}
            comment={comment.comment}
            user_name={comment.user_name}
            avatar_url={comment.avatar_url}
            created_at={comment.created_at}
            isCheckOpen={isCheckOpen}
            promptComments={promptComments}
            setPromptComments={setPromptComments}
          />
        ))}
      </ul>
      {isAdmin && (
        <div className="mt-10 flex justify-center gap-5">
          <button
            className="inline-block py-2.5 px-4 text-sm rounded border border-[#222]"
            onClick={handleChangeCheck}
          >
            {isCheckOpen ? "キャンセル" : "コメントをまとめる"}
          </button>
          {isCheckOpen && (
            <button
              className={`inline-block py-2.5 px-4 text-sm rounded  text-white ${
                promptComments.length < 2
                  ? "bg-[#888] cursor-not-allowed"
                  : "bg-[#222] hover:bg-[#555]"
              }`}
              disabled={promptComments.length < 2}
              onClick={handleCreateGpt}
            >
              AIにまとめてもらう
            </button>
          )}
        </div>
      )}
    </>
  );
};
