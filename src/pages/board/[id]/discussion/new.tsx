import { useRouter } from "next/router";
import TextareaAutosize from "react-textarea-autosize";
import { Layout } from "@/components/Layout";
import { LayoutContainer } from "@/components/Layout/LayoutContainer";
import { useState } from "react";
import useSWR from "swr";
import { Note } from "@/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { LoadingCircle } from "@/components/Common/Loading/LoadingCircle";

const BoardDiscussionNew = () => {
  const router = useRouter();
  const supabase = useSupabaseClient();
  const [name, setName] = useState("");
  const [command, setCommand] = useState("");
  const [mainNoteId, setMainNoteId] = useState("");
  const [subNoteId, setSubNoteId] = useState("");
  const [prompt, setPrompt] = useState("");
  const { id } = router.query;
  const { data, error, isLoading } = useSWR(
    router.query.id ? `/api/boards/${router.query.id}/notes` : null
  );
  const [createLoading, setCreateLoading] = useState(false);

  const handleCreatePrompt = async () => {
    const { data: mainNoteData, error: mainNoteError } = await supabase
      .from("notes")
      .select("content")
      .eq("id", mainNoteId)
      .single();

    const { data: subNoteData, error: subNoteError } = await supabase
      .from("notes")
      .select("content")
      .eq("id", subNoteId)
      .single();

    setPrompt(`
    ${command}。ノート1: ${mainNoteData?.content} ノート2: ${subNoteData?.content}
    `);
  };

  const handleCreateDiscussion = async () => {
    setCreateLoading(true);

    await handleCreatePrompt();

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

    const { data, error } = await supabase
      .from("discussions")
      .insert({
        board_id: id,
        name: name,
        content: OpenAiData.content,
      })
      .select()
      .single();

    if (error) {
      alert(error.message);
      return;
    }

    const { error: mainNoteRelationError } = await supabase.from("discussion_notes").insert({
      discussion_id: data.id,
      note_id: mainNoteId,
    });

    const { error: subNoteRelationError } = await supabase.from("discussion_notes").insert({
      discussion_id: data.id,
      note_id: subNoteId,
    });

    setCreateLoading(false);

    router.push(`/discussion/${data.id}`);
  };

  return (
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
              className="mt-2 p-2 w-full max-w-[600px] border border-[#D0D7DE] rounded outline-none"
            />
          </div>
          <div className="mt-5">
            <label className="pl-[2px] w-full inline-block font-medium">AIへの指示</label>
            <TextareaAutosize
              minRows={1}
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              className="mt-1 p-2 w-full resize-none border border-[#D0D7DE] rounded outline-none"
            />
          </div>
          <div className="mt-5">
            <p className="font-medium">ノート1の選択</p>
            <div className="mt-2 flex gap-4">
              <select
                className="pl-4 pr-5 py-2 rounded border border-[#D0D7DE]"
                value={mainNoteId}
                onChange={(e) => setMainNoteId(e.target.value)}
              >
                {data?.map((note: Note) => (
                  <option value={note.id} key={note.id}>
                    {note.name}
                  </option>
                ))}
              </select>
              <select
                className="pl-4 pr-5 py-2 rounded border border-[#D0D7DE]"
                value={subNoteId}
                onChange={(e) => setSubNoteId(e.target.value)}
              >
                {data?.map((note: Note) => (
                  <option value={note.id} key={note.id}>
                    {note.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="pt-5 mt-5 text-right border-t border-[#D0D7DE] ">
            <button
              className="px-4 py-2.5 rounded text-sm font-medium text-white bg-[#4e6bb4] hover:opacity-75"
              onClick={handleCreateDiscussion}
            >
              ディスカッションを作成
            </button>
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
  );
};

export default BoardDiscussionNew;
