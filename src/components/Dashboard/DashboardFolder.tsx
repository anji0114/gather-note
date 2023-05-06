import { FC } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { FolderOpenIcon } from "@heroicons/react/24/outline";
import { ButtonNew } from "@/components/Common/Button/ButtonNew";
import { LoadingBlock } from "@/components/Common/Loading/LoadingBlock";
import { DashboardHeading } from "@/components/Dashboard/DashboardHeading";
import { DashboardFolderItem } from "@/components/Dashboard/DashboardFolderItem";

export const DashboardFolder: FC = () => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const router = useRouter();

  const { data, error, isLoading } = useSWR("/api/folders");

  const handleCreateNote = async () => {
    const { data, error } = await supabase
      .from("folders")
      .insert({
        name: "新規フォルダ",
        description: "",
        user_id: user!.id,
      })
      .select()
      .single();

    if (error) {
      alert(error.message);
      return;
    }

    router.push(`/folder/${data.id}`);
  };

  return (
    <>
      <DashboardHeading title="フォルダ管理" icon={<FolderOpenIcon className="w-[30px]" />}>
        <ButtonNew handleCreate={handleCreateNote} />
      </DashboardHeading>
      <div className="relative min-h-[100px] mt-8">
        {isLoading ? (
          <LoadingBlock />
        ) : error ? (
          <p className="text-center text-red-400">エラーが発生しました</p>
        ) : (
          <ul className="space-y-[1px]">
            {data.map((note: any) => (
              <DashboardFolderItem
                key={note.id}
                id={note.id}
                name={note.name}
                description={note.description}
                created_at={note.created_at}
              />
            ))}
          </ul>
        )}
      </div>
    </>
  );
};
