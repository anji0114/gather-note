import { FormEvent, useRef } from "react";
import { useRouter } from "next/router";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { AuthLayout } from "@/components/Auth/AuthLayout";
import { AuthRegister } from "@/components/Auth/AuthRegister";

const Register = () => {
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
    const { error: profileError } = await supabase
      .from("profiles")
      .update({ name: nameRef.current!.value })
      .eq("id", signUpData.user!.id);

    if (profileError) {
      alert(profileError.message);
      return;
    }

    router.push("/dashboard");
  };
  return (
    <AuthLayout title="ユーザー登録">
      <AuthRegister />
    </AuthLayout>
  );
};

export default Register;
