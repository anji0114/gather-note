import { GroupLayout } from "@/components/Group/GroupLayout";
import { Layout } from "@/components/Layout";
import { useRouter } from "next/router";

const GroupBoardPage = () => {
  const router = useRouter();
  console.log(router.query.id);

  return (
    <Layout>
      <GroupLayout>
        <div>ボード</div>
      </GroupLayout>
    </Layout>
  );
};

export default GroupBoardPage;
