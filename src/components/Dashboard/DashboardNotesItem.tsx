import { FC, useState } from "react";
import Link from "next/link";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { ListBulletIcon } from "@heroicons/react/24/solid";
import { format } from "date-fns";

type Props = {
  id: string;
  title: string;
  created_at: string;
};

export const DashboardNotesItem: FC<Props> = ({ id, title, created_at }) => {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleDeleteNote = async (id: string) => {
    const { error } = await supabase.from("notes").delete().eq("id", id);
    if (error) {
      alert(error.message);
      return;
    }

    router.reload();
  };

  return (
    <li className="dashboard-item01 flex gap-5 justify-between items-start py-5 px-7 bg-white border border-[#d0d7de]">
      <div className="w-full">
        <p className="pl-[2px] text-[#555] text-[12px]">
          {format(new Date(created_at), "yyyy/MM/dd")}
        </p>
        <p className="mt-2.5">
          <Link
            href={`/notes/${id}`}
            className="text-[#4e6bb4] font-medium underline-offset-2  hover:underline"
          >
            {title}
          </Link>
        </p>
        <p className="mt-2 text-sm text-[#444]">ノートのディスクリプションが入ります。</p>
      </div>
      <div className="w-[40px] relative">
        <button
          className={`w-full inline-block text-center h-[30px] pb-1 border border-[#d0d7de] rounded-md hover:bg-[#f7fafd] ${
            menuOpen ? "bg-[#f7fafd]" : "bg-white"
          }`}
          onClick={() => setMenuOpen((prevState) => !prevState)}
        >
          <ListBulletIcon className=" inline-block w-5" />
        </button>
        <ul className={`menu-list ${menuOpen ? "is--open" : "is--close"}`}>
          <li className="w-full text-center">
            <Link
              href={`note/${id}`}
              className="inline-block w-full p-2.5 text-[12px] font-medium hover:bg-[#f7f7f7]"
            >
              編集する
            </Link>
          </li>
          <li className="w-full text-center border-t border-[#ebeef2]">
            <button
              className="inline-block w-full p-2.5 text-[12px] font-medium text-[#de6868] hover:bg-[#fff4f4]"
              onClick={() => handleDeleteNote(id)}
            >
              削除する
            </button>
          </li>
        </ul>
      </div>
    </li>
  );
};
