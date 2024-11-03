// DASHBOARD-LEYOUT.TSX
'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Header } from './header';
import { Sidebar } from './sidebar';
import { useEffect } from 'react';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  // useEffect(() => {
  //   if (status === 'unauthenticated') {
  //     router.push('/login');
  //   }
  // }, [status]); 

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4">
          {children}
        </main>
      </div>
    </div>
  );
}