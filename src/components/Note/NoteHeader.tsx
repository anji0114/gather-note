import { FC } from "react";
import { useRouter } from "next/router";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { NoteMenu } from "@/components/Note/NoteMenu";
import { useStore } from "@/store";

type Props = {
  isAuthor: boolean;
};

export const NoteHeader: FC<Props> = ({ isAuthor }) => {
  const router = useRouter();
  const supabase = useSupabaseClient();
  const note = useStore((state) => state.editNote);

  const handleNoteUpdate = async () => {
    const { data, error } = await supabase
      .from("notes")
      .update({
        name: note.name,
        content: note.content,
      })
      .eq("id", note.id)
      .select()
      .single();

    if (error) {
      alert(error);
    }

    router.reload();
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
            {isAuthor && (
              <button
                className="py-2 px-8 text-sm font-medium rounded bg-[#222] text-white hover:bg-[#555]"
                onClick={handleNoteUpdate}
              >
                保存する
              </button>
            )}
            <NoteMenu />
          </div>
        </div>
      </div>
    </header>
  );
};
