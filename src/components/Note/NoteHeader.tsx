import { FC, useState } from "react";
import { useRouter } from "next/router";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { useStore } from "@/store";
import { NoteMenu } from "@/components/Note/NoteMenu";
import { ToastComponent } from "../Common/Toast";

type Props = {
  isAuthor: boolean;
};

export const NoteHeader: FC<Props> = ({ isAuthor }) => {
  const router = useRouter();
  const supabase = useSupabaseClient();
  const note = useStore((state) => state.note);
  const [toastOpen, setToastOpen] = useState(false);

  const handleNoteUpdate = async () => {
    if (!note.name) {
      return;
    }

    const { error } = await supabase
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

    setToastOpen(true);
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
              <>
                <button
                  className={`py-2 px-8 text-sm font-medium rounded text-white ${
                    !note.name ? " cursor-not-allowed bg-[#888]" : "bg-[#222] hover:bg-[#555]"
                  }`}
                  onClick={handleNoteUpdate}
                  disabled={!note.name}
                >
                  保存する
                </button>
                <ToastComponent
                  text="ノートを保存しました。"
                  color="text-green-700"
                  open={toastOpen}
                  setOpen={setToastOpen}
                />
                <NoteMenu />
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
