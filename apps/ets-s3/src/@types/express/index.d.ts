import type { User } from './../../../../auth/src/lib/prisma';

declare global {
    namespace Express {
      interface Request {
        user?: User;
      }
    }
}
  