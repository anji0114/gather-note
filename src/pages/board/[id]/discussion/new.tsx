import { useRouter } from "next/router";
import { useRef, useState } from "react";
import useSWR from "swr";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import TextareaAutosize from "react-textarea-autosize";
import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { Layout } from "@/components/Layout";
import { LoadingCircle } from "@/components/Common/Loading/LoadingCircle";
import { LayoutContainer } from "@/components/Layout/LayoutContainer";
import { Note } from "@/types";
import { Meta } from "@/components/Common/Meta";

const BoardDiscussionNew = () => {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const { id } = router.query;
  const { data } = useSWR(id ? `/api/boards/${id}/notes` : null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [name, setName] = useState("");
  const [command, setCommand] = useState("下記のノートをまとめてください。");
  const [mainNoteId, setMainNoteId] = useState("");
  const [subNoteId, setSubNoteId] = useState("");
  const [discussion, setDisCussion] = useState("");
  const [isShowDiscussion, setIsShowDiscussion] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);

  // プロンプトの作成
  const handleCreatePrompt = async () => {
    const { data: mainNoteData } = await supabase
      .from("notes")
      .select("content")
      .eq("id", mainNoteId)
      .single();

    const { data: subNoteData } = await supabase
      .from("notes")
      .select("content")
      .eq("id", subNoteId)
      .single();

    return {
      prompt: `${command}
      出力形式は下記の仕様のようにしてください。
      1.出力形式はHTML5のtextareaに入るように、改行などをいれわかりやすいように形で出力ください。
      2.htmlタグなどは含めないでください。
      ノート1: ${mainNoteData?.content}
      ノート2: ${subNoteData?.content}`,
    };
  };

  // ディスカッションの作成関数
  const handleCreateDiscussion = async () => {
    setCreateLoading(true);

    const { prompt } = await handleCreatePrompt();
    setIsShowDiscussion(true);
    const OpenAiResponse = await fetch("/api/openai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: [
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    });

    const OpenAiData = await OpenAiResponse.json();

    setDisCussion(OpenAiData.content); // ディスカッションをtextareaに
    setCreateLoading(false); // ローディング終了

    if (contentRef.current) {
      contentRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  // ディスカッションの保存
  const handleInsertDisCussion = async () => {
    const { data, error } = await supabase
      .from("discussions")
      .insert({
        board_id: id,
        name: name,
        content: discussion,
      })
      .select("id")
      .single();

    if (error) {
      alert(error.message);
      return;
    }

    await supabase.from("discussion_notes").insert({
      discussion_id: data.id,
      note_id: mainNoteId,
    });

    await supabase.from("discussion_notes").insert({
      discussion_id: data.id,
      note_id: subNoteId,
    });

    router.push(`/board/${id}/discussion`);
  };

  return (
    <>
      <Meta />
      <Layout classes="py-20">
        <LayoutContainer>
          <div className="max-w-[700px] mx-auto">
            <h2 className="text-xl font-bold">新しいディスカッションを作成する</h2>
            <p className="mt-2">ボードのノートを元に新しいディスカッションを作成する</p>
            <div className="mt-5 pt-5 border-t border-[#eee]">
              <label className="pl- w-full inline-block font-medium">ディスカッション名</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 p-2 w-full max-w-[500px] border border-[#D0D7DE] rounded outline-none"
              />
            </div>
            <div className="mt-5">
              <label className="pl-[2px] w-full inline-block font-medium">AIへの指示</label>
              <div className="mt-1 relative max-w-[500px]">
                <select
                  defaultValue={command}
                  onChange={(e) => setCommand(e.target.value)}
                  className="p-2 w-full resize-none border border-[#D0D7DE] rounded outline-none appearance-none cursor-pointer"
                >
                  <option value="下記のノートを結合してください。">ノートの結合</option>
                  <option value="下記のノートを比較してください。">ノートの比較</option>
                </select>
                <ChevronUpDownIcon className="w-5 absolute right-2 top-1/2 translate-y-[calc(-50%_+_1px)] pointer-events-none" />
              </div>
            </div>
            <div className="mt-5">
              <p className="font-medium">ノートの選択</p>
              <div className="mt-2 space-y-2">
                <div className="relative">
                  <select
                    className="w-full pl-4 pr-8 py-3 rounded border border-[#D0D7DE] appearance-none cursor-pointer"
                    defaultValue={mainNoteId}
                    onChange={(e) => setMainNoteId(e.target.value)}
                  >
                    <option value="" disabled>
                      ---
                    </option>
                    {data?.map((note: Note) => (
                      <option value={note.id} key={note.id}>
                        {note.name}
                      </option>
                    ))}
                  </select>
                  <ChevronUpDownIcon className="w-5 absolute right-2 top-1/2 translate-y-[calc(-50%_+_1px)] pointer-events-none" />
                </div>
                <div className="relative">
                  <select
                    className="w-full pl-4 pr-8 py-3 rounded border border-[#D0D7DE] appearance-none cursor-pointer"
                    defaultValue={subNoteId}
                    onChange={(e) => setSubNoteId(e.target.value)}
                  >
                    <option value="" disabled>
                      ---
                    </option>
                    {data?.map((note: Note) => (
                      <option value={note.id} key={note.id}>
                        {note.name}
                      </option>
                    ))}
                  </select>
                  <ChevronUpDownIcon className="w-5 absolute right-2 top-1/2 translate-y-[calc(-50%_+_1px)] pointer-events-none" />
                </div>
              </div>
            </div>
            <div className="pt-5 mt-5 text-right border-t border-[#D0D7DE] ">
              <button
                className={`px-4 py-2.5 rounded text-sm font-medium text-white bg-[#4e6bb4]  ${
                  !name || !command || !mainNoteId
                    ? "bg-[#888] cursor-not-allowed"
                    : "hover:opacity-75"
                }`}
                disabled={!name || !command || !mainNoteId ? true : false}
                onClick={handleCreateDiscussion}
              >
                ディスカッションを作成
              </button>
            </div>

            <div
              className={`${
                !isShowDiscussion
                  ? "overflow-hidden h-0"
                  : "min-h-[calc(100vh_-_140px)] h-auto pt-12"
              }`}
              ref={contentRef}
            >
              <TextareaAutosize
                className="mt-1 p-6 w-full resize-none border border-[#D0D7DE] rounded outline-none leading-8"
                value={discussion}
                minRows={2}
              />
              <div className="text-right">
                <button
                  onClick={handleInsertDisCussion}
                  className={`text-white bg-[#222] py-2 px-5 rounded ${
                    !discussion ? "bg-[#888] cursor-not-allowed" : "hover:opacity-75"
                  }`}
                  disabled={!discussion}
                >
                  保存する
                </button>
              </div>
            </div>
          </div>
        </LayoutContainer>

        {createLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-10">
            <div className="fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] ">
              <LoadingCircle />
            </div>
          </div>
        )}
      </Layout>
    </>
  );
};

export default BoardDiscussionNew;
