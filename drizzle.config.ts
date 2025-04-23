import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './server/schema/index.ts',
  out: './server/migrations',
  dialect: 'postgresql',
  casing: 'snake_case',
  strict: true,
  entities: {
    roles: true,
  },
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
