import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextApiRequest, NextApiResponse } from "next";

const GroupMembersApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const supabase = createServerSupabaseClient({ req, res });

  if (req.method === "GET") {
    const groupId = req.query.id;
    const { data: memberData, error: memberError } = await supabase
      .from("group_members")
      .select("user_id, role")
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

    if (profileError) {
      return res.status(401).json({ message: profileError });
    }

    const mergedArray = profileData.map((profile) => {
      const matchingGroupMember = memberData.find((member) => member.user_id === profile.id);

      if (matchingGroupMember) {
        return {
          ...profile,
          role: matchingGroupMember.role,
        };
      }

      return profile;
    });

    return res.status(200).json(mergedArray);
  }
};

export default GroupMembersApi;
