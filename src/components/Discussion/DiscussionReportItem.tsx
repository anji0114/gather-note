import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Image from "next/image";
import { FC, useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { DateFns } from "../Common/DateFns";
import { DiscussionCommentMenu } from "./DiscussionCommentMenu";
import { EditMarkdownMemo as EditMarkdown } from "../Common/EditMarkdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";

type Props = {
  id: string;
  isAdmin: boolean;
  report: string;
  created_at: string;
};

export const DiscussionReportItem: FC<Props> = ({ id, isAdmin, report, created_at }) => {
  const supabase = useSupabaseClient();
  const [commentContent, setCommentContent] = useState(report);
  const [editReport, setEditReport] = useState(report);
  const [isEdit, setIsEdit] = useState(false);

  const handleUpdateReport = async () => {
    const { error } = await supabase
      .from("discussion_reports")
      .update({
        report: editReport,
      })
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    setCommentContent(editReport);
    setIsEdit(false);
  };

  return (
    <li className="relative border border-[#d0d7de] py-4 px-5 rounded">
      <div className="flex items-center gap-2">
        <Image
          src="/ai.png"
          alt="アバター"
          width={40}
          height={40}
          className="rounded-full w-9 h-9 object-cover"
        />
        <span className="font-medium text-sm">AI</span>
        <span className="text-[12px] font-medium text-gray-400">
          <DateFns time={created_at} />
        </span>
      </div>

      {isAdmin && (
        <div className="absolute top-5 right-5">
          <DiscussionCommentMenu id={id} setIsEdit={setIsEdit} />
        </div>
      )}
      <div className="mt-4">
        {isEdit ? (
          <>
            <EditMarkdown description={editReport} setDescription={setEditReport} />
            <div className="flex justify-end gap-5">
              <button
                className="text-[12px] border border-[#222] py-2 px-5 rounded hover:bg-gray-100"
                onClick={() => {
                  setIsEdit(false);
                  setEditReport(commentContent);
                }}
              >
                キャンセル
              </button>
              <button
                className={`text-[12px] text-white py-2 px-5 rounded ${
                  editReport ? "bg-[#4e6bb4] hover:opacity-75" : "bg-gray-400 cursor-not-allowed"
                }`}
                disabled={!editReport}
                onClick={handleUpdateReport}
              >
                保存する
              </button>
            </div>
          </>
        ) : (
          <ReactMarkdown
            className="markdownContent text-sm"
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeSanitize]}
          >
            {editReport}
          </ReactMarkdown>
        )}
      </div>
    </li>
  );
};
