import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import styles from "./menu.module.css"; // Importação do CSS como módulo
import { useAuth } from "@/app/api/auth";
import React, { useEffect, useState } from "react";
import api from "@/app/api/api";

export default function Header() {
  useAuth();
  const { user, loggedIn } = useAuth();
  // para deslogar o usuario
  const handleLogout = async () => {
    try {
      // Faz a requisição para a rota de logout no backend
      await api.post("/user/logout", {}, { withCredentials: true });
      // Redireciona o usuário para a tela de login após o logout
      window.location.href = "/pages/login/login";
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
          integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/sweetalert2@11.7.3/dist/sweetalert2.min.css"
        />
      </Head>

      <div className={styles.menu}>
        <div className={styles.logo}>
          <Image
            src="/icon/perfil3.jpeg"
            alt="logo"
            width={50}
            height={50}
            style={{
              borderRadius: "50%",
              border: "2px solid #000",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          />
          <h4 className={styles.logoText}>ConstruERP</h4>
        </div>
        <ul>
          <li id="home">
            <Link href="/">
              <i className="bi bi-house-door"></i> Home
            </Link>
          </li>
          <li id="produtos">
            <Link href="/pages/product/list">
              <i className="bi bi-box-seam"></i> Produtos
            </Link>
          </li>
          <li id="clientes">
            <Link href="/pages/client/list">
              <i className="bi bi-people"></i> Clientes
            </Link>
          </li>
          <li id="pedidos">
            <Link href="/pages/requests">
              <i className="bi bi-cart-check"></i> Pedidos
            </Link>
          </li>
          <li id="vendas">
            <Link href="/pages/sales">
              <i className="bi bi-credit-card"></i> Vendas
            </Link>
          </li>
          <li id="entrega">
            <Link href="/pages/delivery">
              <i className="bi bi-truck"></i> Entregas
            </Link>
          </li>
          <li id="relatorio">
            <Link href="/pages/reports">
              <i className="bi bi-clipboard-data"></i> Relatórios
            </Link>
          </li>
          <li id="financeiro">
            <Link href="/pages/financial">
              <i className="bi bi-credit-card"></i> Financeiro
            </Link>
          </li>
        
          <li>
            <Link href={""} onClick={handleLogout}>
              <i className="bi bi-arrow-return-right"></i> Sair
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
