import { useRouter } from "next/router";
import useSWR from "swr";
import { useEffect } from "react";
import { useStore } from "@/store";
import { Loading } from "@/components/Common/Loading";
import { useUser } from "@supabase/auth-helpers-react";
import { FolderTop } from "@/components/Folder/FolderTop";
import { NextPage } from "next";
import { Folder } from "@/types";
import { LayoutHeader } from "@/components/Layout/Header";
import { FolderContent } from "@/components/Folder/FolderContent";
import { LayoutFooter } from "@/components/Layout/LayoutFooter";

const FolderId: NextPage = () => {
  const user = useUser();
  const router = useRouter();
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
      <LayoutHeader />
      <div className="min-h-[calc(100vh_-_190px)]">
        {!data?.deleted_flag ? (
          <>
            <FolderTop />
            <div className="mt-14 mx-auto max-w-[1140px] w-full px-5 sm:px-7">
              <div className="max-w-[800px] mx-auto">
                {!error ? (
                  <FolderContent />
                ) : (
                  <p className=" text-center text-red-500">{error.message}</p>
                )}
              </div>
            </div>
          </>
        ) : (
          <p className="text-center mt-10">このフォルダーは削除されました</p>
        )}
      </div>
      <LayoutFooter />
    </>
  );
};

export default FolderId;
