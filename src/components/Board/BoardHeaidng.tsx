import Link from "next/link";
import useSWR from "swr";
import { useStore } from "@/store";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { PostHeading } from "@/components/Common/Post/PostHeading";
import { useEffect, useState } from "react";
import { PostDelete } from "@/components/Common/Post/PostDelete";
import { EditMarkdown } from "@/components/Common/EditMarkdown";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

export const BoardHeading = () => {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const board = useStore((state) => state.board);
  const setBoard = useStore((state) => state.setBoard);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { data: groupData } = useSWR(board?.group_id ? `/api/groups/${board.group_id}` : null);
  const [isEdit, setIsEdit] = useState(false);

  const handleBoardDelete = async () => {
    const { error } = await supabase.from("boards").delete().eq("id", board.id);

    if (error) {
      return;
    }

    router.push(`/group/${groupData.id}/board`);
  };

  const handleBoardUpdate = async () => {
    const { error } = await supabase
      .from("boards")
      .update({
        name: name,
        description: description,
      })
      .eq("id", board.id);

    if (error) {
      return;
    }

    setBoard({
      ...board,
      name: name,
      description: description,
    });

    setIsEdit(false);
  };

  useEffect(() => {
    if (board.id) {
      setName(board.name);
      setDescription(board.description);
    }
  }, [board]);

  return (
    <PostHeading>
      <div className="sm:w-[calc(100%_-_120px)]">
        {isEdit ? (
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="タイトル"
            className="p-2 w-full border border-[#d0d7de] bg-white rounded outline-none"
          />
        ) : (
          <h1 className="text-lg md:text-xl font-bold leading-tight">
            <Link
              href={groupData?.id ? `/group/${groupData?.id}/board` : ""}
              className="text-[#4E6BB4] underline-offset-2 underline hover:opacity-80"
            >
              {groupData?.name}
            </Link>
            <span className="text-black inline-block mx-1.5 translate-y-[-1px] ">/</span>
            {board.name}
          </h1>
        )}
      </div>

      <button
        className={`absolute right-0 top-0 py-1 px-3 text-sm rounded border ${
          isEdit ? "border-[#222] bg-gray-50" : "border-[#D0D7DE] bg-white"
        }`}
        onClick={() => {
          setIsEdit((prevState) => !prevState);
        }}
      >
        {isEdit ? "キャンセル" : "編集する"}
      </button>

      <div className="mt-10 bg-white border border-[#f0f0f0] p-5 rounded-sm">
        {isEdit ? (
          <>
            <EditMarkdown description={description} setDescription={setDescription} />
            <div className="flex justify-between mt-2">
              <PostDelete
                title="ディスカッションの削除"
                description="ディスカッション削除すると、コメントも削除されます。"
                handleDelete={handleBoardDelete}
              />
              <button
                className={`text-sm text-white py-2 px-5 rounded ${
                  name && description
                    ? "bg-[#4e6bb4] hover:opacity-75"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                onClick={handleBoardUpdate}
                disabled={!name || !description}
              >
                保存する
              </button>
            </div>
          </>
        ) : (
          <ReactMarkdown className="markDownContent text-sm">{board.description}</ReactMarkdown>
        )}
      </div>
    </PostHeading>
  );
};
