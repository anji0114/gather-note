import { Note } from "@/types";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";

export const BoardNotes = () => {
  const router = useRouter();
  const { data, error, isLoading } = useSWR(
    router.query.id ? `/api/boards/${router.query.id}/notes` : null
  );

  return (
    <div className="mt-6 pt-6 border-t border-[#ccc]">
      <h2 className=" text-xl font-bold">ボードのノート</h2>
      <ul className="mt-7 border-b border-[#eee]">
        {data?.map((note: Note) => (
          <li className="p-2 text-sm text-blue-500 border-t border-[#eee]" key={note.id}>
            <Link href={`/note/${note.id}`}>{note.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
