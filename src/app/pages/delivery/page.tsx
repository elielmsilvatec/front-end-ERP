"use client"; // Adicione esta linha no início do arquivo
import React from "react";
import moment from "moment";
import Menu from "../../components/menu/page";
import styles from "../../components/menu/menu.module.css"; // Importação do CSS como módulo

const Deliveries = () => {
  // Aqui você pode adicionar seus dados para venda_finalizada, pedido, cliente, etc.
  const venda_finalizada = []; // Substitua com seus dados reais
  const pedido = []; // Substitua com seus dados reais
  const cliente = []; // Substitua com seus dados reais

  return (
    <div>
      <Menu />
      <div className={styles.content}>
        {/* O conteúdo da página vai aqui */}
        <div className={styles.layout}>
          <p className="fs-3">Tela de entregas</p>

          <form action="/entrega/entregue" method="get">
            <button type="submit" className="btn btn-outline-secondary">
              Visualizar pedidos entregues
            </button>
          </form>
          <br />

          <table className="table table-hover table-bordered">
            <thead className="thead-light">
              <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th>Status</th>
                <th>Data</th>
                <th>Valor</th>
                <th className="text-center align-middle">Detalhes</th>
              </tr>
            </thead>
            <tbody>
              {/* Adicione a lógica de renderização das linhas aqui */}
              {venda_finalizada.map((venda) =>
                pedido.map(
                  (pedidoItem) =>
                    pedidoItem.id === venda.id_pedido && (
                      <tr key={pedidoItem.id}>
                        <td className="align-middle">
                          {pedidoItem.num_pedido}
                        </td>
                        <td className="align-middle">
                          {cliente.map(
                            (clienteItem) =>
                              pedidoItem.cliente_pedido === clienteItem.id &&
                              clienteItem.nome
                          )}
                        </td>
                        <td className="align-middle">Falta entregar</td>
                        <td className="align-middle">
                          {moment.utc(venda.data_entrega).format("DD/MM/YYYY")}
                        </td>
                        <td className="align-middle">
                          {venda.valor_total_venda.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </td>
                        <td className="text-center align-middle">
                          <a href={`/entrega/ver/${pedidoItem.id}`}>
                            <button
                              type="button"
                              className="btn btn-outline-success btn-sm"
                            >
                              <i className="bi bi-eye"></i> Visualizar
                            </button>
                          </a>
                        </td>
                      </tr>
                    )
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Deliveries;
