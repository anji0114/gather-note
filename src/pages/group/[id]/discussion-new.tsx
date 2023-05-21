import { useRouter } from "next/router";
import Link from "next/link";
import TextareaAutosize from "react-textarea-autosize";
import { ChevronLeftIcon, Square2StackIcon } from "@heroicons/react/24/outline";
import { Layout } from "@/components/Layout";
import { LayoutContainer } from "@/components/Layout/LayoutContainer";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { ToastComponent } from "@/components/Common/Toast";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

const BoardDiscussionNew = () => {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const { id } = router.query;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [toastOpen, setToastOpen] = useState(false);
  const [isPreview, setIsPreview] = useState(false);

  const handleCreateDiscussion = async () => {
    const { data, error } = await supabase
      .from("discussions")
      .insert({
        name: name,
        description: description,
        group_id: id,
      })
      .select("*")
      .single();

    if (error) {
      setToastOpen(true);
      return;
    }

    router.push(`/discussion/${data.id}`);
  };

  return (
    <>
      <Layout>
        <LayoutContainer classes="py-14">
          <Link
            href={`/group/${id}/discussion`}
            className="flex items-center gap-1 hover:opacity-75"
          >
            <ChevronLeftIcon className="w-5" />
            <span className="text-sm font-medium pb-[1px]">前に戻る</span>
          </Link>
          <div className="max-w-[900px] mt-10 mx-auto">
            <h2 className="flex items-center gap-2 text-lg font-bold border-b border-[#d0d7de] pb-5">
              <Square2StackIcon className="w-8" />
              <span className="pb-[1px]">ディスカッション作成</span>
            </h2>
            <div className="mt-10">
              <label htmlFor="" className="font-medium">
                ディスカッションタイトル
              </label>
              <input
                type="text"
                placeholder="タイトル"
                required
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                className="p-2 mt-2 w-full border border-[#d0d7de] bg-[#f6f8fa] rounded outline-none"
              />
            </div>
            <div className="mt-10">
              <label className="font-medium">説明</label>

              <div className="mt-5 border border-[#d0d7de] p-4 rounded">
                <div className="flex text-sm border justify-start w-fit rounded overflow-hidden">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setIsPreview(false);
                    }}
                    className={`py-2 px-3 ${
                      isPreview ? "bg-white" : "bg-[#f6f8fa] pointer-events-none"
                    }`}
                  >
                    書く
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setIsPreview(true);
                    }}
                    className={`py-2 px-3 ${
                      isPreview ? "bg-[#f6f8fa] pointer-events-none" : "bg-white"
                    }`}
                  >
                    プレビュー
                  </button>
                </div>
                <div className="mt-2 min-h-[210px]">
                  {isPreview ? (
                    <ReactMarkdown className="markDownContent px-2 py-5 w-full border-y border-[#d0d7de] bg-[#fff] min-h-[210px]">
                      {description}
                    </ReactMarkdown>
                  ) : (
                    <TextareaAutosize
                      required
                      minRows={6}
                      value={description}
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                      className="p-2 w-full border border-[#d0d7de] bg-[#f6f8fa] rounded resize-none outline-none leading-7"
                    />
                  )}
                </div>
                <div className="text-right mt-3">
                  <button
                    className={`text-sm text-white py-2.5 px-5 rounded ${
                      name && description
                        ? "bg-[#4e6bb4] hover:opacity-75"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                    disabled={!name || !description}
                    onClick={handleCreateDiscussion}
                  >
                    ディスカッションを作成する
                  </button>
                </div>
              </div>
            </div>
          </div>
        </LayoutContainer>
      </Layout>
      <ToastComponent
        text="エラーが発生しました。"
        color="text-[#DE6868]"
        open={toastOpen}
        setOpen={setToastOpen}
      />
    </>
  );
};

export default BoardDiscussionNew;
