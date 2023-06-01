import { useStore } from "@/store";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import React, { FC, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

type Props = {
  promptComments: string[];
  handleChangeCheck: () => void;
  isCheckOpen: boolean;
};

export const DiscussionGenerateReport: FC<Props> = ({
  promptComments,
  handleChangeCheck,
  isCheckOpen,
}) => {
  const discussion = useStore((state) => state.discussion);
  const [generatedReport, setGeneratedReport] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerate, setIsGenerate] = useState(false);
  const supabase = useSupabaseClient();
  const router = useRouter();

  const definitionText = `### ディスカッションの要約:ディスカッションの要約を提供してください。参加者が達成したキーポイント、議論、結論などを含めてください。\n---\n---### コメントの整理:コメントを関連性や類似性などの基準に基づいて整理してください。\n---\n---### コメントの分析:コメントの分析、サポートや反対の論点、反論、追加の洞察などを含めてください。`;

  const handleGenerateReport = async () => {
    setGeneratedReport("");
    setIsLoading(true);
    setIsGenerate(true);
    let promptComment = "";
    promptComments.forEach((comment, index) => {
      promptComment += `${index + 1}. コメント: [コメント ${index + 1}]\n内容: [${comment}]\n---\n`;
    });

    const prompt = `
    ディスカションのタイトル: [${discussion.name}]
    ---
    ### コメント一覧:
    ${promptComment}`;

    const response = await fetch("/api/openai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: [
          { role: "assistant", content: definitionText },
          { role: "user", content: prompt },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = response.body;
    if (!data) {
      setIsLoading(false);
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setGeneratedReport((prev) => prev + chunkValue);
    }

    setIsLoading(false);
  };

  const handleContinueGenerating = async () => {
    setIsLoading(true);
    setIsGenerate(true);

    const response = await fetch("/api/openai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: [
          {
            role: "user",
            content: `「${generatedReport}」から続けてください`,
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = response.body;
    if (!data) {
      setIsLoading(false);
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;
    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setGeneratedReport((prev) => prev + chunkValue);
    }

    setIsLoading(false);
  };

  const handleCreateReport = async () => {
    const { error } = await supabase
      .from("discussion_reports")
      .insert({
        discussion_id: discussion.id,
        report: generatedReport,
      })
      .select();

    if (error) {
      alert(error);
      return;
    }

    router.reload();
  };

  return (
    <>
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
            onClick={handleGenerateReport}
          >
            AIにまとめてもらう
          </button>
        )}
      </div>
      {isCheckOpen && isGenerate && (
        <div className="mt-4">
          <TextareaAutosize
            required
            minRows={6}
            value={generatedReport}
            onChange={(e) => {
              !isLoading && setGeneratedReport(e.target.value);
            }}
            className="text-sm p-2 w-full border border-[#d0d7de] bg-[#f6f8fa] rounded resize-none outline-none leading-7"
          />
          <div className="text-right mt-2 flex gap-10 justify-end">
            <button
              className={`text-sm text-white py-2.5 px-5 rounded ${
                !isLoading && generatedReport
                  ? "bg-[#222] hover:opacity-75"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={isLoading || !generatedReport}
              onClick={handleContinueGenerating}
            >
              続けてもらう
            </button>
            <button
              className={`text-sm text-white py-2.5 px-5 rounded ${
                !isLoading && generatedReport
                  ? "bg-[#4e6bb4] hover:opacity-75"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={isLoading || !generatedReport}
              onClick={handleCreateReport}
            >
              保存する
            </button>
          </div>
        </div>
      )}
    </>
  );
};
