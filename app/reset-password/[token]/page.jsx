import ResetPasswordPage from "../../../components/pages/user/ResetPassPage";

export const metadata = {
    title: 'تغییر رمز عبور',
  }
const ResetPassword = ({ params }) => {
   return <ResetPasswordPage token={params}/>
}
export default ResetPassword;