import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextApiRequest, NextApiResponse } from "next";

const GroupMembersApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const supabase = createServerSupabaseClient({ req, res });

  if (req.method === "GET") {
    const groupId = req.query.id;
    const { data: memberData, error: memberError } = await supabase
      .from("group_members")
      .select("user_id")
      .eq("group_id", groupId);

    if (memberError) {
      return res.status(401).json({ message: memberError });
    }

    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .in(
        "id",
        memberData.map((id) => id.user_id)
      );

    return res.status(200).json(profileData);
  }
};

export default GroupMembersApi;
