import { FC } from "react";
import { useRouter } from "next/router";
import { useStore } from "@/store";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { ButtonNew } from "@/components/Common/Buttons";
import { FolderNoteList } from "@/components/Folder/FolderNoteList";

export const FolderContent: FC = () => {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const folder = useStore((state) => state.folder);

  const handleCreateNotes = async () => {
    const { data, error } = await supabase
      .from("notes")
      .insert({
        folder_id: folder.id,
        name: "新規ページ",
        content: "",
      })
      .select()
      .single();

    if (error) {
      alert(error.message);
      return;
    }

    router.push(`/note/${data.id}`);
  };

  return (
    <>
      <FolderNoteList />
      <div className="w-fit mx-auto mt-12">
        <ButtonNew text="新規ノート作成" handleCreate={handleCreateNotes} />
      </div>
    </>
  );
};
