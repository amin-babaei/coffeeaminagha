import { getServerSession } from "next-auth";
import AdminLayout from "../../layouts/AdminLayout";
import { redirect } from 'next/navigation'
import { authOptions } from '../../pages/api/auth/[...nextauth]'

export const metadata = {
  title: 'ادمین',
}

export default async function Layout({ children }) {
  const session = await getServerSession(authOptions)
  if (!session || !session.user.isAdmin) {
    redirect('/');
  }
  return (
    <AdminLayout>
      {children}
    </AdminLayout>
  );
}