import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextApiRequest, NextApiResponse } from "next";

const NotesApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const supabase = createServerSupabaseClient({ req, res });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.id) {
    return res.status(403).json({ message: "403: User is not logged in" });
  }

  if (req.method === "GET") {
    const { data: foldersData, error: foldersError } = await supabase
      .from("folders")
      .select("id")
      .eq("user_id", user!.id);

    if (foldersError) {
      return res.status(401).json({ message: foldersError });
    }

    const { data: notesData, error: notesError } = await supabase
      .from("notes")
      .select("id, name")
      .in(
        "folder_id",
        foldersData?.map((folder) => folder.id)
      );

    return res.status(200).json(notesData);
  }
};

export default NotesApi;
