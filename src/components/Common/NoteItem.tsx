import Link from "next/link";
import { FC } from "react";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { DateFns } from "@/components/Common/DateFns";

type Props = {
  id: string;
  name: string;
  created_at: string;
  postName: string;
};

export const NoteItem: FC<Props> = ({ id, name, created_at, postName }) => {
  return (
    <li className="flex justify-between w-full pb-4 border-b border-[#d0d7de]">
      <Link
        href={`/${postName}/${id}`}
        className="relative inline-block pl-7 text-[#4e6bb4] text-sm font-medium underline-offset-3 hover:underline"
      >
        <DocumentTextIcon className="absolute left-0 top-1/2 translate-y-[-50%] w-6" />
        <span>{name}</span>
      </Link>
      <p className="text-sm">
        <DateFns time={created_at} />
      </p>
    </li>
  );
};
