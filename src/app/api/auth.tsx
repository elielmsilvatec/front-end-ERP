// utils/auth.js

'use client'

import api from "@/app/api/api";
import { useRouter } from "next/navigation"; 
import { useEffect, useState, useCallback } from "react";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

  // Função para buscar as informações da sessão
  const fetchSessionInfo = useCallback(async () => {
    try {
      const response = await api.get("http://localhost:5000/session-info", {
        withCredentials: true,
      });
      if (response.data.loggedIn) {
        setUser(response.data.user);
        console.log(response.data.user)
        setLoggedIn(true);
      } else {
        router.push("/pages/login/login"); // Se não estiver logado, redireciona para a página de login
      }
    } catch (error) {
      console.error("Erro ao buscar informações da sessão:", error);
      router.push("/pages/login/login"); // Em caso de erro, redireciona para a página de login
    }
  }, []); // A dependência vazia garante que a função seja memorizada apenas uma vez

  useEffect(() => {
    fetchSessionInfo();
  }, []); // Agora, a dependência vazia garante que o useEffect seja executado apenas uma vez na montagem do componente

  return { user, loggedIn };
};












// // utils/auth.js

// 'use client'

// import api from "@/app/api/api";
// import { useRouter } from "next/navigation"; // Use o router específico do App Router
// import { useEffect, useState } from "react";

// export const useAuth = () => {
//   const [user, setUser] = useState(null);
//   const [loggedIn, setLoggedIn] = useState(false);
//   const router = useRouter();

//   // Função para buscar as informações da sessão
//   const fetchSessionInfo = async () => {
//     try {
//       const response = await api.get("http://localhost:5000/session-info", {
//         withCredentials: true,
//       });
//       if (response.data.loggedIn) {
//         setUser(response.data.user);
//         console.log(response.data.user)
//         setLoggedIn(true);
//       } else {
//         router.push("/pages/login/login"); // Se não estiver logado, redireciona para a página de login
//       }
//     } catch (error) {
//       console.error("Erro ao buscar informações da sessão:", error);
//       router.push("/pages/login/login"); // Em caso de erro, redireciona para a página de login
//     }
//   };

//   useEffect(() => {
//     fetchSessionInfo();
//   }, [fetchSessionInfo]);

//   return { user, loggedIn };
// };









// // utils/auth.js
// import api from "@/app/api/api";
// import { useRouter } from "next/navigation"; // Use o router específico do App Router
// import { useEffect, useState } from "react";

// export const useAuth = () => {
//   const [user, setUser] = useState(null);
//   const [loggedIn, setLoggedIn] = useState(false);
//   const router = useRouter();

//   // Função para buscar as informações da sessão
//   const fetchSessionInfo = async () => {
//     try {
//       const response = await api.get("http://localhost:5000/session-info", {
//         withCredentials: true,
//       });
//       if (response.data.loggedIn) {
//         setUser(response.data.user);
//         setLoggedIn(true);
//         // alert(response.data.user.email)
//       } else {
//         router.push("/pages/login/login"); // Se não estiver logado, redireciona para a página de login
//       }
//     } catch (error) {
//       console.error("Erro ao buscar informações da sessão:", error);
//       router.push("/pages/login/login"); // Em caso de erro, redireciona para a página de login
//     }
//   };

//   useEffect(() => {
//     fetchSessionInfo();
//   }, []);

//   if (!loggedIn) {
//     return <p>Carregando...</p>; // Pode exibir uma tela de carregamento enquanto verifica a sessão
//   }

//   // return isLoggedIn;
// };
