import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextApiRequest, NextApiResponse } from "next";

const GroupsIdApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const supabase = createServerSupabaseClient({ req, res });

  if (req.method === "GET") {
    const groupId = req.query.id;
    const { data, error } = await supabase.from("groups").select("*").eq("id", groupId).single();

    if (error) {
      return res.status(401).json({ message: error });
    }

    return res.status(200).json(data);
  }
};

export default GroupsIdApi;
