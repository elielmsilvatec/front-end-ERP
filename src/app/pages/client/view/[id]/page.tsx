"use client";
import { useAuth } from "@/app/api/auth";
import api from "@/app/api/api";
import Menu from "@/app/components/menu/page";
import styles from "@/app/components/menu/menu.module.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DeleteConfirmation from "@/app/components/DeleteConfirmation/page";

export default function Produto({ params }: { params: { id: number } }) {
  useAuth();
  const [isEditable, setIsEditable] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const id = params.id;

  const router = useRouter();
  const [formData, setFormData] = useState({
    nomeProduto: "",
    marca: "",
    unidadeMedida: "kg",
    quantidadeEstoque: "",
    valorCompra: "",
    valorVenda: "",
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

  // Função para buscar dados do produto
  const fetchProduct = async () => {
    try {
      const response = await api.get(`/produtos/view/${id}`, {
        withCredentials: true,
      });
      if (response.data.error) {
        setError(response.data.error);
      }
      setFormData(response.data);
      setLoading(false);
      console.log(response);
    } catch (error) {
      setError("Erro ao buscar produto");
    }
  };

  // Função para lidar com o botão de editar ou cancelar edição
  const handleEdit = () => {
    setIsEditable(!isEditable);
  };

  // Função para submeter o formulário e editar os campos
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/produtos/edit/save/${id}`, formData, {
        withCredentials: true,
      });
      console.log("Dados enviados:", formData);
      setIsEditable(!isEditable);
      setMessage("Produto atualizado com sucesso...!");
    } catch (error) {
      // console.error("Erro ao salvar o produto:", error);
      setMessage("Não foi possivel editar o produto.", erro);
    }
  };

  // Função para deletar o produto
  const handleDelete = async () => {
    try {
      await api.delete(`/produtos/del/${id}`, { withCredentials: true });
      console.log("Produto deletado:", id);
      router.push("/pages/product/list"); // Redireciona para a lista de produtos
    } catch (error) {
      console.error("Erro ao deletar o produto:", error);
    }
  };

  const handleCloseAlert = () => {
    setMessage(null);
  };

  useEffect(() => {
    if (id) {
      fetchProduct();
    } else {
      setError("Erro ao buscar produto");
    }
  }, [id]);

  return (
    <div>
      <Menu />
      <div className={styles.content}>
        <div className={styles.layout}>
          <div className="container mt-5">
            <h2 className="mb-4">Detalhes do Cliente</h2>

            <div className="row">
              <div className="col-md-6">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">
                      Nome: <span id="nome-cliente">João da Silva</span>
                    </h5>
                    <p className="card-text">
                      Endereço:{" "}
                      <span id="endereco-cliente">Rua das Flores, 123</span>
                    </p>
                    <p className="card-text">
                      Telefone:{" "}
                      <span id="telefone-cliente">(11) 9999-9999</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card">
                  <div className="card-body">
                    <p className="card-text">
                      Bairro: <span id="bairro-cliente">Jardim das Flores</span>
                    </p>
                    <p className="card-text">
                      Rua: <span id="rua-cliente">Rua das Flores</span>
                    </p>
                    <p className="card-text">
                      Número: <span id="numero-cliente">123</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <button className="btn btn-primary">Editar</button>
              <button className="btn btn-danger">Deletar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
