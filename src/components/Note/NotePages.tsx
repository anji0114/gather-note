import { useStore } from "@/store";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import { DateFns } from "../Common/Date/DateFns";
import { Loading } from "../Common/Loading";

export const NotePages = () => {
  const router = useRouter();
  const note = useStore((state) => state.editNote);
  const { data, isLoading } = useSWR(
    router.query.id ? `/api/notes/${router.query.id}/pages` : null
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {data?.length > 0 ? (
        <ul className="mt-8 space-y-4">
          {data?.map((page: any) => (
            <li
              key={page.id}
              className="flex justify-between w-full pb-4 border-b border-[#d0d7de]"
            >
              <Link
                href={`/page/${page.id}`}
                className="relative inline-block pl-7 text-sm font-medium underline-offset-3 hover:underline"
              >
                <DocumentTextIcon className="absolute left-0 top-1/2 translate-y-[-50%] w-6" />
                {page.title}
              </Link>
              <p className="text-sm">
                <DateFns time={page.created_at} />
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-8 text-center text-lg ">作成されたページはありません</p>
      )}
    </>
  );
};