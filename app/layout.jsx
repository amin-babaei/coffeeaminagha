import '../styles/globals.css'
import Providers from "./Providers";

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
              {children}
          </Providers>
      </body>
    </html>
  );
}