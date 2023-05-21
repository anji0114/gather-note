import { FC } from "react";
import Link from "next/link";
import { DateFns } from "@/components/Common/DateFns";

type Props = {
  id: string;
  name: string;
  created_at: string;
  postName: string;
};

export const PostItem: FC<Props> = ({ id, name, created_at, postName }) => {
  return (
    <li className="dashboard-item01 py-5 px-7 bg-white border border-[#d0d7de]">
      <p className="pl-[2px] text-[#555] text-[12px]">
        <DateFns time={created_at!} />
      </p>
      <p className="mt-2.5">
        <Link
          href={`/${postName}/${id}`}
          className="text-[#4e6bb4] font-medium underline-offset-2  hover:underline"
        >
          {name}
        </Link>
      </p>
    </li>
  );
};
