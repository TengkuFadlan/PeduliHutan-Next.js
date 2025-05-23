import { PrismaClient } from "@/app/generated/prisma";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'], // Optional: Log queries for debugging
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;