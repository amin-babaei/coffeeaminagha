import {notFound} from "next/navigation"

export const metadata = {
    title: 'صفحه مورد نظر یافت نشد',
  }
export default function NotFoundCatchAll() {
  notFound()
  return null
}