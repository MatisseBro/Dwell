'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = new FormData(e.currentTarget);
    const email = form.get('email') as string;
    const password = form.get('password') as string;

    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    setLoading(false);

    if (res?.error) {
      setError(res.error);
    } else {
      router.push('/');
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: '#F9E7E7' }}
    >
      <div className="w-full max-w-md bg-white border border-gray-300 rounded-xl shadow-md px-6 py-10 mt-[-40px] space-y-6">
        <h1 className="text-2xl font-bold text-center text-[#3D3D3D]">Connexion</h1>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#1E1E1E] mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Votre adresse email"
              required
              className="w-full rounded-md border border-gray-300 px-4 py-2 text-[#1E1E1E] bg-transparent focus:outline-none focus:ring-2 focus:ring-[#405733]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1E1E1E] mb-1">Mot de passe</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Votre mot de passe"
                required
                className="w-full rounded-md border border-gray-300 px-4 py-2 pr-10 text-[#1E1E1E] bg-transparent focus:outline-none focus:ring-2 focus:ring-[#405733]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-600 text-center">{error}</p>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#405733] hover:bg-[#304624] text-white font-semibold px-4 py-2 rounded-md transition disabled:opacity-50"
            >
              {isLoading ? 'Connexion...' : 'Se connecter'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
