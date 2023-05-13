import { FC } from "react";
import { useRouter } from "next/router";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { useStore } from "@/store";

export const DiscussionHeader: FC = () => {
  const router = useRouter();
  const supabase = useSupabaseClient();
  const discussion = useStore((state) => state.discussion);

  const handleDiscussionUpdate = async () => {
    if (!discussion.name) {
      return;
    }

    const { error } = await supabase
      .from("discussions")
      .update({
        name: discussion.name,
        content: discussion.content,
      })
      .eq("id", discussion.id);

    if (error) {
      alert(error);
      return;
    }
  };

  return (
    <header className="border-b border-[#d0d7de]">
      <div className="max-w-[1140px] w-full mx-auto px-7">
        <div className="h-20 flex items-center justify-between">
          <button onClick={router.back} className="flex items-center gap-1 hover:opacity-75">
            <ChevronLeftIcon className="w-5" />
            <span className="text-sm font-medium pb-[1px]">前に戻る</span>
          </button>
          <div className="flex items-center gap-4">
            <button
              className={`py-2 px-8 text-sm font-medium rounded text-white ${
                !discussion.name ? " cursor-not-allowed bg-[#888]" : "bg-[#222] hover:bg-[#555]"
              }`}
              onClick={handleDiscussionUpdate}
              disabled={!discussion.name}
            >
              保存する
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
