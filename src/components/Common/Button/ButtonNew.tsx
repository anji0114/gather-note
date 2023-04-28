import { PlusIcon } from "@heroicons/react/24/outline";
import { FC } from "react";

type HandleCreate = () => void;

type Props = {
  text?: string;
  handleCreate: () => void;
};

export const ButtonNew: FC<Props> = ({ text, handleCreate }) => {
  return (
    <button
      className="flex items-center py-2.5 px-5 gap-2 rounded bg-[#222] text-white hover:bg-[#555]"
      onClick={handleCreate}
    >
      <PlusIcon className="w-[18px] translate-y-[1px] " />
      <span className="text-sm inline-block">{text ? text : "新規作成"}</span>
    </button>
  );
};
