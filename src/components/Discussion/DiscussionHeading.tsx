import { FC, useEffect, useState } from "react";
import Link from "next/link";
import useSWR from "swr";
import { useStore } from "@/store";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { PostHeading } from "@/components/Common/Post/PostHeading";
import { PostDelete } from "@/components/Common/Post/PostDelete";
import { EditMarkdown } from "@/components/Common/EditMarkdown";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

export const DiscussionHeading: FC = () => {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const discussion = useStore((state) => state.discussion);
  const setDiscussion = useStore((state) => state.setDiscussion);
  const { data: groupData } = useSWR(
    discussion.group_id ? `/api/groups/${discussion.group_id}` : null
  );

  useEffect(() => {
    if (discussion.id) {
      setName(discussion.name);
      setDescription(discussion.description);
    }
  }, [discussion]);

  // discussionの削除
  const handleDiscussionDelete = async () => {
    const { error } = await supabase.from("discussions").delete().eq("id", discussion.id);

    if (error) {
      return;
    }

    router.push(`/group/${groupData.id}/discussion`);
  };

  // discussionのアップデート
  const handleDiscussionUpdate = async () => {
    const { error } = await supabase
      .from("discussions")
      .update({
        name: name,
        description: description,
      })
      .eq("id", discussion.id);

    if (error) {
      return;
    }

    setDiscussion({
      ...discussion,
      name: name,
      description: description,
    });

    setIsEdit(false);
  };

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
              href={discussion.group_id ? `/group/${discussion.group_id}/discussion` : "/"}
              className="text-[#4E6BB4] underline-offset-2 underline hover:opacity-80"
            >
              {groupData?.name}
            </Link>
            <span className="text-black inline-block mx-1.5 translate-y-[-1px] ">/</span>
            {discussion.name}
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
                handleDelete={handleDiscussionDelete}
              />
              <button
                className={`text-sm text-white py-2 px-5 rounded ${
                  name && description
                    ? "bg-[#4e6bb4] hover:opacity-75"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                onClick={handleDiscussionUpdate}
                disabled={!name || !description}
              >
                保存する
              </button>
            </div>
          </>
        ) : (
          <ReactMarkdown className="markDownContent text-sm">
            {discussion.description}
          </ReactMarkdown>
        )}
      </div>
    </PostHeading>
  );
};
