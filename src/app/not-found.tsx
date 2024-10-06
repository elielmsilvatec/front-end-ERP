// pages/not-found.tsx
"use client";
import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";
import Menu from "./components/menu/page";
import styles from "./components/menu/menu.module.css"; // Importação do CSS como módulo

const NotFoundPage = () => {
  return (
    <>
      <Menu />
      <div className={styles.content}>
        <div className={styles.layout}>
          <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
            <Head>
              <title>404: Página Não Encontrada</title>
            </Head>
            <div className="text-center">
              <h1 className="display-1 text-danger">404</h1>
              <h2 className="mb-4">Oops! Página não encontrada</h2>
              <p className="mb-4">
                Desculpe, a página que você está procurando não existe.
              </p>
              <a href="/" className="btn btn-success">
                Voltar para a Página Inicial
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
