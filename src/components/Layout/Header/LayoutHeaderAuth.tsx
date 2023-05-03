import Link from "next/link";
import React from "react";

export const LayoutHeaderAuth = () => {
  return (
    <div className="pt-1.5 sm:pt-0">
      <Link
        href="/auth/login"
        className="text-[12px] sm:text-sm font-medium underline-offset-2 hover:underline"
      >
        ログイン
      </Link>
      <Link
        href="/auth/register"
        className="text-[12px] sm:text-sm inline-block ml-4 sm:ml-5 py-2 sm:py-2.5 px-5 sm:px-6 bg-[#222] text-white rounded hover:bg-[#555]"
      >
        ユーザー登録
      </Link>
    </div>
  );
};
