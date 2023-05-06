import { DocumentTextIcon, Square3Stack3DIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";

export const BoardHeading = () => {
  const router = useRouter();
  const { id } = router.query;
  const [isDiscussion, setIsDiscussion] = useState(false);
  const { data, error, isLoading } = useSWR(id ? `/api/boards/${id}` : null); //ボード詳細のapi
  // const {data: groupData, error: GroupError} = useSWR()

  useEffect(() => {
    // urlからDiscussionページか判定
    if (id) {
      const asPath = router.asPath;
      const pathSegments = asPath.split("/");
      const lastSegment = pathSegments[pathSegments.length - 1];

      if (lastSegment === "discussion") {
        setIsDiscussion(true);
      }
    }
  }, [router]);

  return (
    <div className="pt-12 bg-[#FCFCFC] border-b border-[#f0f0f0]">
      <div className="max-w-[1140px] w-full mx-auto px-5 sm:px-7">
        <div className="max-w-[1000px] mx-auto">
          <div className="flex justify-between">
            <h1 className="text-lg sm:text-xl font-bold leading-tight w-[calc(100%_-_150px)]">
              <Link href={"/"} className="text-[#4E6BB4] hover:underline">
                グループ名が入ります
              </Link>
              <span className="text-black inline-block mx-1.5 translate-y-[-1px] ">/</span>
              {data?.name}
            </h1>
          </div>
          <p className="mt-7 text-[15px] leading-7">
            ノートの説明書きが入ります。ノートの説明書きが入ります。ノートの説明書きが入ります。ノートの説明書きが入ります。ノートの説明書きが入ります。ノートの説明書きが入ります。
          </p>
          <div className="flex gap-10 mt-10 translate-y-[1px]">
            <Link
              href={`/board/${router.query.id}`}
              className={`flex items-center gap-1 pb-4 px-2 border-b-2 ${
                !isDiscussion ? "border-[#DE6868]" : "border-transparent"
              }`}
            >
              <DocumentTextIcon className="w-6 text-[#555]" />
              <span className="text-sm">ノート</span>
            </Link>
            <Link
              href={`/board/${router.query.id}/discussion`}
              className={`flex items-center gap-1 pb-4 px-2 border-b-2 ${
                isDiscussion ? "border-[#DE6868]" : "border-transparent"
              }`}
            >
              <Square3Stack3DIcon className="w-6 text-[#555]" />
              <span className="text-sm">ディスカッション</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
