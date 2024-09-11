import { getKindeServerSession, LoginLink } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function SignIn() {
  const { isAuthenticated } = getKindeServerSession();
  if (await isAuthenticated()) {
    redirect("/dashboard");
  }

  return (
<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Sign In</h1>
        <LoginLink postLoginRedirectURL="/dashboard">Sign in</LoginLink>
      </div>
    </div>
  );
}

