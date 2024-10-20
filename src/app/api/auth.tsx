// utils/auth.js
'use client';

import api from "@/app/api/api";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

  const fetchSessionInfo = useCallback(async () => {
    if (typeof window === 'undefined') {
      return; // Se estamos no servidor, não faz nada
    }

    try {
      const response = await api.get("https://data.colorado.gov/resource", {
        withCredentials: true,
      });

      if (response.data.loggedIn) {
        setUser(response.data.user);
        console.log(response.data.user);
        setLoggedIn(true);
      } else {
        router.push("/pages/login/login");
      }
    } catch (error) {
      console.error("Erro ao buscar informações da sessão:", error);
      router.push("/pages/login/login");
    }
  }, [router]);

  useEffect(() => {
    fetchSessionInfo();
  }, [fetchSessionInfo]);

  return { user, loggedIn };
}







// 'use client';

// import api from "@/app/api/api";
// import { useRouter } from "next/navigation"; 
// import { useEffect, useState, useCallback } from "react";

// export const useAuth = () => {
//   const [user, setUser] = useState(null);
//   const [loggedIn, setLoggedIn] = useState(false);
//   const router = useRouter();

//   const fetchSessionInfo = useCallback(async () => {
//     if (typeof window === 'undefined') {
//       return; // Se estamos no servidor, não faz nada
//     }
//     // http://localhost:5000/session-info
//     try {
//       const response = await api.get("https://data.colorado.gov/resource", {
//         withCredentials: true,
//       });
//       if (response.data.loggedIn) {
//         setUser(response.data.user);
//         console.log(response.data.user)
//         setLoggedIn(true);
//       } else {
//         router.push("/pages/login/login");
//       }
//     } catch (error) {
//       console.error("Erro ao buscar informações da sessão:", error);
//       router.push("/pages/login/login");
//     }
//   }, [router]);

//   useEffect(() => {
//     fetchSessionInfo();
//   }, [fetchSessionInfo]);

//   return { user, loggedIn };
// };






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
