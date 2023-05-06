import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { Note } from "@/types";
import { DateFns } from "../Common/Date/DateFns";

export const BoardNotes = () => {
  const router = useRouter();
  const { data, error, isLoading } = useSWR(
    router.query.id ? `/api/boards/${router.query.id}/notes` : null
  );

  return (
    <ul className="mt-8 space-y-4">
      {data?.map((note: Note) => (
        <li key={note.id} className="flex justify-between w-full pb-4 border-b border-[#d0d7de]">
          <Link
            href={`/note/${note.id}`}
            className="relative inline-block pl-7 text-[#4e6bb4] text-sm font-medium underline-offset-3 hover:underline"
          >
            <DocumentTextIcon className="absolute left-0 top-1/2 translate-y-[-50%] w-6" />
            <span>{note.name}</span>
          </Link>
          <p className="text-sm">
            <DateFns time={note.updated_at!} />
          </p>
        </li>
      ))}
    </ul>
  );
};
