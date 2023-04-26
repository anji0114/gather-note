import { FC } from "react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
// import { NoteItem } from '@/components/Dashboard/DashboardNoteItem'
import { DashboardHeading } from "./DashboardHeading";
import { ButtonNew } from "../Common/Button/ButtonNew";
import { LoadingCircle } from "../Common/Loading/LoadingCircle";
import { DashboardNotesItem } from "./DashboardNotesItem";

export const DashboardNotes: FC = () => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const router = useRouter();

  const { data, error, isLoading } = useSWR("/api/notes");

  console.log(data);

  const handleCreateNote = async () => {
    const { data, error } = await supabase
      .from("notes")
      .insert({
        title: "新規ノート",
        description: "",
        user_id: user!.id,
      })
      .select()
      .single();

    if (error) {
      alert(error.message);
      return;
    }

    router.push(`/notes/${data.id}`);
  };

  return (
    <>
      <DashboardHeading title="ノート管理" icon={<DocumentTextIcon className="w-[30px]" />}>
        <ButtonNew handleCreate={handleCreateNote} />
      </DashboardHeading>
      <div className="relative min-h-[100px] mt-8">
        {isLoading ? (
          <div className=" absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
            <LoadingCircle />
          </div>
        ) : (
          <ul className="space-y-[1px]">
            {data.map((note: any) => (
              <DashboardNotesItem id={note.id} title={note.title} created_at={note.created_at} />
            ))}
          </ul>
        )}
      </div>
    </>
  );
};
