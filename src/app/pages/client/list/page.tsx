"use client"; // Adicione esta linha no início do arquivo
import React, { useState, useEffect } from "react";
import Menu from "../../../components/menu/page";
import styles from "../../../components/menu/menu.module.css"; // Importação do CSS como módulo
import api from "@/app/api/api";
import { useAuth } from "@/app/api/auth";

import { IMaskInput } from "react-imask";

export default function Client() {
  useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  // recebe todos os clientes nesse array
  const [clientes, setClientes] = useState([]);

  // ****** campos stats
  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    cep: "kg",
    rua: "",
    numero: "",
    bairro: "",
    cidade: "",
    observacoes: "",
  });
  // Função para lidar com mudanças nos campos de input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Função para criar novo Cliente
  const newClient = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/cliente/save", formData, {
        withCredentials: true,
      });
      console.log("Dados enviados com sucesso:", response.data);
      setMessage(response.data.message);
      setModalOpen(false);
    } catch (erro) {
      setError("Erro ao enviar os dados:", erro);
      setModalOpen(false);
    }
    
    // Limpar os campos do formulário
    setFormData({
      nome: "",
      telefone: "",
      cep: "",
      rua: "",
      numero: "",
      bairro: "",
      cidade: "",
      observacoes: "",
    });
  };
  // Função para buscar todos os clientes
  const fetchClient = async () => {
    try {
      const response = await api.get("/cliente/clientes", {
        withCredentials: true,
      });
      if (response.data.error) {
        setError(response.data.error);
      } else {
        setClientes(response.data.clientes); // Supondo que a resposta tenha um array de clientes
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError("Erro ao buscar clientes");
    }
  };

  // fechar a mensagem
  const handleCloseAlert = () => {
    setMessage(null);
  };

  useEffect(() => {
    fetchClient();
  }, []);

  return (
    // <div className="container mt-4">
    <div>
      <Menu />
      <div className={styles.content}>
        {/* O conteúdo da página vai aqui */}
        <div className={styles.layout}>
          {/* Alert para informar mensagens como produto editado com sucesso! */}

          {message && (
            <div
              className="alert alert-success alert-dismissible fade show"
              role="alert"
            >
              {message}
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
                onClick={handleCloseAlert}
              ></button>
            </div>
          )}

          <button
            type="button"
            className="btn btn-primary"
            onClick={handleModalOpen}
          >
            <i className="bi bi-plus-square-dotted"></i> Novo cliente
          </button>

          <form
            action="/cliente/buscar"
            method="POST"
            id="formCliente"
            className="mt-3"
          >
            <div className="input-group">
              <input
                name="busca"
                type="text"
                className="form-control"
                id="search-input"
                placeholder="Digite o nome do cliente"
              />
              <div className="input-group-append">
                <button
                  type="submit"
                  className="btn btn-outline-primary"
                  style={{ marginLeft: 10 }}
                >
                  <i className="bi bi-search"></i> Buscar
                </button>
              </div>
            </div>
          </form>

          {/* Modal de Cadastro de Cliente */}
          {modalOpen && (
            <div
              className="modal fade show d-block"
              id="myModal"
              tabIndex="-1"
              aria-labelledby="myModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <form onSubmit={newClient}>
                    <div className="modal-header">
                      <h4 className="modal-title" id="myModalLabel">
                        Cadastro de Cliente
                      </h4>
                      <button
                        type="button"
                        className="btn-close"
                        onClick={handleModalClose}
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <div className="mb-3">
                        <label htmlFor="nome" className="form-label">
                          Nome:
                        </label>
                        <input
                          name="nome"
                          type="text"
                          className="form-control"
                          id="nome"
                          placeholder="Digite o nome do cliente"
                          required
                          autoFocus
                          value={formData.nome}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="telefone" className="form-label">
                          Telefone:
                        </label>
                        {/* <input
                          name="telefone"
                          type="text"
                          className="form-control"
                          id="telefone"
                          placeholder="(00) 0000-0000"
                          required
                        /> */}
                        <IMaskInput
                          mask="(00) 00000-0000"
                          name="telefone"
                          type="text"
                          className="form-control"
                          id="telefone"
                          placeholder="(00) 0000-0000"
                          required
                          value={formData.telefone}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="cep" className="form-label">
                          CEP:
                        </label>
                        {/* <input
                          name="cep"
                          type="text"
                          className="form-control"
                          id="cep"
                          placeholder="00000 - 000"
                        /> */}
                        <IMaskInput
                          mask="00000 - 000"
                          name="cep"
                          type="text"
                          className="form-control"
                          id="cep"
                          placeholder="00000 - 000"
                          value={formData.cep}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="rua" className="form-label">
                          Rua:
                        </label>
                        <input
                          name="rua"
                          type="text"
                          className="form-control"
                          id="rua"
                          placeholder="Digite a rua do cliente"
                          value={formData.rua}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="numero" className="form-label">
                          Número:
                        </label>
                        <input
                          name="numero"
                          type="text"
                          className="form-control"
                          id="numero"
                          placeholder="Digite o número do cliente"
                          value={formData.numero}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="bairro" className="form-label">
                          Bairro:
                        </label>
                        <input
                          name="bairro"
                          type="text"
                          className="form-control"
                          id="bairro"
                          placeholder="Digite o bairro do cliente"
                          value={formData.bairro}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="cidade" className="form-label">
                          Cidade:
                        </label>
                        <input
                          name="cidade"
                          type="text"
                          className="form-control"
                          id="cidade"
                          placeholder="Digite a cidade do cliente"
                          value={formData.cidade}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="observacoes" className="form-label">
                          Observações:
                        </label>
                        <textarea
                          name="observacoes"
                          className="form-control"
                          id="observacoes"
                          placeholder="Digite as observações sobre o cliente"
                          value={formData.observacoes}
                          onChange={handleInputChange}
                        ></textarea>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={handleModalClose}
                      >
                        Fechar
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

          {/* Lista (tabela) de todos os clientes */}
          <table className="table table-hover table-bordered mt-3">
            <thead className="thead-light">
              <tr>
                <th>Nome</th>
                <th className="text-center align-middle">Telefone</th>
                <th className="align-middle">Rua</th>
                <th className="align-middle">Numero</th>
                <th className="align-middle">Bairro</th>
                <th className="align-middle">Cidade</th>
                <th className="text-center align-middle">Visualizar</th>
              </tr>
            </thead>

            <tbody>
              {/* cria o mapa e adiciona uma key */}
              {clientes.map((cliente) => (
                <tr key={cliente.id}>
                  <td className="align-middle">{cliente.nome}</td>
                  <td className="text-center align-middle">
                    {cliente.telefone}
                  </td>
                  <td className="align-middle">{cliente.rua}</td>
                  <td className="align-middle">{cliente.numero}</td>
                  <td className="align-middle">{cliente.bairro}</td>
                  <td className="align-middle">{cliente.cidade}</td>
                  <td className="text-center align-middle">
                    <a href={`/pages/client/view/${cliente.id}`}>
                      <button className="btn btn-outline-primary">Abrir</button>
                    </a>
                  </td>
                </tr>
                // fecha aqui
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
