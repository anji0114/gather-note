import { NextPage } from "next";
import useSWR from "swr";

import { DashboardLayout } from "@/components/Dashboard/DashboardLayout";
import { Meta } from "@/components/Common/Meta";
import { DashboardHeading } from "@/components/Common/Heading";
import { FolderOpenIcon } from "@heroicons/react/24/outline";
import { ButtonNew } from "@/components/Common/Buttons";
import { LoadingBlock } from "@/components/Common/Loading/LoadingBlock";
import { Folder } from "@/types";
import { PostItem } from "@/components/Common/Post/PostItem";

const DashboardPage: NextPage = () => {
  const { data, error, isLoading } = useSWR("/api/folders");

  return (
    <>
      <Meta pageTitle="フォルダ管理" />
      <DashboardLayout>
        <DashboardHeading text="フォルダ管理" icon={<FolderOpenIcon />}>
          <ButtonNew href={"/folder/new"} />
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
      </DashboardLayout>
    </>
  );
};

export default DashboardPage;
