import '../styles/globals.css'
import Providers from "./Providers";
import AuthUser from '../utils/auth/AuthUser'

export const metadata = {
  icons: {
      icon:'/images/favicon.ico',
  },
};  
export default async function RootLayout({ children }) {
  return (
    <html lang="fa-IR" dir="rtl">
      <body>
          <Providers>
            <AuthUser>
              {children}
            </AuthUser>
          </Providers>
      </body>
    </html>
  );
}