import { FC } from "react";
import useSWR from "swr";
import { FolderOpenIcon } from "@heroicons/react/24/outline";
import { LoadingBlock } from "@/components/Common/Loading/LoadingBlock";
import { FolderCreate } from "@/components/Folder/FolderCreate";
import { DashboardHeading } from "@/components/Common/Heading";
import { PostItem } from "@/components/Common/Post/PostItem";
import { Folder } from "@/types";

export const DashboardFolder: FC = () => {
  const { data, error, isLoading } = useSWR("/api/folders");

  return (
    <>
      <DashboardHeading text="フォルダ管理" icon={<FolderOpenIcon />}>
        <FolderCreate />
      </DashboardHeading>
      <div className="relative min-h-[100px] mt-8">
        {isLoading ? (
          <LoadingBlock />
        ) : error ? (
          <p className="text-center text-red-400">エラーが発生しました</p>
        ) : (
          <ul className="space-y-[1px]">
            {data.map((folder: Folder) => (
              <PostItem
                key={folder.id}
                id={folder.id}
                name={folder.name}
                created_at={folder.created_at!}
                postName="folder"
              />
            ))}
          </ul>
        )}
      </div>
    </>
  );
};
