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

      if (data) {
        setIsInBoard(true);
      }
    };

    if (noteId) {
      checkInBoard();
      setIsLoading(false);
    }
  }, [noteId]);

  return { isInBoard, isLoading };
};
