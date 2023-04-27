import { FC } from "react";
import { useRouter } from "next/router";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";

export const PageHeader: FC<{ handleUpdate: () => void }> = ({ handleUpdate }) => {
  const router = useRouter();

  return (
    <header className="py-5 border-b border-[#d0d7de]">
      <div className="max-w-[1140px] w-full mx-auto px-7">
        <div className="flex items-center justify-between">
          <button onClick={router.back} className="flex items-center gap-1 hover:opacity-75">
            <ChevronLeftIcon className="w-5" />
            <span className="text-sm font-medium pb-[1px]">前に戻る</span>
          </button>
          <button
            className="py-2 px-8 text-sm font-medium rounded bg-[#222] text-white hover:bg-[#555]"
            onClick={handleUpdate}
          >
            保存する
          </button>
        </div>
      </div>
    </header>
  );
};
