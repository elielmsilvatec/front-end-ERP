Felizmente, você pode usar um pouco de JavaScript e React para automatizar isso. Vou te apresentar duas abordagens:

1. Função para Criar Campos do Formulário:

Essa abordagem é ótima se você tem um padrão para seus campos:



// ****** campos stats
const [formData, setFormData] = useState({
  nome: "",
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
    // console.log('Dados enviados com sucesso:',formData);
  } catch (error) {
    console.error("Erro ao enviar os dados:", error);
  }
};

<form onSubmit={newClient}>
  <input
    name="nome"
    type="text"
   
    value={formData.nome}
    onChange={handleInputChange}
  />
</form>;
// *************************************************************************************************



// estrutura de alertas
const [message, setMessage] = useState(null);

const handleCloseAlert = () => {
  setMessage(null);
};

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
