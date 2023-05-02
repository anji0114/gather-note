import Link from "next/link";
import React from "react";

export const LayoutHeaderAuth = () => {
  return (
    <>
      <Link href="/auth/login" className="text-sm font-medium underline-offset-2 hover:underline">
        ログイン
      </Link>
      <Link
        href="/auth/register"
        className="text-sm inline-block ml-5 py-2.5 px-6 bg-[#222] text-white rounded hover:bg-[#555]"
      >
        ユーザー登録
      </Link>
    </>
  );
};
