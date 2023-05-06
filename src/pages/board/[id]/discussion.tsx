import { BoardHeading } from "@/components/Board/BoardHeaidng";
import { DiscussionCreate } from "@/components/Discussion/DiscussionCreate";

import { LayoutHeader } from "@/components/Layout/Header";
import { LayoutFooter } from "@/components/Layout/LayoutFooter";
import { useRouter } from "next/router";

const BoardDiscussion = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <LayoutHeader />
      <div className="min-h-[calc(100vh_-_140px)]">
        <BoardHeading />
        <div className="mt-14 mx-auto max-w-[1140px] w-full px-5 sm:px-7">
          <div className=" max-w-[800px] mx-auto">
            <DiscussionCreate boardId={id} />
          </div>
        </div>
      </div>
      <LayoutFooter />
    </>
  );
};

export default BoardDiscussion;
