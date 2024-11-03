"use client";

import { useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";


export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated") {
      router.push("/dashboard");
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
    <></>
  );
}
