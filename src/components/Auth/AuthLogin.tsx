import { FormEvent, useRef } from 'react'
import { useRouter } from 'next/router'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import Link from 'next/link'

export const AuthLogin = () => {
  const supabase = useSupabaseClient()
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const router = useRouter()
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithPassword({
      email: emailRef.current!.value,
      password: passwordRef.current!.value,
    })

    if (error) {
      alert(error.message)
      return
    }

    router.push('/dashboard')
  }

  return (
    <>
      <form className="mt-10" onSubmit={handleSubmit}>
        <div className="space-y-5">
          <dl>
            <dd className="text-sm">メールアドレス</dd>
            <dd className="mt-2">
              <input
                type="text"
                placeholder="mail@example.com"
                required
                ref={emailRef}
                className="w-full py-2.5 px-3 border border-[#d0d7de] rounded bg-white"
              />
            </dd>
          </dl>
          <dl>
            <dd className="text-sm">パスワード</dd>
            <dd className="mt-2">
              <input
                type="password"
                required
                ref={passwordRef}
                className="w-full py-2.5 px-3 border border-[#d0d7de] rounded bg-white"
              />
            </dd>
          </dl>
        </div>
        <div className="text-center mt-8">
          <button className="w-full inline-block py-3 text-sm rounded text-white bg-[#222] hover:bg-[#555]">
            ログイン
          </button>
        </div>
      </form>
      <div className="mt-5 text-center">
        <Link
          href="/auth/login"
          className="text-[12px] text-[#555] hover:underline"
        >
          パスワードを忘れた方はこちら
        </Link>
      </div>
      <div className="text-center mt-10">
        <Link
          href="/auth/signup"
          className="w-full inline-block py-3 text-sm rounded border border-[#222] bg-white hover:bg-[#f5f5f5]"
        >
          ユーザー登録はこちらから
        </Link>
      </div>
    </>
  )
}
