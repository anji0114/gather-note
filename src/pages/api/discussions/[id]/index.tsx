import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextApiRequest, NextApiResponse } from "next";

const DiscussionsIdApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const supabase = createServerSupabaseClient({ req, res });

  if (req.method === "GET") {
    const discussionId = req.query.id;
    const { data, error } = await supabase
      .from("discussions")
      .select("*")
      .eq("id", discussionId)
      .single();

    if (!data) {
      return res.status(404).json({ message: "note not fond" });
    }

    if (error) {
      return res.status(401).json({ message: error });
    }

    return res.status(200).json(data);
  }
};

export default DiscussionsIdApi;
