'use client';


import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
 
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-b from-zinc-900 to-zinc-950">
        <div className="w-full max-w-5xl items-center justify-between font-mono text-sm">
          <p className="text-zinc-400 text-center">Loading...</p>
        </div>
      </main>
    );
  }

  if (!session) {
    return null;
  }


  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Welcome {session.user?.name }!</h1>
      {/* <h1 className="text-4xl font-bold text-white mb-8 text-center">Welcome {session.user?.name }!</h1> */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      
      </div>
    </div>
  );
}