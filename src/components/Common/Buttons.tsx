import { PlusIcon } from "@heroicons/react/24/outline";
import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import { FC } from "react";

type ButtonNewProps = {
  text?: string;
  onClick?: () => void;
  href?: Url;
};

export const ButtonNew: FC<ButtonNewProps> = ({ text, onClick, href }) => {
  if (href) {
    return (
      <Link
        href={href!}
        className="flex items-center py-2.5 px-5 text-sm gap-2 rounded bg-[#222] text-white hover:bg-[#555]"
      >
        <PlusIcon className="w-5" />
        <span className="">{text ? text : "新規作成"}</span>
      </Link>
    );
  }

  return (
    <button
      className="flex items-center py-2.5 px-5 text-sm gap-2 rounded bg-[#222] text-white hover:bg-[#555]"
      onClick={onClick}
    >
      <PlusIcon className="w-5" />
      <span className="">{text ? text : "新規作成"}</span>
    </button>
  );
};
