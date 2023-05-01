import { GroupLayout } from "@/components/Group/GroupLayout";
import { Layout } from "@/components/Layout";
import { useRouter } from "next/router";

const GroupMemberPage = () => {
  const router = useRouter();
  console.log(router.query.id);

  return (
    <Layout>
      <GroupLayout>
        <div>メンバー</div>
      </GroupLayout>
    </Layout>
  );
};

export default GroupMemberPage;
