import { NextPage } from "next";
import { AuthLayout } from "@/components/Auth/AuthLayout";
import { AuthLogin } from "@/components/Auth/AuthLogin";
import { Meta } from "@/components/Common/Meta";

const Login: NextPage = () => {
  return (
    <>
      <Meta pageTitle="ログイン" />
      <AuthLayout title="ログイン">
        <AuthLogin />
      </AuthLayout>
    </>
  );
};

export default Login;
