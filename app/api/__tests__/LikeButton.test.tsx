import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LikeButton from '@/components/LikeButton'; // adapte selon ton chemin
import '@testing-library/jest-dom';

describe('LikeButton', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ liked: true }),
      })
    ) as jest.Mock;
  });

  afterEach(() => {
    jest.resetAllMocks(); // Nettoyage après chaque test
  });

  it('affiche le bouton de like avec l’état initial', () => {
    render(<LikeButton annonceId={1} initialLiked={false} />);
    const button = screen.getByRole('button', { name: "Liker l'annonce" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('text-gray-400');
  });

  it('envoie une requête fetch et met à jour l’état liked', async () => {
    render(<LikeButton annonceId={1} initialLiked={false} />);
    const button = screen.getByRole('button', { name: "Liker l'annonce" });

    fireEvent.click(button);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/like', expect.anything());
      expect(button).toHaveClass('text-red-500');
    });
  });
});
