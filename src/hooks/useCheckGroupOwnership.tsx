import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";

type Hooks = {
  isOwnership: boolean;
  isLoading: boolean;
};

export const useCheckGroupOwnership = (groupId: string): Hooks => {
  const user = useUser();
  const supabase = useSupabaseClient();
  const [isOwnership, setIsOwnership] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkOwnerShip = async () => {
      const { data, error } = await supabase
        .from("groups")
        .select("owner_id")
        .eq("id", groupId)
        .single();

      if (error) {
        alert(error.message);
        setIsLoading(false);
        return;
      }

      if (data!.owner_id === user!.id) {
        setIsOwnership(true);
      }
      setIsLoading(false);
    };

    if (groupId && user?.id) {
      checkOwnerShip();
    }
  }, [groupId, user, supabase]);

  return { isOwnership, isLoading };
};
