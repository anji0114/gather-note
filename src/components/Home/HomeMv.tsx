import Link from "next/link";
import Image from "next/image";
import { useUser } from "@supabase/auth-helpers-react";

export const HomeMv = () => {
  const user = useUser();

  return (
    <div className="min-h-[calc(100vh_-_12rem_-_150px)] flex items-center justify-center">
      <div>
        <div className="text-center">
          <Image
            src="/logo.svg"
            alt="Prompt Note"
            width={300}
            height={70}
            className="inline-block"
          />
        </div>
        <p className="mt-6 text-center font-medium text-lg leading-6 ">
          1ページずつ、ノートを一緒に集める - GatherNote
        </p>
        <div className="flex mt-12 justify-center gap-5">
          {user ? (
            <Link
              className="w-40 inline-block text-center p-3 text-sm bg-[#222] text-white rounded hover:bg-[#555]"
              href="/dashboard"
            >
              ダッシュボード
            </Link>
          ) : (
            <Link
              className="w-40 inline-block text-center p-3 text-sm bg-[#222] text-white rounded hover:bg-[#555]"
              href="/auth/signup"
            >
              ユーザー登録
            </Link>
          )}
          <Link
            className="w-40 inline-block text-center p-3 text-sm rounded border border-[#222] bg-white hover:bg-[#eee]"
            href="https://github.com/anji0114/gather-note"
            target="_blank"
          >
            GitHub
          </Link>
        </div>
      </div>
    </div>
  );
};
