import { FC } from "react";
import { useStore } from "@/store";
import { FolderEdit } from "@/components/Folder/FolderEdit";
import { FolderDelete } from "@/components/Folder/FolderDelete";

export const FolderHeading: FC = () => {
  const folder = useStore((state) => state.folder);

  return (
    <div className="pt-12 pb-5 bg-[#FCFCFC] border-b border-[#f0f0f0]">
      <div className="max-w-[1140px] w-full mx-auto px-5 md:px-7">
        <div className="max-w-[800px] mx-auto">
          <div className="flex justify-between">
            <h1 className="text-2xl md:text-3xl font-bold leading-tight w-[calc(100%_-_150px)]">
              {folder?.name}
            </h1>
            <div className="flex gap-2.5 h-[30px] mt-1">
              <FolderEdit />
              <FolderDelete />
            </div>
          </div>
          {folder?.description && <p className="mt-7">{folder.description}</p>}
        </div>
      </div>
    </div>
  );
};
