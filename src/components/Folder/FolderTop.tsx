import { FC, useState } from "react";
import { useStore } from "@/store";
import { FolderEdit } from "./FolderEdit";
import { Cog8ToothIcon } from "@heroicons/react/24/outline";

export const FolderTop: FC = () => {
  const folder = useStore((state) => state.folder);

  return (
    <>
      <div className="relative pr-24">
        <h1 className="text-2xl sm:text-4xl font-bold leading-tight">{folder?.name}</h1>
        <div className="absolute right-0 top-[1px] sm:top-2">
          <FolderEdit />
        </div>
      </div>
      <p className="mt-5 px-[2px]">{folder?.description}</p>
    </>
  );
};
