import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Menu from "./components/menu/page";
import styles from "./components/menu/menu.module.css"; // Importação do CSS como módulo
// importação dos icones
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Importar CSS dos ícones

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ConstruERP",
  // description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
       <link rel="icon" href="/icon/perfil3.jpeg" />
      <body className={inter.className}>
    
          {/* O conteúdo da página vai aqui */}
          {children}
       
      </body>
    </html>
  );
}
