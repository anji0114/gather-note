import { FC } from "react";
import Link from "next/link";
import { Group } from "@/types";
import { DateFns } from "@/components/Common/DateFns";

export const DashboardGroupItem: FC<Group> = ({ id, name, created_at, description }) => {
  return (
    <li className="dashboard-item01 py-5 px-7 bg-white border border-[#d0d7de]">
      <p className="pl-[2px] text-[#555] text-[12px]">
        <DateFns time={created_at!} />
      </p>
      <p className="mt-2.5">
        <Link
          href={`/group/${id}`}
          className="text-[#4e6bb4] font-medium underline-offset-2  hover:underline"
        >
          {name}
        </Link>
      </p>
      {description && <p className="mt-2 text-sm text-[#444] line-clamp-1">{description}</p>}
    </li>
  );
};
