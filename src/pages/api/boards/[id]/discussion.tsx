import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextApiRequest, NextApiResponse } from "next";

const BoardDiscussionsApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const supabase = createServerSupabaseClient({ req, res });

  if (req.method === "GET") {
    const boardId = req.query.id;

    const { data: discussionData, error: discussionError } = await supabase
      .from("discussions")
      .select("*")
      .eq("board_id", boardId)
      .order("created_at", { ascending: false });

    if (discussionError) {
      return res.status(401).json({ message: discussionError });
    }

    return res.status(200).json(discussionData);
  }
};

export default BoardDiscussionsApi;
