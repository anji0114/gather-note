import React, { useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import TextareaAutosize from "react-textarea-autosize";
import { useStore } from "@/store";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";

export const DiscussionNewComment = () => {
  const user = useUser();
  const supabase = useSupabaseClient();
  const router = useRouter();
  const discussion = useStore((state) => state.discussion);
  const [comment, setComment] = useState("");
  const [isPreview, setIsPreview] = useState(false);

  const handleCreateComment = async () => {
    const { error } = await supabase.from("discussion_comments").insert({
      user_id: user!.id,
      discussion_id: discussion.id,
      comment: comment,
    });

    if (error) {
      alert(error?.message);
      return;
    }

    router.reload();
  };

  return (
    <div className="border border-[#d0d7de] p-4 rounded">
      <p className="font-bold pl-1">コメントする</p>
      <div className="mt-2 flex text-sm border justify-start w-fit rounded overflow-hidden">
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsPreview(false);
          }}
          className={`py-2 px-3 ${isPreview ? "bg-white" : "bg-[#f6f8fa] pointer-events-none"}`}
        >
          書く
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsPreview(true);
          }}
          className={`py-2 px-3 ${isPreview ? "bg-[#f6f8fa] pointer-events-none" : "bg-white"}`}
        >
          プレビュー
        </button>
      </div>
      <div className="mt-2 min-h-[186px]">
        {isPreview ? (
          <ReactMarkdown
            className="markdownContent text-sm px-2 py-5 w-full border-y border-[#d0d7de] bg-[#fff] min-h-[186px]"
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeSanitize]}
          >
            {comment}
          </ReactMarkdown>
        ) : (
          <TextareaAutosize
            required
            minRows={6}
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
            className="text-sm p-2 w-full border border-[#d0d7de] bg-[#f6f8fa] rounded resize-none outline-none leading-7"
          />
        )}
      </div>
      <div className="text-right mt-2">
        <button
          className={`text-sm text-white py-2.5 px-5 rounded ${
            comment ? "bg-[#4e6bb4] hover:opacity-75" : "bg-gray-400 cursor-not-allowed"
          }`}
          disabled={!comment}
          onClick={handleCreateComment}
        >
          コメントする
        </button>
      </div>
    </div>
  );
};
