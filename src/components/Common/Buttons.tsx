import { PlusIcon } from "@heroicons/react/24/outline";
import { FC } from "react";

type Props = {
  text?: string;
  onClick: () => void;
};

export const ButtonNew: FC<Props> = ({ text, onClick }) => {
  return (
    <button
      className="flex items-center py-2.5 px-5 gap-2 rounded bg-[#222] text-white hover:bg-[#555]"
      onClick={onClick}
    >
      <PlusIcon className="w-[18px] translate-y-[1px] " />
      <span className="">{text ? text : "新規作成"}</span>
    </button>
  );
};
