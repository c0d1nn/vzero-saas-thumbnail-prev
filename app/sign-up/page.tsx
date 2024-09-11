import { getKindeServerSession, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function SignUp() {
  const { isAuthenticated } = getKindeServerSession();
  if (await isAuthenticated()) {
    redirect("/dashboard");
  }

return (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <div className="p-8 bg-white rounded-shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Sign Up</h1>
        <RegisterLink postLoginRedirectURL="/dashboard">Sign up</RegisterLink>
    </div>
  </div>
);
}