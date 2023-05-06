import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextApiRequest, NextApiResponse } from "next";

const BoardNotesApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const supabase = createServerSupabaseClient({ req, res });

  if (req.method === "GET") {
    const boardId = req.query.id;
    const { data: idData, error: idError } = await supabase
      .from("board_notes")
      .select("note_id")
      .eq("board_id", boardId);

    if (idError) {
      return res.status(401).json({ message: idError });
    }

    const { data: notesData, error: notesError } = await supabase
      .from("notes")
      .select("*")
      .in(
        "id",
        idData.map((id) => id.note_id)
      )
      .eq("deleted_flag", false);

    return res.status(200).json(notesData);
  }
};

export default BoardNotesApi;
