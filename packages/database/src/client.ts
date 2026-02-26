import { PrismaClient } from '../generated/prisma';
import { PrismaLibSql } from '@prisma/adapter-libsql';
import { createClient } from '@libsql/client';
import * as path from 'path';
import { fileURLToPath } from 'url';

// Singleton pattern for Prisma Client
// Prevents multiple instances in development with hot reload

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// For SQLite, we need to use the LibSQL adapter
const dbPath = path.resolve(process.cwd(), 'dev.db');
const dbUrl = process.env.DATABASE_URL || `file:${dbPath}`;

const libsql = createClient({
  url: dbUrl,
});

const adapter = new PrismaLibSql(libsql);

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export * from '../generated/prisma';
