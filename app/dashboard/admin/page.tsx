import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from 'next/navigation'

export default async function AdminDashboard() {
  const { getUser } = getKindeServerSession()
  const user = await getUser()
  
  if (user?.given_name !== 'admin') {
    redirect("/dashboard")
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <p>This is for admins</p>
    </div>
  )
}