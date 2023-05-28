import { useRouter } from "next/router";
import useSWR from "swr";
import { useEffect } from "react";
import { useUser } from "@supabase/auth-helpers-react";
import { NextPage } from "next";
import { useStore } from "@/store";
import { Loading } from "@/components/Common/Loading";
import { FolderHeading } from "@/components/Folder/FolderHeading";
import { FolderContentMemo as FolderContent } from "@/components/Folder/FolderContent";
import { Layout } from "@/components/Layout";
import { Folder } from "@/types";
import { LayoutContainer } from "@/components/Layout/LayoutContainer";
import { Meta } from "@/components/Common/Meta";

const FolderId: NextPage = () => {
  const user = useUser();
  const router = useRouter();
  const folder = useStore((state) => state.folder);
  const setFolder = useStore((state) => state.setFolder);
  const { data, error, isLoading } = useSWR<Folder, Error>(
    router.query.id ? `/api/folders/${router.query.id}` : null
  );

  useEffect(() => {
    if (user?.id && data?.user_id) {
      if (user.id !== data.user_id) router.push("/dashboard");
    }
  }, [user, data]);

  useEffect(() => {
    if (data) {
      setFolder({
        id: data?.id,
        name: data?.name,
        description: data?.description,
      });
    }
  }, [data]);

  if (isLoading || !user?.id) return <Loading />;

  return (
    <>
      <Meta pageTitle={folder.name} />
      <Layout>
        {!data?.deleted_flag ? (
          <>
            <FolderHeading />
            <LayoutContainer classes="py-14">
              <div className="max-w-[800px] mx-auto">
                {!error ? (
                  <FolderContent />
                ) : (
                  <p className=" text-center text-red-500">{error.message}</p>
                )}
              </div>
            </LayoutContainer>
          </>
        ) : (
          <p className="text-center mt-10">このフォルダーは削除されました</p>
        )}
      </Layout>
    </>
  );
};

export default FolderId;
