import { NextPage } from 'next'
import { AuthLayout } from '@/components/Auth/AuthLayout'
import { AuthLogin } from '@/components/Auth/AuthLogin'

const Login: NextPage = () => {
  return (
    <AuthLayout title="ログイン">
      <AuthLogin />
    </AuthLayout>
  )
}

export default Login
