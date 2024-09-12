import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from 'next/link';
import prisma from "@/lib/db";
import { unstable_noStore as noStore } from "next/cache";
import { redirect } from "next/navigation";
import { StripePortal, StripeSubscriptionCreationButton } from "@/components/Submitbuttons";
import { getStripeSession, stripe } from "@/lib/stripe";

async function getData(userId: string) {
  noStore();
  const data = await prisma.subscription.findUnique({
    where: { userId: userId },
    select: {
      status: true,
      user: { select: { stripeCustomerId: true } },
    },
  });
  return data;
}

export default async function PricingPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await getData(user?.id as string);

  async function createSubscription() {
    "use server";

    const dbUser = await prisma.user.findUnique({
      where: {
        id: user?.id,
      },
      select: {
        stripeCustomerId: true,
      },
    });

    if (!dbUser?.stripeCustomerId) {
      throw new Error("Unable to get customer id");
    }

    const subscriptionUrl = await getStripeSession({
      customerId: dbUser.stripeCustomerId,
      domainUrl:
        process.env.NODE_ENV == "production"
          ? (process.env.PRODUCTION_URL as string)
          : "http://localhost:3000",
      priceId: process.env.STRIPE_PRICE_ID as string,
    });

    return redirect(subscriptionUrl);
  }

  async function createCustomerPortal() {
    "use server";
    const session = await stripe.billingPortal.sessions.create({
      customer: data?.user.stripeCustomerId as string,
      return_url:
        process.env.NODE_ENV === "production"
          ? (process.env.PRODUCTION_URL as string)
          : "http://localhost:3000/dashboard",
    });

    return redirect(session.url);
  }

  const backLink = user ? '/dashboard' : '/';

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Subscription Management
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Manage your subscription and billing details here.
          </p>
        </div>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>{data?.status === "active" ? "Current Subscription" : "No Active Subscription"}</CardTitle>
            <CardDescription>
              {data?.status === "active" 
                ? "You have an active subscription. Manage your plan and billing details below."
                : "You don't currently have an active subscription. Subscribe to access premium features."}
            </CardDescription>
          </CardHeader>
          {data?.status === "active" && (
            <CardContent>
              <form action={createCustomerPortal}>
                <StripePortal />
              </form>
            </CardContent>
          )}
        </Card>

        <div className="flex justify-center space-x-4">
          <Link href={backLink} passHref>
            <Button variant="outline" className="w-full sm:w-auto">
              Go Back
            </Button>
          </Link>
          {data?.status === "active" ? (
            <form action={createCustomerPortal}>
              <StripePortal />
            </form>
          ) : (
            <form className="w-full" action={createSubscription}>
              <StripeSubscriptionCreationButton />
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
