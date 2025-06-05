// __tests__/handle-like.test.ts
import { handleLike } from '@/lib/handle-like';
import { getSessionSafe } from '@/lib/get-session';
import { prisma } from '@/lib/prisma';

// ✅ Patch Response pour Jest sans node-fetch
global.Response = class {
  body: string;
  status: number;
  headers?: HeadersInit;

  constructor(body: string, init?: { status?: number; headers?: HeadersInit }) {
    this.body = body;
    this.status = init?.status ?? 200;
    this.headers = init?.headers;
  }
} as any;

jest.mock('@/lib/get-session', () => ({
  getSessionSafe: jest.fn(),
}));

jest.mock('@/lib/prisma', () => ({
  prisma: {
    like: {
      create: jest.fn(),
    },
  },
}));

const mockedGetSession = getSessionSafe as jest.Mock;
const mockedCreate = prisma.like.create as jest.Mock;

describe('handleLike', () => {
  it('renvoie 401 si pas connecté', async () => {
    mockedGetSession.mockResolvedValue(null);
    const res = await handleLike('1');
    expect(res.status).toBe(401);
  });

  it('crée un like et retourne 200 si connecté', async () => {
    mockedGetSession.mockResolvedValue({ user: { id: 1 } });
    mockedCreate.mockResolvedValue({});

    const res = await handleLike('1');
    expect(mockedCreate).toHaveBeenCalledWith({
      data: { userId: 1, annonceId: 1 },
    });
    expect(res.status).toBe(200);
  });
});
