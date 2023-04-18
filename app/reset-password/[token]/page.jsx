import ResetPasswordPage from "../../../components/pages/ResetPassPage";

export const metadata = {
    title: 'تغییر رمز عبور',
  }
const ResetPassword = ({ params }) => {
   return <ResetPasswordPage token={params}/>
}
export default ResetPassword;