import Link from "next/link";
import { FC } from "react";

export const LayoutFooter: FC = () => {
  return (
    <footer className=" py-5 border-t border-[#d0d7de]">
      <div className="max-w-[1140px] w-full mx-auto px-7 flex justify-center gap-10">
        <Link
          href="https://next-portfolio-anji0114.vercel.app/about"
          target="_blank"
          className="text-sm hover:underline"
        >
          開発者
        </Link>
        <Link
          href="https://github.com/anji0114/mind-prompt"
          target="_blank"
          className="text-sm hover:underline"
        >
          GitHub
        </Link>
      </div>
    </footer>
  );
};
