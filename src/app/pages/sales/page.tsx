"use client";

import React from "react";
import Menu from "../../components/menu/page";
import styles from "../../components/menu/menu.module.css"; // Importação do CSS como módulo
import { useSession } from "next-auth/react";

function Sales() {
  const { data: session, status } = useSession();

  
  return (
    <div>
      <Menu />
      <div className={styles.content}>
        {/* O conteúdo da página vai aqui */}
        <div className={styles.layout}>
          <h1>Vendas</h1>
         
        </div>
      </div>
    </div>
  );
}

export default Sales;
