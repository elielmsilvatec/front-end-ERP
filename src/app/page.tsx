"use client";

import Link from "next/link";
import { useRouter } from "next/navigation"; // Use o router específico do App Router
import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css"; // Certifique-se de que seus estilos globais sejam importados após o Bootstrap
import Menu from "./components/menu/page";
import styles from "./components/menu/menu.module.css"; // Importação do CSS como módulo
import { useAuth } from "@/app/api/auth";


const page = () => {
  useAuth();
  const { user, loggedIn } = useAuth();
  const router = useRouter(); // Adicionando o useRouter para o redirecionamento
  
  // useEffect(() => {
  //   const user = localStorage.getItem('user');
    
  //   if (user) {
  //     const parsedUser = JSON.parse(user); // Converte a string em objeto
  //     console.log(parsedUser.email); // Acessa o email do usuário
  //   }
  //   if(user == ''){
  //     router.push('pages/login/login') // Redirecionando o usuário para /home
  //   }
  // }, []); // Não se esqueça de passar o array vazio para rodar o useEffect apenas uma vez
  
  return (
    <div>
      <Menu />
      <div className={styles.content}>
        <div className={styles.layout}>
          {/* O conteúdo da página vai aqui */}

          <h1>Dashbords  {user ? user.nome : ''}</h1>

          <p>
            Bem-vindo ao nosso site! Aqui você encontrará informações sobre
            nossos produtos e serviços.
          </p>

          <p>
            Um sistema de ERP, ou Enterprise Resource Planning, é uma solução de
            software que integra e gerencia as principais funções de uma
            empresa, como finanças, contabilidade, recursos humanos, vendas,
            compras, estoque e produção. Ele fornece uma visão abrangente e em
            tempo real das operações da empresa, permitindo uma melhor tomada de
            decisões e eficiência nos processos.
          </p>

          <p>
            Um sistema de ERP é projetado para centralizar e automatizar as
            atividades empresariais, eliminando a necessidade de múltiplos
            sistemas isolados e fluxos de trabalho manuais. Ele permite que as
            informações sejam compartilhadas entre os diferentes departamentos,
            melhorando a comunicação interna e a colaboração entre as equipes.
          </p>

          <p>
            Além disso, um sistema de ERP oferece recursos avançados de
            relatórios e análises, permitindo que os gestores tenham uma visão
            detalhada do desempenho da empresa. Isso facilita a identificação de
            áreas de melhoria, a otimização de processos e a identificação de
            oportunidades de crescimento.
          </p>

          <p>
            Um sistema de ERP também pode ser personalizado de acordo com as
            necessidades específicas de uma empresa. Ele pode ser adaptado para
            atender a requisitos regulatórios, fluxos de trabalho específicos do
            setor e integração com outros sistemas existentes. Com a
            implementação de um sistema de ERP eficiente, as empresas podem
            melhorar sua eficiência operacional, reduzir custos, aumentar a
            produtividade e impulsionar o crescimento.
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
