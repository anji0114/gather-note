import { FC, memo, useCallback, useEffect, useRef, useState } from "react";
import { useStore } from "@/store";
import { useRouter } from "next/router";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { NoteMenu } from "@/components/Note/NoteMenu";
import { ToastComponent } from "@/components/Common/Toast";

type Props = {
  isAuthor: boolean;
};

export const NoteHeaderComponent: FC<Props> = ({ isAuthor }) => {
  const router = useRouter();
  const supabase = useSupabaseClient();
  const noteRef = useRef(useStore.getState().note);
  const [toastOpen, setToastOpen] = useState(false);

  useEffect(() => useStore.subscribe((state) => (noteRef.current = state.note)), []);

  const handleNoteUpdate = useCallback(async () => {
    if (!noteRef.current.name) {
      return;
    }
    const { error } = await supabase
      .from("notes")
      .update({
        name: noteRef.current.name,
        content: noteRef.current.content,
      })
      .eq("id", noteRef.current.id)
      .select()
      .single();
    if (error) {
      alert(error);
    }
    setToastOpen(true);
  }, []);

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
                    !noteRef.current.name
                      ? " cursor-not-allowed bg-[#888]"
                      : "bg-[#222] hover:bg-[#555]"
                  }`}
                  onClick={handleNoteUpdate}
                  disabled={!noteRef.current.name}
                >
                  保存する
                </button>
                <ToastComponent
                  text="ノートを保存しました。"
                  color="text-green-700"
                  open={toastOpen}
                  setOpen={setToastOpen}
                  isTop={true}
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

export const NoteHeader = memo(NoteHeaderComponent);
