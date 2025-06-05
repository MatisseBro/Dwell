import { render, screen, waitFor } from '@testing-library/react';
import ProfilPage from '@/app/profil/page';
import { getSession } from 'next-auth/react';

jest.mock('next-auth/react', () => ({
  getSession: jest.fn(),
}));

global.fetch = jest.fn();

const mockUserData = {
  nom: 'Dupont',
  prenom: 'Jean',
  email: 'jean.dupont@example.com',
  telephone: '0600000000',
  role: 'PROPRIETAIRE',
  createdAt: new Date('2023-01-01').toISOString(),
  annonces: [
    {
      id: 1,
      title: 'Super appart',
      createdAt: new Date('2023-01-15').toISOString(),
    },
  ],
  likes: [],
};

describe('ProfilPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('affiche le message de chargement au départ', async () => {
    (getSession as jest.Mock).mockResolvedValue(null);

    render(<ProfilPage />);
    expect(screen.getByText(/Chargement du profil/i)).toBeInTheDocument();
  });

  it('affiche les informations utilisateur si connecté', async () => {
    (getSession as jest.Mock).mockResolvedValue({
      user: { email: 'jean.dupont@example.com' },
    });

    (fetch as jest.Mock).mockResolvedValue({
      json: () => Promise.resolve(mockUserData),
    });

    render(<ProfilPage />);

    await waitFor(() => {
      expect(screen.getByText(/Jean Dupont/i)).toBeInTheDocument();
      // ✅ change getByText → getAllByText pour éviter l'erreur
      expect(screen.getAllByText(/PROPRIETAIRE/i).length).toBeGreaterThan(0);
      expect(screen.getByText(/Super appart/i)).toBeInTheDocument();
      expect(screen.getByText(/Mes Annonces Publiées/i)).toBeInTheDocument();
    });
  });

  it('affiche "Aucune annonce publiée" si pas d’annonces', async () => {
    (getSession as jest.Mock).mockResolvedValue({
      user: { email: 'jean.dupont@example.com' },
    });

    (fetch as jest.Mock).mockResolvedValue({
      json: () => Promise.resolve({ ...mockUserData, annonces: [] }),
    });

    render(<ProfilPage />);

    await waitFor(() => {
      expect(screen.getByText(/Aucune annonce publiée/i)).toBeInTheDocument();
    });
  });
});
