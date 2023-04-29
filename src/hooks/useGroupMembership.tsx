import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";

type Hooks = {
  isMember: boolean;
  isLoading: boolean;
};

export const useGroupMembership = (groupId: string): Hooks => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [isMember, setIsMember] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkMembership = async (groupId: string) => {
      const { data: memberData, error } = await supabase
        .from("group_members")
        .select("user_id")
        .eq("group_id", groupId);

      const memberIds = memberData?.map((member) => member.user_id);
      if (memberIds?.includes(user?.id)) {
        setIsMember(true);
      }
      setIsLoading(false);
    };

    if (groupId && user?.id) {
      checkMembership(groupId);
    }
  }, [groupId, user]);

  return { isMember, isLoading };
};
