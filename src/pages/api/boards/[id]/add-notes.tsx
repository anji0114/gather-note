import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextApiRequest, NextApiResponse } from "next";

const BoardAddNotesApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const supabase = createServerSupabaseClient({ req, res });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.id) {
    return res.status(403).json({ message: "403: User is not logged in" });
  }

  if (req.method === "GET") {
    const boardId = req.query.id;

    const { data: foldersData, error: foldersError } = await supabase
      .from("folders")
      .select("id")
      .eq("user_id", user!.id);

    if (foldersError) {
      return res.status(401).json({ message: foldersError });
    }

    const { data: BoardNotesData, error: BoardNotesError } = await supabase
      .from("board_notes")
      .select("note_id")
      .eq("board_id", boardId);

    if (BoardNotesError) {
      return res.status(401).json({ message: BoardNotesError });
    }

    const boardNoteIds = BoardNotesData?.map((id) => id.note_id);

    const { data: notesData, error: notesError } = await supabase
      .from("notes")
      .select("id, name")
      .in(
        "folder_id",
        foldersData?.map((folder) => folder.id)
      )
      .not("id", "in", `(${boardNoteIds.join(",")})`)
      .eq("deleted_flag", false);

    return res.status(200).json(notesData);
  }
};

export default BoardAddNotesApi;
