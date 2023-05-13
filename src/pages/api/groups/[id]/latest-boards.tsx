import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextApiRequest, NextApiResponse } from "next";

const LatestGroupBoardsApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const supabase = createServerSupabaseClient({ req, res });

  if (req.method === "GET") {
    const groupId = req.query.id;
    const { data: boardData, error: boardError } = await supabase
      .from("boards")
      .select("*")
      .eq("group_id", groupId)
      .order("created_at", { ascending: false })
      .range(0, 2);

    if (boardError) {
      return res.status(401).json({ message: boardError });
    }

    return res.status(200).json(boardData);
  }
};

export default LatestGroupBoardsApi;
