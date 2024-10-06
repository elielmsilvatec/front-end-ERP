"use client"; // Adicione esta linha no início do arquivo

import React, { useState } from "react";
import Menu from "../../components/menu/page";
import styles from "../../components/menu/menu.module.css"; // Importação do CSS como módulo

export default function Requests() {
  const [modalEditarOpen, setModalEditarOpen] = useState(false);

  const handleModalEditarOpen = () => setModalEditarOpen(true);
  const handleModalEditarClose = () => setModalEditarOpen(false);

  return (
    // <div className="container mt-4">
    <div>
      <Menu />
      <div className={styles.content}>
        {/* O conteúdo da página vai aqui */}
        <div className={styles.layout}>
          <p className="fs-4">Tela de pedidos</p>
          <div className="row">
            <div className="col d-flex justify-content-between">
              <form action="/pedido/add_novo" method="post">
                <button type="submit" className="btn btn-primary">
                  <i className="bi bi-plus-square-dotted"></i> Novo pedido
                </button>
              </form>

              <form action="/pedido/pedidos_fechados" method="get">
                <button type="submit" className="btn btn-outline-secondary">
                  <i className="bi bi-eye"></i> Visualizar pedidos finalizados
                </button>
              </form>
            </div>
          </div>

          <br />

          {/* Modal Editar Produto */}
          {modalEditarOpen && (
            <div
              className="modal fade show d-block"
              id="myModal_Editar"
              role="dialog"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <form method="post" action="/produtos/save">
                    <div className="modal-header">
                      <button
                        type="button"
                        className="close"
                        onClick={handleModalEditarClose}
                        aria-label="Close"
                      >
                        &times;
                      </button>
                      <h4 className="modal-title">Editar Produto</h4>
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
                        >
                          <option value="kg">kg</option>
                          <option value="Unidade">Unidade</option>
                          <option value="Metro">Metro</option>
                          <option value="Litro">Litro</option>
                          <option value="Milheiro">Milheiro</option>
                          <option value="Pacote">Pacote</option>
                          <option value="Saco">Saco</option>
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
                          type="number"
                          className="form-control"
                          id="quantidadeEstoque"
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="valorCompra" className="form-label">
                          Valor de Compra:
                        </label>
                        <input
                          name="valorCompra"
                          type="number"
                          className="form-control"
                          id="valorCompra"
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="valorVenda" className="form-label">
                          Valor de Venda:
                        </label>
                        <input
                          name="valorVenda"
                          type="number"
                          className="form-control"
                          id="valorVenda"
                          required
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
                        ></textarea>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-default"
                        onClick={handleModalEditarClose}
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

          {/* Lista (tabela) de todos os pedidos */}
          <table className="table table-hover table-bordered">
            <thead className="thead-light">
              <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th>Status</th>
                <th>Valor</th>
                <th className="text-center align-middle">Detalhes</th>
              </tr>
            </thead>
            <tbody>
              {/* Exemplo de pedidos, substituir com os dados reais */}
              <tr>
                <td className="align-middle">123</td>
                <td className="align-middle">Cliente Exemplo</td>
                <td className="align-middle">Aberto</td>
                <td className="align-middle">R$ 1.000,00</td>
                <td className="text-center align-middle">
                  <a href="#">
                    <button className="btn btn-outline-primary">Abrir</button>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
