import ProfileLayout from '../../../layouts/ProfileLayout'

export const metadata = {
    title: 'پروفایل',
  }
export default function Layout({ children }) {
    return (
        <ProfileLayout>
            {children}
        </ProfileLayout>
    );
}