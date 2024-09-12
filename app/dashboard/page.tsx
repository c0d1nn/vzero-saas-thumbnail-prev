import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import YouTubeThumbnailPreviewer from '@/components/youtube-thumbnail-previewer'
import { unstable_noStore as noStore } from "next/cache"
import prisma from "@/lib/db";

async function getData(userId: string) {
  noStore();
  try {
    const data = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        channelName: true,
        Subscription: {
          select: {
            status: true,
          },
        },
      },
    });
    return data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
}

export default async function Dashboard() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  
  if (!user) {
    return <div>Loading...</div>; // Or redirect to login
  }

  const data = await getData(user?.id as string);

  return (
    <div className="w-full bg-background">
      {data?.Subscription?.status === "active" ? (
        <div className="w-full flex justify-center">
          <YouTubeThumbnailPreviewer userChannelName={data?.channelName as string}/>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="mb-4">You don't have an active subscription. Please subscribe to access the YouTube Thumbnail Previewer.</p>
          <Link href="/pricing">
            <Button>View Pricing</Button>
          </Link>
        </div>
      )}
    </div>
  )
}