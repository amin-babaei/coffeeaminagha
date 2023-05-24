import AdminLayout from "../../layouts/AdminLayout";

export const metadata = {
  title: 'ادمین',
}

export default async function Layout({ children }) {
  
  return (
    <AdminLayout>
      {children}
    </AdminLayout>
  );
}