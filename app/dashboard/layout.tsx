import { ReactNode } from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { unstable_noStore as noStore } from "next/cache";
import { LogOut, User } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

async function getData({
  email,
  id,
  firstName,
  lastName,
}: {
  email: string;
  id: string;
  firstName: string | undefined | null;
  lastName: string | undefined | null;
}) {
  noStore();
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      stripeCustomerId: true,
    },
  });

  if (!user) {
    const name = `${firstName ?? ""} ${lastName ?? ""}`;
    await prisma.user.create({
      data: {
        id: id,
        email: email,
        name: name,
      },
    });
  }

  if (!user?.stripeCustomerId) {
    const data = await stripe.customers.create({
      email: email,
    });

    await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        stripeCustomerId: data.id,
      },
    });
  }
}

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return redirect("/");
  }
  await getData({
    email: user.email as string,
    firstName: user.given_name as string,
    id: user.id as string,
    lastName: user.family_name as string,
  });

  return (
<div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
        </div>
        <nav className="mt-6">
          <Link href="/dashboard" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">
            Home
          </Link>
          <Link href="/dashboard/thumbnails" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">
            My Thumbnails
          </Link>
          <Link href="/dashboard/settings" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">
            Settings
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
        <div className="container mx-auto px-6 py-8">
          {/* Header */}
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Welcome, {user.given_name || 'User'}</h1>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <User className="mr-2 h-4 w-4" />
                Profile
              </Button>
              <Link href="/api/auth/logout">
                <Button variant="outline" size="sm">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </Link>
            </div>
          </header>

          {/* Page content */}
          {children}
        </div>
      </main>
    </div>
  );
}
