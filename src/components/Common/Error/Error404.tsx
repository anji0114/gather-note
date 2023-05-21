import Link from "next/link";
import { FC } from "react";

export const Error404: FC<{ text?: string }> = ({ text }) => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-[#fdfeff]">
      <div className=" absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] ">
        <p className="text-center">{text ? text : "404 - page not found"}</p>
        <p className="text-center mt-4">
          <Link
            href="/dashboard"
            className="underline underline-offset-2 text-lg hover:no-underline"
          >
            トップに戻る
          </Link>
        </p>
      </div>
    </div>
  );
};
