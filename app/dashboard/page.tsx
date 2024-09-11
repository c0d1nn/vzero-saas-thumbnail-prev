import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation"
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import YouTubeThumbnailPreviewer from '@/components/youtube-thumbnail-previewer'
import { unstable_noStore } from "next/cache"
import prisma from "@/lib/db";

async function getData(userId: string) {
  unstable_noStore();
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      Subscription: {
        select: {
          status: true,
        },
      },
    },
  });

  return data;
}


export default async function Dashboard() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await getData(user?.id as string);

 
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">
        Welcome, {user?.given_name || 'User'}!
      </h1>
      {data?.Subscription?.status === "active" ? (
        <YouTubeThumbnailPreviewer />
      ) : (
        <div className="text-center">
          <p className="mb-4">You don't have an active subscription. Please subscribe to access the YouTube Thumbnail Previewer.</p>
          <Link href="/pricing">
            <Button>View Pricing</Button>
          </Link>
        </div>
      )}
    </div>
  )
}