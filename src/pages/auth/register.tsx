import { AuthLayout } from "@/components/Auth/AuthLayout";
import { AuthRegister } from "@/components/Auth/AuthRegister";
import { NextPage } from "next";

const Register:NextPage = () => {
  return (
    <AuthLayout title="ユーザー登録">
      <AuthRegister />
    </AuthLayout>
  );
};

export default Register;
