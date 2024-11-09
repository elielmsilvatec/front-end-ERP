"use client";

import { useSession, signOut } from "next-auth/react";
import api from "@/app/api/api";
import React, { useCallback, useEffect, useState } from "react";

function Produtos() {
  const { data: session, status } = useSession();
  const [produtos, setProdutos] = useState<Produto[]>([]);
  if (!session) {
    return null;
  }

  interface Produto {
    id: number;
    nomeProduto: string;
    unidadeMedida: string;
    marca: string;
    quantidadeEstoque: number;
    valorVenda: string;
    // ... outras propriedades ...
  }

  useEffect(() => {
    async function fetchProdutos() {
      try {
        if (session) {
          const response = await api.get(
            "/produto/listar",
            {
              headers: {
                user: session.user?.id, // Envia o nome do usuário no header
              },
            }
          );
          setProdutos(response.data.produtos);
        }
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    }

    fetchProdutos();
  }, [session]);

  return (
    <div>
      <h1>Produtos</h1>
      {/* Renderizar a lista de produtos aqui */}
      {session.user?.id}


      <br />
          {/* Lista (tabela) de todos os produtos */}
          <table className="table table-hover table-bordered">
            <thead className="thead-light">
              <tr>
              <th>ID</th>
                <th>Descrição</th>
                <th className="text-center align-middle">Medida</th>
                <th className="text-center align-middle">Marca</th>
                <th className="text-center align-middle">Qtde</th>
                <th className="text-center align-middle">Valor</th>
                <th className="text-center align-middle">Visualizar</th>
              </tr>
            </thead>
            <tbody>
              {/* Adicione os dados dos produtos aqui */}
              {produtos.map((produto) => (
                <tr key={produto.id}>
                     <td className="align-middle">{produto.id}</td>
                  <td className="align-middle">{produto.nomeProduto}</td>
                  <td className="text-center align-middle">
                    {produto.unidadeMedida}
                  </td>
                  <td className="text-center align-middle">{produto.marca}</td>
                  <td className="text-center align-middle">
                    {produto.quantidadeEstoque}
                  </td>
                  <td className="text-center align-middle">
                    {produto.valorVenda}
                  </td>
                  <td className="text-center align-middle">
                    <a href={`/pages/product/view/${produto.id}`}>
                      <button className="btn btn-outline-primary">Abrir</button>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>


    </div>
  );
}

export default Produtos;
