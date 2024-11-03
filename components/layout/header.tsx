'use client';

import { useState } from 'react';
import { LogOut, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { useEffect } from "react";

export function Header() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/login');
    toast.success('Logged out successfully');
  };


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


    <header className="border-bottom bg-white">
      <div className="d-flex align-items-center justify-content-between px-4 h-16">
        <div className="d-flex align-items-center">
          {/* <h1 className="me-4">Meu Sistema</h1> Conteúdo à esquerda */}
        </div>
        <div className="d-flex align-items-center">
          {/* <a
            className="btn btn-ghost rounded-circle h-10 w-10 me-2"
            href="#"
          >
            <img
              src="https://github.com/shadcn.png"
              className="rounded-circle"
              alt="Profile Picture"
              style={{ width: '100%', height: '100%' }}
            />
          </a> */}
          <div className="d-flex align-items-center">
            <a
              className="btn btn-link text-gray-700 me-2 d-flex align-items-center"
              href="#"
              style={{ textDecoration: "none" }}
            >
              <User className="me-2 h-4 w-4" /> 
              {/* Perfil */}
              {session.user?.name ? session.user.name : "Profile"}

            </a>
            <a
              className="btn btn-link text-gray-700 d-flex align-items-center"
              href="#"
              onClick={handleLogout}
              style={{ textDecoration: "none" }}
            >
              <LogOut className="me-2 h-4 w-4" /> Sair
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
