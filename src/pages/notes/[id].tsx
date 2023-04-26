import { Loading } from "@/components/Common/Loading";
import { Layout } from "@/components/Layout";
import { useRouter } from "next/router";

const NoteId = () => {
  const router = useRouter();

  if (!router.query) {
    return <Loading />;
  }

  return (
    <Layout>
      <div className=" max-w-[800px] mx-auto">
        <div>noteid</div>
      </div>
    </Layout>
  );
};

export default NoteId;
