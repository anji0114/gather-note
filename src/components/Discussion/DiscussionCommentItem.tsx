import { Comment } from "@/types";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import Image from "next/image";
import { FC, useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { DateFns } from "../Common/DateFns";
import { DiscussionCommentMenu } from "./DiscussionCommentMenu";
import { EditMarkdown } from "../Common/EditMarkdown";

export const DiscussionCommentItem: FC<Comment> = ({
  id,
  user_id,
  comment,
  user_name,
  avatar_url,
  created_at,
}) => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [commentContent, setCommentContent] = useState(comment);
  const [editComment, setEditComment] = useState(comment);
  const [isEdit, setIsEdit] = useState(false);

  const handleUpdateComment = async () => {
    const { error } = await supabase
      .from("discussion_comments")
      .update({
        comment: editComment,
      })
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    setCommentContent(editComment);
    setIsEdit(false);
  };

  return (
    <li className="relative border border-[#d0d7de] py-4 px-5 rounded">
      <div className="flex items-center gap-2">
        <Image
          src={avatar_url ? avatar_url : "/no-avatar.png"}
          alt="アバター"
          width={40}
          height={40}
          className="rounded-full w-9 h-9 object-cover"
        />
        <span className="font-medium text-sm">{user_name}</span>
        <span className="text-[12px] font-medium text-gray-400">
          <DateFns time={created_at} />
        </span>
      </div>
      {user?.id === user_id && (
        <div className="absolute top-5 right-5">
          <DiscussionCommentMenu id={id} setIsEdit={setIsEdit} />
        </div>
      )}
      <div className="mt-4">
        {isEdit ? (
          <>
            <EditMarkdown description={editComment} setDescription={setEditComment} />
            <div className="flex justify-end gap-5">
              <button
                className="text-[12px] border border-[#222] py-2 px-5 rounded hover:bg-gray-100"
                onClick={() => {
                  setIsEdit(false);
                  setEditComment(commentContent);
                }}
              >
                キャンセル
              </button>
              <button
                className={`text-[12px] text-white py-2 px-5 rounded ${
                  editComment ? "bg-[#4e6bb4] hover:opacity-75" : "bg-gray-400 cursor-not-allowed"
                }`}
                disabled={!editComment}
                onClick={handleUpdateComment}
              >
                保存する
              </button>
            </div>
          </>
        ) : (
          <ReactMarkdown className="markDownContent text-sm">{editComment}</ReactMarkdown>
        )}
      </div>
    </li>
  );
};
