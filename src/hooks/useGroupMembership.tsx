import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";

type Hooks = {
  isMember: boolean;
  isAdmin: boolean;
  isLoading: boolean;
};

export const useGroupMembership = (groupId: string): Hooks => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [isMember, setIsMember] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkMembership = async () => {
      const { data: memberData, error } = await supabase
        .from("group_members")
        .select("user_id, role")
        .eq("group_id", groupId);

      if (error) {
        setIsLoading(false);
        return;
      }

      const memberIds = memberData?.map((member) => member.user_id);

      if (memberIds?.includes(user!.id)) {
        setIsMember(true);

        // ルールのチェック
        const memberAdmin =
          memberData.find((member) => member.user_id === user!.id)!.role === "admin";

        setIsAdmin(memberAdmin);
      }
      setIsLoading(false);
    };

    if (groupId && user?.id) {
      checkMembership();
    }
  }, [groupId, user, supabase]);

  return { isMember, isAdmin, isLoading };
};
