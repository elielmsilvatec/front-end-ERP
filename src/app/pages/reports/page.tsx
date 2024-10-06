import React from "react";

import Menu from "../../components/menu/page";
import styles from "../../components/menu/menu.module.css"; // Importação do CSS como módulo
function Reports() {
  return (
    <div>
      <Menu />
      <div className={styles.content}>
        {/* O conteúdo da página vai aqui */}
        <div className={styles.layout}>
          <h1>Relatórios</h1>
        </div>
      </div>
    </div>
  );
}

export default Reports;
