import { Layout } from "@/components/Layout";
import { BoardNotes } from "@/components/Board/BoardNotes";
import { BoardHeading } from "@/components/Board/BoardHeaidng";
import { BoardAddNote } from "@/components/Board/BoardAddNote";
import { LayoutContainer } from "@/components/Layout/LayoutContainer";

const BoardId = () => {
  return (
    <Layout>
      <BoardHeading />
      <LayoutContainer classes="py-14">
        <div className=" max-w-[800px] mx-auto">
          <BoardNotes />
          <div className="mt-5">
            <BoardAddNote />
          </div>
        </div>
      </LayoutContainer>
    </Layout>
  );
};

export default BoardId;
