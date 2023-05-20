import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextApiRequest, NextApiResponse } from "next";

const GroupsApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const supabase = createServerSupabaseClient({ req, res });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.id) {
    return res.status(403).json({ message: "403: User is not logged in" });
  }

  if (req.method === "GET") {
    // group_membersテーブルからログインuserが属するgroupのidを取得
    const { data: groupIds, error: groupIdsError } = await supabase
      .from("group_members")
      .select("group_id")
      .eq("user_id", user!.id)
      .order("created_at", { ascending: false });

    if (groupIdsError) {
      return res.status(401).json({ message: groupIdsError });
    }

    // groupIdsを元にgroupを取得
    const { data: groupsData, error } = await supabase
      .from("groups")
      .select("*")
      .in(
        "id",
        groupIds.map((id) => id.group_id)
      );

    if (error) {
      return res.status(401).json({ message: error });
    }

    return res.status(200).json(groupsData);
  }
};

export default GroupsApi;
