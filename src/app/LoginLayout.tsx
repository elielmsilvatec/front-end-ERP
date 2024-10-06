
import { Inter } from "next/font/google";
// import "./globals.css";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const inter = Inter({ subsets: ["latin"] });

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <link rel="icon" href="/icon/perfil3.jpeg" />
      <body className={inter.className}>
    {children}
      </body>
    </html>
  );
}
