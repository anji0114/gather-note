import { BoardHeading } from "@/components/Board/BoardHeaidng";
import { DiscussionList } from "@/components/Discussion/DiscussionList";
import { Layout } from "@/components/Layout";
import { LayoutContainer } from "@/components/Layout/LayoutContainer";
import { PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";

const BoardDiscussion = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Layout>
      <BoardHeading />
      <LayoutContainer classes="py-14">
        <div className=" max-w-[800px] mx-auto">
          <DiscussionList />

          <Link
            href={`/board/${id}/discussion/new`}
            className="w-fit flex items-center mt-10 mx-auto py-2.5 px-5 gap-2 rounded bg-[#222] text-white hover:bg-[#555]"
          >
            <PlusIcon className="w-[18px] translate-y-[1px] " />
            <span className="text-sm inline-block">新規ディスカッション</span>
          </Link>
        </div>
      </LayoutContainer>
    </Layout>
  );
};

export default BoardDiscussion;
