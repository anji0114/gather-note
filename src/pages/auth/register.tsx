import { AuthLayout } from "@/components/Auth/AuthLayout";
import { AuthRegister } from "@/components/Auth/AuthRegister";
import { Meta } from "@/components/Common/Meta";
import { NextPage } from "next";

const Register: NextPage = () => {
  return (
    <>
      <Meta pageTitle="ユーザー登録" />
      <AuthLayout title="ユーザー登録">
        <AuthRegister />
      </AuthLayout>
    </>
  );
};

export default Register;
