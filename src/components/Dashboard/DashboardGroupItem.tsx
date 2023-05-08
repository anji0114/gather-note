import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { Group } from "@/types";

export const DashboardGroupItem: FC<Group> = ({ id, name, created_at, description }) => {
  return (
    <li className="p-5 pb-6 bg-white border border-[#d0d7de] rounded w-[calc((100%_-_20px)_/_2)]">
      <Link
        className="relative inline-block w-full overflow-hidden pb-[60%] rounded hover:opacity-80 "
        href={`/group/${id}`}
      >
        <Image
          src="/test.jpg"
          alt="グループサムネイル"
          width={600}
          height={600}
          className=" absolute top-0 left-0 w-full h-full object-cover"
        />
      </Link>
      <div className="mt-2.5 px-1">
        <Link
          href={`/group/${id}`}
          className="text-[#4e6bb4] font-medium underline-offset-2  hover:underline"
        >
          {name}
        </Link>
        {description && <p className="mt-2 text-sm text-[#444] line-clamp-1">{description}</p>}
      </div>
    </li>
  );
};
