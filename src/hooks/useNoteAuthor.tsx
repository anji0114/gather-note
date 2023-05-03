import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";

type Hooks = {
  isAuthor: boolean;
  isLoading: boolean;
};

export const useNoteAuthor = (folderId: string): Hooks => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [isAuthor, setIsAuthor] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkNoteAuthor = async () => {
      const { data: folderData, error: folderError } = await supabase
        .from("folders")
        .select("user_id")
        .eq("id", folderId)
        .single();

      if (folderError) {
        alert(folderError.message);
        return;
      }

      if (folderData?.user_id === user!.id) {
        setIsAuthor(true);
      }
      setIsLoading(false);
    };

    if (folderId && user?.id) {
      checkNoteAuthor();
    }
  });

  return {
    isAuthor,
    isLoading,
  };
};
