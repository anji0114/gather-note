import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextApiRequest, NextApiResponse } from "next";

const PagesIdApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const supabase = createServerSupabaseClient({ req, res });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.id) {
    return res.status(403).json({ message: "403: User is not logged in" });
  }

  if (req.method === "GET") {
    const pageId = req.query.id;
    const { data, error } = await supabase.from("pages").select("*").eq("id", pageId).single();

    if (error) {
      return res.status(401).json({ message: error });
    }

    return res.status(200).json(data);
  }
};

export default PagesIdApi;
