import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";

export const useNoteInBoard = (noteId: string) => {
  const supabase = useSupabaseClient();
  const [isInBoard, setIsInBoard] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkInBoard = async () => {
      const { data, error } = await supabase.from("board_notes").select("*").eq("note_id", noteId);

      if (error) {
        alert(error.message);
      }

      if (data && data.length > 0) {
        setIsInBoard(true);
      }
      setIsLoading(false);
    };

    if (noteId) {
      checkInBoard();
    }
  }, [noteId]);

  return { isInBoard, isLoading };
};
