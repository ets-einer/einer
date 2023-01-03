import { PrismaClient, Prisma } from ".prisma/client";

export const prisma = new PrismaClient({
  log: ["query"],
});

export { Prisma };

export type { User } from ".prisma/client";
