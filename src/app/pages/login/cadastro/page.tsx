"use client";

import api from "@/app/api/api";
import { useState } from "react";
import LoginLayout from "../../../LoginLayout";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CadastroPage() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/user/new", { nome, email, senha });
      if (
        response.status === 200 &&
        response.data.message === "Cadastrado com sucesso. Faça login!"
      ) {
        setMensagem(response.data.message);

     
          // router.push("/pages/login/login");
     
          setTimeout(() => {
            window.location.href = "/pages/login/login"; // Redireciona para a página home após 2 segundos
          }, 2000);

      } else {
        setMensagem(response.data.message);
        // router.push("/pages/login/login");
      }
    } catch (error) {
      setMensagem(response.data.message);
    }
  };

  return (
    <LoginLayout>
      <Head>
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
          style={{ maxWidth: "600px", width: "100%" }}
        >
          <div className="card-body">
            <h5 className="card-title text-center mb-4">Cadastro</h5>
            {/* Exibe a mensagem de erro ou sucesso aqui */}
            {mensagem && (
              <div className="alert alert-info" role="alert">
                {mensagem}
              </div>
            )}
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label htmlFor="nomeCadastro" className="form-label">
                  Nome
                </label>
                <input
                  name="nome"
                  type="text"
                  className="form-control"
                  id="nomeCadastro"
                  placeholder="Digite seu nome"
                  style={{ width: "100%" }} // largura total
                  required
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="emailCadastro" className="form-label">
                  E-mail
                </label>
                <input
                  name="email"
                  type="email"
                  className="form-control"
                  id="emailCadastro"
                  placeholder="Digite seu e-mail"
                  style={{ width: "100%" }} // largura total
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="senhaCadastro" className="form-label">
                  Senha
                </label>
                <input
                  name="senha"
                  type="password"
                  className="form-control"
                  id="senhaCadastro"
                  placeholder="Digite sua senha"
                  style={{ width: "100%" }} // largura total
                  required
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Cadastrar
              </button>
            </form>

            <div className="text-center mt-3">
              <Link href="/pages/login/login">← Voltar para o login</Link>
            </div>
          </div>
        </div>
      </div>
    </LoginLayout>
  );
}
