"use client";


import api from "@/app/api/api";
import { useState } from "react";
import LoginLayout from "../../../LoginLayout";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Use o router específico do App Router


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [error, setError] = useState('');
  const router = useRouter(); // Adicionando o useRouter para o redirecionamento

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/user/login', { email, senha }, { withCredentials: true });
      if (response.status === 200 && response.data.message === 'Login bem-sucedido') {
        router.push("/"); // Redireciona para a página home
      } else {
        setMensagem('Email ou senha incorretos.');
        router.push("/pages/login/login");
      }
    } catch (error) {
      setMensagem('Erro ao logar. Tente novamente mais tarde.');
    }
  };

  return (
    <LoginLayout>
      <Head>
        <title>Tela de Login</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
        />
        <link
          rel="shortcut icon"
          href="https://cdn-icons-png.flaticon.com/512/3700/3700776.png"
        />

        {/* Adiciona os scripts do Bootstrap JS e Popper.js */}
        <script
          src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"
          integrity="sha384-oBqDVmMz4fnFO9gybBa3yg3oZbwh/ScQsAP7AM1D5nxkSf5M0EBrt3El5pHIfjQ/"
          crossOrigin="anonymous"
        ></script>
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.min.js"
          integrity="sha384-NwlR6FkPY3vyA1pHuTFzAB+WrSRqD+NprZ5gHAflfZSr69p6v51M3WJq0fMA0a6F"
          crossOrigin="anonymous"
        ></script>
      </Head>

      <div className="d-flex align-items-center justify-content-center vh-100">
        <div
          className="card shadow-sm p-4"
          style={{ maxWidth: "400px", width: "100%" }}
        >
          <div className="card-body">
            <h5 className="card-title text-center mb-4">Tela de Login</h5>

            {/* Exibe a mensagem de erro ou sucesso aqui */}
            {mensagem && (
              <div className="alert alert-info" role="alert">
                {mensagem}
               
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label htmlFor="inputEmail" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="inputEmail"
                  placeholder="Digite seu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="inputPassword" className="form-label">
                  Senha
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="inputPassword"
                  placeholder="Digite sua senha"
                  required
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                />
              </div>

              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="rememberMeCheck"
                />
                <label className="form-check-label" htmlFor="rememberMeCheck">
                  Lembrar minha senha
                </label>
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Entrar
              </button>
            </form>
            <div className="text-center mt-3">
              <Link href="/pages/login/reset">Esqueci minha senha</Link>
              <br />
              <Link href="/pages/login/cadastro">Cadastre-se</Link>
            </div>
          </div>
        </div>
      </div>
    </LoginLayout>
  );
}
