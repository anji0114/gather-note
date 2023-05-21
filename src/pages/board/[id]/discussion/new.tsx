import { useRouter } from "next/router";
import Link from "next/link";
import TextareaAutosize from "react-textarea-autosize";
import { ChevronLeftIcon, Square2StackIcon } from "@heroicons/react/24/outline";
import { Layout } from "@/components/Layout";
import { LayoutContainer } from "@/components/Layout/LayoutContainer";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { FormEvent, useRef, useState } from "react";
import { ToastComponent } from "@/components/Common/Toast";

const BoardDiscussionNew = () => {
  const router = useRouter();
  const { id } = router.query;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [toastOpen, setToastOpen] = useState(false);
  const supabase = useSupabaseClient();

  const handleCreateDiscussion = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from("discussions")
      .insert({
        name: name,
        description: description,
        board_id: id,
      })
      .select("id")
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
            href={`/board/${id}/discussion`}
            className="flex items-center gap-1 hover:opacity-75"
          >
            <ChevronLeftIcon className="w-5" />
            <span className="text-sm font-medium pb-[1px]">前に戻る</span>
          </Link>
          <div className="max-w-[800px] mt-5  mx-auto">
            <h2 className="pb-4 flex items-center gap-2 text-lg font-bold border-b border-[#d0d7de]">
              <Square2StackIcon className="w-8" />
              <span className="pb-[1px]">ディスカッション作成</span>
            </h2>
            <form className="mt-10" onSubmit={handleCreateDiscussion}>
              <div>
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
                <label htmlFor="" className="font-medium">
                  説明
                </label>
                <TextareaAutosize
                  required
                  minRows={5}
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  className="p-2 mt-2 w-full border border-[#d0d7de] bg-[#f6f8fa] rounded resize-none outline-none"
                />
              </div>
              <div className="text-right mt-3">
                <button
                  className={`text-sm text-white py-2.5 px-5 rounded ${
                    name && description
                      ? "bg-[#4e6bb4] hover:opacity-75"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                  disabled={!name || !description}
                >
                  ディスカッションを作成する
                </button>
              </div>
            </form>
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
