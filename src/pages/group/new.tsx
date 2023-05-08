import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import TextareaAutosize from "react-textarea-autosize";

import { Layout } from "@/components/Layout";
import { LayoutContainer } from "@/components/Layout/LayoutContainer";
import { useState } from "react";

const GroupNewPage = () => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleCreateGroup = async () => {
    const { data: groupData, error: groupError } = await supabase
      .from("groups")
      .insert({
        name: name,
        description: description,
        owner_id: user!.id,
      })
      .select()
      .single();

    if (groupError) {
      alert(groupError.message);
      return;
    }

    const { data: memberData, error: memberError } = await supabase
      .from("group_members")
      .insert({
        group_id: groupData.id,
        user_id: user!.id,
        role: "manager",
      })
      .select();

    if (memberError) {
      alert(memberError.message);
      return;
    }

    router.push(`/group/${groupData.id}`);
  };

  return (
    <Layout classes="py-20">
      <LayoutContainer>
        <div className="max-w-[700px] mx-auto">
          <h2 className="text-xl font-bold">新しいグループを作成する</h2>
          <div className="mt-5 pt-5 border-t border-[#eee]">
            <label className="pl- w-full inline-block font-medium">グループ名</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="mt-2 p-2 w-full max-w-[600px] border border-[#D0D7DE] rounded outline-none"
            />
          </div>
          <div className="mt-5">
            <label className="pl-[2px] w-full inline-block font-medium">グループ説明文</label>
            <TextareaAutosize
              minRows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 p-2 w-full resize-none border border-[#D0D7DE] rounded outline-none"
            />
          </div>
          <div className="pt-5 mt-5 text-right border-t border-[#D0D7DE] ">
            <button
              className={`px-4 py-2.5 rounded text-sm font-medium text-white  ${
                name ? "bg-[#4e6bb4] hover:opacity-75" : "bg-gray-400 cursor-not-allowed"
              }`}
              onClick={handleCreateGroup}
              disabled={name ? false : true}
            >
              グループを作成
            </button>
          </div>
        </div>
      </LayoutContainer>
    </Layout>
  );
};

export default GroupNewPage;
