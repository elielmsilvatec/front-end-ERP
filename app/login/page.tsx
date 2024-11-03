'use client';

import { useState } from'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { toast } from'sonner';
// import { LockKeyhole, Mail } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl: '/dashboard'
      });

      if (result?.error) {
        toast.error('Invalid credentials');
      } else {
        router.push('/dashboard');
        router.refresh();
        toast.success('Login successful!');
      }
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card border-0 shadow">
            <div className="card-body">
              <h2 className="text-center mb-4">Login</h2>
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label htmlFor="inputEmail" className="form-label">Email</label>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="inputPassword" className="form-label">Senha</label>
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    required
                    disabled={isLoading}
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
              <div className="text-center text-sm text-gray-600">
                <p>Demo credentials:</p>
                <p>Email: teste@gmail.com</p>
                <p>Password: 123</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}