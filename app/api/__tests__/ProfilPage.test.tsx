// __tests__/ProfilPage.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import ProfilPage from '@/app/profil/page';
import { getSession } from 'next-auth/react';
import '@testing-library/jest-dom';

// Mock de getSession
jest.mock('next-auth/react', () => ({
  getSession: jest.fn(),
}));

// Mock global de fetch
global.fetch = jest.fn();

const mockUserData = {
  nom: 'Doe',
  prenom: 'John',
  email: 'john.doe@example.com',
  telephone: '0601020304',
  role: 'PROPRIETAIRE',
  createdAt: new Date().toISOString(),
  annonces: [
    {
      id: '1',
      title: 'Appartement Paris',
      createdAt: new Date().toISOString(),
    },
  ],
  likes: [],
};

describe('ProfilPage', () => {
  beforeEach(() => {
    (getSession as jest.Mock).mockResolvedValue({
      user: { email: 'john.doe@example.com' },
    });

    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockUserData,
    });
  });

  it('affiche les informations de profil et les annonces publiées', async () => {
    render(<ProfilPage />);

    // Attente du chargement des données
    await waitFor(() =>
      expect(screen.getByText(/john doe/i)).toBeInTheDocument()
    );

    // Vérifie la présence du rôle
    expect(screen.getAllByText('PROPRIETAIRE').length).toBeGreaterThan(0);

    // Vérifie les champs imbriqués (strong + texte)
    expect(
      screen.getByText((content, node) => node?.textContent === 'Nom : Doe')
    ).toBeInTheDocument();

    expect(
      screen.getByText((content, node) => node?.textContent === 'Prénom : John')
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        (content, node) => node?.textContent === 'Email : john.doe@example.com'
      )
    ).toBeInTheDocument();

    // Vérifie l'annonce publiée
    expect(screen.getByText('Mes Annonces Publiées')).toBeInTheDocument();
    expect(screen.getByText('Appartement Paris')).toBeInTheDocument();
  });
});
