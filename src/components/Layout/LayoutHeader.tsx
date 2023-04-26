import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

export const LayoutHeader = () => {
  const user = useUser();
  const supbase = useSupabaseClient();
  const router = useRouter();

  const logout = async () => {
    await supbase.auth.signOut();
    router.push("/auth/login");
  };

  return (
    <header className="py-5 border-b border-[#d0d7de]">
      <div className="max-w-[1140px] w-full mx-auto px-7">
        <div className="flex items-center justify-between">
          <Link href={!user ? "/" : "/dashboard"} className="inline-block">
            <Image src="/logo.svg" alt="Prompt Note" width={187} height={36} />
          </Link>
          <div className="flex items-center">
            {!user ? (
              <>
                <Link
                  href="/auth/login"
                  className="text-sm font-medium underline-offset-2 hover:underline"
                >
                  ログイン
                </Link>
                <Link
                  href="/auth/register"
                  className="text-sm font-medium inline-block ml-5 py-2.5 px-6 bg-[#222] text-white rounded hover:bg-[#555]"
                >
                  ユーザー登録
                </Link>
              </>
            ) : (
              <button
                className="text-sm font-medium underline-offset-2 hover:underline"
                onClick={logout}
              >
                ログアウト
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
