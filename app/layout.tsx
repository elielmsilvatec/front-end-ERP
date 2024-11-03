import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { AuthProvider } from "@/providers/auth-provider";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Modern Login System',
  description: 'A beautiful and secure login system built with Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
      
        </AuthProvider>
      </body>
    </html>
  );
}