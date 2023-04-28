import { FC, useState } from "react";
import Link from "next/link";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { ListBulletIcon } from "@heroicons/react/24/solid";
import { Folder } from "@/types";
import { DateFns } from "@/components/Common/Date/DateFns";

export const DashboardFolderItem: FC<Folder> = ({ id, name, created_at, description }) => {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleDeleteFolder = async (id: string) => {
    const { error } = await supabase.from("notes").delete().eq("id", id);
    if (error) {
      alert(error.message);
      return;
    }

    router.reload();
  };

  return (
    <li className="dashboard-item01 py-5 px-7 bg-white border border-[#d0d7de]">
      <p className="pl-[2px] text-[#555] text-[12px]">
        <DateFns time={created_at!} />
      </p>
      <p className="mt-2.5">
        <Link
          href={`/folder/${id}`}
          className="text-[#4e6bb4] font-medium underline-offset-2  hover:underline"
        >
          {name}
        </Link>
      </p>
      {description && <p className="mt-2 text-sm text-[#444] line-clamp-1">{description}</p>}
    </li>
  );
};
