import { AuthLayout } from "@/components/Auth/AuthLayout";
import { AuthRegister } from "@/components/Auth/AuthRegister";

const Register = () => {
  return (
    <AuthLayout title="ユーザー登録">
      <AuthRegister />
    </AuthLayout>
  );
};

export default Register;
