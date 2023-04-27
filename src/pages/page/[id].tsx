import { useUser } from "@supabase/auth-helpers-react";
import useSWR from "swr";
import { useRouter } from "next/router";

const PageId = () => {
  const router = useRouter();
  const user = useUser();

  const { data, isLoading } = useSWR(router.query.id ? `/api/pages/${router.query.id}` : null);

  return <div>ページ</div>;
};

export default PageId;
