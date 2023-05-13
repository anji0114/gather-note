import { Board } from "@/types";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextApiRequest, NextApiResponse } from "next";

const BoardIdApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const supabase = createServerSupabaseClient({ req, res });

  if (req.method === "GET") {
    const boardId = req.query.id;

    const { data: boardData, error: boardError } = await supabase
      .from("boards")
      .select("id, name, description, group_id, created_at")
      .eq("id", boardId)
      .returns<Board>()
      .single();

    if (boardError) {
      return res.status(401).json({ message: boardError });
    }

    return res.status(200).json(boardData);
  }
};

export default BoardIdApi;
