'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { register } from './actions';
import { Eye, EyeOff } from 'lucide-react';

export default function RegisterForm() {
  const [isPending, startTransition] = useTransition();
  const [selectedRole, setSelectedRole] = useState<'LOCATAIRE' | 'PROPRIETAIRE'>('LOCATAIRE');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [botCheckAnswer, setBotCheckAnswer] = useState('');
  const [botCheckFailed, setBotCheckFailed] = useState(false);

  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#F9E7E7' }}>
      <div className="w-full max-w-2xl bg-white border border-gray-300 rounded-xl shadow-md px-6 py-10 mt-[-40px] space-y-6">
        <h1 className="text-2xl font-bold text-center text-black">Inscription</h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setErrorMessage(null);
            setPasswordMismatch(false);
            setBotCheckFailed(false);

            const formData = new FormData(e.currentTarget);

            const password = formData.get('password')?.toString() || '';
            const confirmPassword = formData.get('confirmPassword')?.toString() || '';
            const botAnswer = botCheckAnswer.trim();

            if (botAnswer !== '7') {
              setBotCheckFailed(true);
              return;
            }

            if (password !== confirmPassword) {
              setPasswordMismatch(true);
              return;
            }

            const hasTwoDigits = (password.match(/\d/g) || []).length >= 2;
            const hasTwoSpecials = (password.match(/[^a-zA-Z0-9]/g) || []).length >= 2;

            if (!hasTwoDigits || !hasTwoSpecials || password.length < 6) {
              setErrorMessage("Le mot de passe doit contenir au moins 6 caractères, 2 chiffres et 2 caractères spéciaux.");
              return;
            }

            startTransition(async () => {
              const result = await register(formData);
              if (result?.error) {
                setErrorMessage(result.error);
              } else if (result?.success) {
                router.push('/connexion');
              }
            });
          }}
          className="space-y-5 text-black"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="prenom"
              placeholder="Prénom"
              required
              pattern="^[A-Za-zÀ-ÿ\s\-]+$"
              title="Le prénom ne doit contenir que des lettres."
              className="w-full rounded-md border border-gray-300 px-4 py-2"
            />
            <input
              type="text"
              name="nom"
              placeholder="Nom"
              required
              pattern="^[A-Za-zÀ-ÿ\s\-]+$"
              title="Le nom ne doit contenir que des lettres."
              className="w-full rounded-md border border-gray-300 px-4 py-2"
            />
          </div>

          <input
            type="text"
            name="telephone"
            placeholder="Téléphone"
            required
            pattern="^\d{10,15}$"
            title="Le téléphone doit contenir uniquement des chiffres (10 à 15 chiffres)."
            inputMode="numeric"
            className="w-full rounded-md border border-gray-300 px-4 py-2"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-full rounded-md border border-gray-300 px-4 py-2"
          />

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Mot de passe"
              required
              className="w-full rounded-md border border-gray-300 px-4 py-2 pr-10"
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

          <input
            type={showPassword ? 'text' : 'password'}
            name="confirmPassword"
            placeholder="Confirmez le mot de passe"
            required
            className="w-full rounded-md border border-gray-300 px-4 py-2"
          />

          {/* ✅ Anti-bot simple */}
          <div>
            <label htmlFor="botCheck" className="text-sm font-medium mb-1 block">
              Pour vérifier que vous n’êtes pas un robot, répondez :
            </label>
            <input
              id="botCheck"
              type="text"
              value={botCheckAnswer}
              onChange={(e) => setBotCheckAnswer(e.target.value)}
              placeholder="Combien font 3 + 4 ?"
              className="w-full rounded-md border border-gray-300 px-4 py-2"
              required
            />
            {botCheckFailed && (
              <p className="text-red-600 text-sm mt-1 font-medium">Réponse incorrecte, veuillez réessayer.</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2">Je suis :</label>
            <div className="grid grid-cols-2 gap-4">
              {['LOCATAIRE', 'PROPRIETAIRE'].map((role) => (
                <label
                  key={role}
                  htmlFor={role.toLowerCase()}
                  className={`cursor-pointer border rounded-xl p-4 text-center transition ${
                    selectedRole === role ? 'border-[#405733] bg-[#f5fdf5]' : 'border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    id={role.toLowerCase()}
                    name="role"
                    value={role}
                    checked={selectedRole === role}
                    onChange={() => setSelectedRole(role as 'LOCATAIRE' | 'PROPRIETAIRE')}
                    className="hidden"
                  />
                  <img
                    src={`/uploads/${role === 'LOCATAIRE' ? 'locataire.png' : 'proprietaire.png'}`}
                    alt={role}
                    className="mx-auto max-h-24 w-auto mb-2 object-contain"
                  />
                  <span className="font-semibold text-black">
                    {role === 'LOCATAIRE' ? 'Locataire' : 'Propriétaire'}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-[#405733] hover:bg-[#304624] text-white font-semibold px-4 py-2 rounded-md transition disabled:opacity-50"
            >
              {isPending ? "Inscription..." : "S'inscrire"}
            </button>
          </div>

          {errorMessage && (
            <div className="text-sm text-red-600 text-center pt-4 font-medium">{errorMessage}</div>
          )}
          {passwordMismatch && (
            <div className="text-sm text-red-600 text-center pt-2 font-medium">Les mots de passe ne correspondent pas.</div>
          )}
        </form>
      </div>
    </div>
  );
}
