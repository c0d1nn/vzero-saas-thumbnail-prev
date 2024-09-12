import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { revalidatePath, unstable_noStore as noStore } from "next/cache";
import prisma from "@/lib/db";
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { SubmitButton } from '@/components/Submitbuttons'
import Link from 'next/link';

async function getData(userId: string) {
  noStore();
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      name: true,
      email: true,
      channelName: true,
    },
  });

  return data;
}

export default async function SettingsPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await getData(user?.id as string);

  async function postData(formData: FormData) {
    "use server";

    const name = formData.get("name") as string;
    const channelName = formData.get("channelName") as string;

    await prisma.user.update({
      where: {
        id: user?.id,
      },
      data: {
        name: name ?? undefined,
        channelName: channelName ?? undefined,
      },
    });

    revalidatePath("/", "layout");
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8">Account Settings</h1>
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Channel Settings</CardTitle>
            <CardDescription>Update your channel name here.</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={postData} className="space-y-4">
              <div>
                <Label htmlFor="channelName">Channel Name</Label>
                <Input
                  id="channelName"
                  type="text"
                  name="channelName"
                  defaultValue={data?.channelName ?? undefined}
                  placeholder="Enter your channel name"
                  className="mt-1"
                />
              </div>
              <SubmitButton />
            </form>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Subscription Management</CardTitle>
            <CardDescription>Manage your subscription and billing details.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/pricing" passHref>
              <Button 
                variant="default" 
                className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
              >
                Manage Subscription
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}