"use client"; // Adicione esta linha no início do arquivo

import React, { useCallback, useEffect, useState } from "react";
import api from "@/app/api/api";
import { useAuth } from "@/app/api/auth";
import Menu from "../../../components/menu/page";
import styles from "../../../components/menu/menu.module.css"; // Importação do CSS como módulo
import { useRouter } from "next/navigation";

export default function ProdutoPage() {
  const isLoggedIn = useAuth();
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  // carregando os Produtos
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ****************formulario cadastro*****************************
  const [nomeProduto, setNomeproduto] = useState("");
  const [marca, setMarca] = useState("");
  const [unidadeMedida, setUnidadeDeMedida] = useState("Unidade");
  const [quantidadeEstoque, setQuantidade] = useState("");
  const [valorCompra, setValorCompra] = useState("");
  const [valorVenda, setValorVenda] = useState("");
  const [observacoes, setObservacoes] = useState("");

  const [buscarProduto, setBuscarProduto] = useState("");

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setBuscarProduto(value);
    if (value) {
      searchProducts(value);
    } else {
      fetchUserProducts(); // Se o input estiver vazio, carregue todos os produtos novamente
    }
  };
  const searchProducts = async (buscarProduto) => {
    try {
      const response = await api.post(
        "/produto/buscar",
        { buscarProduto },
        {
          withCredentials: true,
        }
      );
      setProdutos(response.data.produtos);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  // Função para criar novo produto
  const newProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post(
        "/produtos/save",
        {
          nomeProduto,
          marca,
          unidadeMedida,
          quantidadeEstoque,
          valorCompra,
          valorVenda,
          observacoes,
        },
        { withCredentials: true }
      );
      setModalOpen(false);
      fetchUserProducts();
    } catch (error) {
      console.error("Erro ao cadastrar produtos", error);
      setError("Erro ao cadastrar produtos. Tente novamente.");
      setModalOpen(false);
      fetchUserProducts();
    } finally {
      setLoading(false);
      // // Limpar os campos do formulário
      // setNomeproduto("");
      // setMarca("");
      // setUnidadeDeMedida("");
      // setQuantidade("");
      // setValorCompra("");
      // setValorVenda("");
      // setObservacoes("");
    }
  };

  // Função para buscar os produtos do usuário logado (usando useCallback)
  const fetchUserProducts = useCallback(async () => {
    try {
      const response = await api.get("/produto/produtos", {
        withCredentials: true,
      });
      setProdutos(response.data.produtos);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar produtos do usuário:", error);
      router.push("/pages/login/login");
    }
  }, []); // Array de dependências vazio: fetchUserProducts será memorizado

  useEffect(() => {
    fetchUserProducts();
  }, []);

  return (
    // <div className="container mt-4">
    <div>
      <Menu />

      <div className={styles.content}>
        {/* O conteúdo da página vai aqui */}
        <div className={styles.layout}>
          <h3 className="fs-3">Tela de Produtos</h3>

          <div className="row">
            <div className="col d-flex justify-content-between">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleModalOpen}
              >
                <i className="bi bi-plus-square-dotted"></i> Cadastrar produto
              </button>

              <form action="/produto/estoque_baixo" method="get">
                <button type="submit" className="btn btn-outline-secondary">
                  <i className="bi bi-eye"></i> Visualizar produtos com estoque
                  baixo
                </button>
              </form>
            </div>
          </div>

          {/* Botão buscar */}
          <br />

          {/* verificado o status dos produtos se foram carregados ou não */}
          {loading && (
            <div className="alert alert-info" role="alert">
              Carregando...
            </div>
          )}
          {error && (
            <div className="alert alert-danger" role="alert">
              Erro: {error}
            </div>
          )}

          {!loading && !error && <></>}
          <form method="post" onSubmit={searchProducts}>
            <div className="input-group">
              <input
                name="busca"
                type="text"
                className="form-control"
                id="search-input"
                placeholder="Digite o nome do produto"
                value={buscarProduto}
                onChange={handleSearchChange}
              />

              <div className="input-group-append">
                <button
                  // type="submit"
                  className="btn btn-outline-primary"
                  style={{ marginLeft: 10 }}
                >
                  <i className="bi bi-search"></i> Buscar
                </button>
              </div>
            </div>
          </form>

          {/* Modal de Adicionar Novo */}
          {modalOpen && (
            <div
              className="modal fade show d-block"
              id="myModal"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <form method="post" onSubmit={newProduct}>
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">
                        Cadastro de Produto
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        onClick={handleModalClose}
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <div className="mb-3">
                        <label htmlFor="nomeProduto" className="form-label">
                          Nome do Produto:
                        </label>
                        <input
                          name="nomeProduto"
                          type="text"
                          className="form-control"
                          id="nomeProduto"
                          required
                          autoFocus
                          value={nomeProduto}
                          onChange={(e) => setNomeproduto(e.target.value)}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="marca" className="form-label">
                          Marca:
                        </label>
                        <input
                          name="marca"
                          type="text"
                          className="form-control"
                          id="marca"
                          required
                          value={marca}
                          onChange={(e) => setMarca(e.target.value)}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="unidadeMedida" className="form-label">
                          Unidade de Medida:
                        </label>
                        <select
                          name="unidadeMedida"
                          className="form-control"
                          id="unidadeMedida"
                          value={unidadeMedida} // Liga o valor do select ao estado
                          onChange={(e) => setUnidadeDeMedida(e.target.value)} // Captura mudança
                        >
                          <option value="Unidade">Unidade</option>
                          <option value="kg">kg</option>
                          <option value="Metro">Metro</option>
                          <option value="Litro">Litro</option>
                          <option value="Milheiro">Milheiro</option>
                          <option value="Pacote">Pacote</option>
                          <option value="Saco">Saco</option>
                          <option value="duzia">Dúzia</option>
                        </select>
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="quantidadeEstoque"
                          className="form-label"
                        >
                          Quantidade em Estoque:
                        </label>
                        <input
                          name="quantidadeEstoque"
                          type="text"
                          className="form-control"
                          id="quantidadeEstoque"
                          required
                          value={quantidadeEstoque} // Liga o valor
                          onChange={(e) => setQuantidade(e.target.value)} // Captura mudança
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="valorCompra" className="form-label">
                          Valor de Compra:
                        </label>
                        <input
                          name="valorCompra"
                          type="text"
                          className="form-control"
                          id="valorCompra"
                          required
                          value={valorCompra} // Liga o valor
                          onChange={(e) => setValorCompra(e.target.value)} // Captura mudança
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="valorVenda" className="form-label">
                          Valor de Venda:
                        </label>
                        <input
                          name="valorVenda"
                          type="text"
                          className="form-control"
                          id="valorVenda"
                          required
                          value={valorVenda} // Liga o valor do select ao estado
                          onChange={(e) => setValorVenda(e.target.value)} // Captura mudança
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="observacoes" className="form-label">
                          Observações:
                        </label>
                        <textarea
                          name="observacoes"
                          className="form-control"
                          rows="5"
                          id="observacoes"
                          value={observacoes} // Liga o valor do select ao estado
                          onChange={(e) => setObservacoes(e.target.value)} // Captura mudança
                        ></textarea>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={handleModalClose}
                      >
                        Cancelar
                      </button>
                      <button type="submit" className="btn btn-primary">
                        Salvar
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

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
      </div>
    </div>
  );
}
