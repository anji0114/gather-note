import { FormEvent, useRef } from "react";
import { useRouter } from "next/router";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";

export const AuthRegister = () => {
  const supabase = useSupabaseClient();
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: emailRef.current!.value,
      password: passwordRef.current!.value,
    });

    if (signUpError) {
      alert(signUpError.message);
      return;
    }

    // profileの登録
    const { data, error: profileError } = await supabase
      .from("profiles")
      .update({ name: nameRef.current!.value })
      .eq("id", signUpData.user!.id)
      .select();

    if (profileError) {
      alert(profileError.message);
      return;
    }

    router.push("/dashboard");
  };

  return (
    <>
      <form className="mt-10" onSubmit={handleSubmit}>
        <div className="space-y-5">
          <dl>
            <dd className="text-sm">ユーザーネーム</dd>
            <dd className="mt-2">
              <input
                type="text"
                placeholder="ユーザーネーム"
                ref={nameRef}
                required
                className="w-full py-2.5 px-3 border border-[#d0d7de] rounded bg-white"
              />
            </dd>
          </dl>
          <dl>
            <dd className="text-sm">メールアドレス</dd>
            <dd className="mt-2">
              <input
                type="text"
                placeholder="mail@example.com"
                ref={emailRef}
                required
                className="w-full py-2.5 px-3 border border-[#d0d7de] rounded bg-white"
              />
            </dd>
          </dl>
          <dl>
            <dd className="text-sm">パスワード</dd>
            <dd className="mt-2">
              <input
                type="password"
                ref={passwordRef}
                required
                className="w-full py-2.5 px-3 border border-[#d0d7de] rounded bg-white"
              />
            </dd>
          </dl>
        </div>
        <div className="text-center mt-10">
          <button className="w-full inline-block py-3 text-sm rounded text-white bg-[#222] hover:bg-[#555]">
            サインアップ
          </button>
        </div>
      </form>
      <div className="mt-5 text-center">
        <Link href="/auth/login" className="text-sm underline uppercase hover:opacity-75">
          ログインはこちらから
        </Link>
      </div>
    </>
  );
};
