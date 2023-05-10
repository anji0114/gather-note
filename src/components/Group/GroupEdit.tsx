import { useStore } from "@/store";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { GroupDelete } from "./GroupDelete";

export const GroupEdit = () => {
  const router = useRouter();
  const supabase = useSupabaseClient();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const group = useStore((state) => state.group);

  useEffect(() => {
    setName(group.name);
    setDescription(group.description);
  }, [group]);

  const handleUpdateGroup = async () => {
    const { error } = await supabase
      .from("groups")
      .update({
        name: name,
        description: description,
      })
      .eq("id", group.id);

    if (error) {
      alert(error.message);
      return;
    }

    router.reload();
  };

  return (
    <div className="py-10 px-16 border border-[#d0d7de] rounded-md">
      <p className=" font-bold text-xl">グループ情報編集</p>
      <div className="mt-6">
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
      <div className="mt-6">
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
      <button
        className="mt-4 py-2 px-8 text-sm text-white bg-[#222] rounded hover:bg-[#555]"
        onClick={handleUpdateGroup}
      >
        保存する
      </button>
      <div className="mt-10 pt-10 border-t border-[#d0d7de]">
        <p className=" font-bold text-xl">グループの削除</p>
        <p className="mt-2">グループに関する情報全てが削除されます。</p>
        <div className="mt-4">
          <GroupDelete />
        </div>
      </div>
    </div>
  );
};
