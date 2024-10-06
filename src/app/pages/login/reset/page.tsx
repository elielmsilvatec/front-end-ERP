import Link from "next/link";

export default function ResetarSenhaPage() {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="card shadow-sm p-4" style={{ maxWidth: "400px" }}>
        <div className="card-body">
          <h5 className="card-title text-center mb-4">Recuperar Senha</h5>
          <form method="post" action="/user/recuperar-senha">
            <div className="mb-3">
              <label htmlFor="emailRecuperacao" className="form-label">E-mail</label>
              <input name="email" type="email" className="form-control" id="emailRecuperacao" required />
            </div>
            <button type="submit" className="btn btn-primary w-100">Enviar</button>
          </form>
          
          <div className="text-center mt-3">
            <Link href="/pages/login/login">← Voltar para o login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
