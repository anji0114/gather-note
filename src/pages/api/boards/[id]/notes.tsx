import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextApiRequest, NextApiResponse } from "next";

const BoardNotesApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const supabase = createServerSupabaseClient({ req, res });

  if (req.method === "GET") {
    const boardId = req.query.id;
    // ボードとノートの中間テーブルの取得
    const { data: idData, error: idError } = await supabase
      .from("board_notes")
      .select("note_id")
      .eq("board_id", boardId);

    if (idError) {
      return res.status(401).json({ message: idError });
    }

    //　中間テーブルをもとにノートを取得
    const { data: notesData, error: notesError } = await supabase
      .from("notes")
      .select("*")
      .in(
        "id",
        idData.map((id) => id.note_id)
      )
      .eq("deleted_flag", false);

    if (notesError) {
      return res.status(401).json({ message: notesError });
    }

    // フォルダーの取得
    const folderIds = notesData.map((note) => note.folder_id);
    const { data: foldersData, error: foldersError } = await supabase
      .from("folders")
      .select("user_id, id")
      .in(
        "id",
        folderIds.map((id) => id)
      )
      .eq("deleted_flag", false);

    if (foldersError) {
      return res.status(401).json({ message: foldersError });
    }

    // noteにユーザーIDを持たせる
    const notesWithFoldersData = notesData.map((note) => {
      const folderId = note.folder_id;
      const folder = foldersData.find((folder) => folder.id === folderId);
      const user_id = folder ? folder.user_id : null;

      return { ...note, user_id };
    });

    return res.status(200).json(notesWithFoldersData);
  }
};

export default BoardNotesApi;
