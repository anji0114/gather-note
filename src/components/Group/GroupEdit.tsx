import { useStore } from "@/store";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

export const GroupEdit = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const group = useStore((state) => state.group);

  useEffect(() => {
    setName(group.name);
    setDescription(group.description);
  }, [group]);

  return (
    <div className="py-10 px-16 border border-[#d0d7de] rounded-md space-y-6">
      <p className=" font-bold text-xl">グループ情報編集</p>
      <div>
        <p className="pl-1 text-sm font-medium">グループ名</p>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          className="mt-2.5 px-4 py-3 w-full max-w-[400px] text-sm border border-[#d0d7de] rounded outline-none"
          placeholder="Font Developer"
        />
      </div>
      <div>
        <p className="pl-1 text-sm font-medium">グループ概要</p>
        <TextareaAutosize
          minRows={2}
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          className="mt-2.5 px-4 py-3 w-full  text-sm border border-[#d0d7de] rounded outline-none resize-none"
        />
      </div>
      <button className="py-2 px-8 text-sm text-white bg-[#222] rounded hover:bg-[#555]">
        保存する
      </button>
      <div>
        <p className=" font-bold text-xl">グループの削除</p>
      </div>
    </div>
  );
};
