import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { DiscussionList } from "./DiscussionList";

export const DiscussionCreate = ({ boardId }: { boardId: string | undefined | string[] }) => {
  const supabase = useSupabaseClient();
  const [name, setName] = useState("");
  const [prompt, setPrompt] = useState("");

  const createDiscussion = async () => {
    const OpenAiResponse = await fetch("/api/openai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: [{ role: "user", content: prompt }] }),
    });
    const OpenAiData = await OpenAiResponse.json();

    const { data, error } = await supabase.from("discussions").insert({
      board_id: boardId,
      name: name,
      content: OpenAiData.content,
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("success");
  };

  return (
    <div>
      <p>ディスカッション</p>
      <div>
        <input
          type="text"
          className="border"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="my-2">
          <input
            type="text"
            className="border border-black"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>
        <button onClick={createDiscussion} className="border border-black px-4 py-1">
          質問する
        </button>
      </div>
      <DiscussionList />
    </div>
  );
};
