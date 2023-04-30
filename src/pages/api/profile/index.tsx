import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextApiRequest, NextApiResponse } from "next";

const ProfileApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const supabase = createServerSupabaseClient({ req, res });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.id) {
    return res.status(403).json({ message: "403: User is not logged in" });
  }

  if (req.method === "GET") {
    const { data, error } = await supabase
      .from("profiles")
      .select("name, avatar_url")
      .eq("id", user!.id)
      .single();

    if (error) {
      return res.status(401).json({ message: error });
    }

    return res.status(200).json(data);
  }
};

export default ProfileApi;
