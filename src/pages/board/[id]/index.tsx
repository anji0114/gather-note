import { LayoutHeader } from "@/components/Layout/Header";
import { BoardNotes } from "@/components/Board/BoardNotes";
import { BoardHeading } from "@/components/Board/BoardHeaidng";
import { LayoutFooter } from "@/components/Layout/LayoutFooter";
import { BoardAddNote } from "@/components/Board/BoardAddNote";

const BoardId = () => {
  return (
    <>
      <LayoutHeader />
      <div className="min-h-[calc(100vh_-_140px)]">
        <BoardHeading />
        <div className="mt-14 mx-auto max-w-[1140px] w-full px-5 sm:px-7">
          <div className=" max-w-[800px] mx-auto">
            <BoardNotes />
            <div className="mt-5">
              <BoardAddNote />
            </div>
          </div>
        </div>
      </div>
      <LayoutFooter />
    </>
  );
};

export default BoardId;
