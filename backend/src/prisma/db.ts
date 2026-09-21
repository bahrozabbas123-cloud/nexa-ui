import 'dotenv/config';
import { Temporal } from '@js-temporal/polyfill';
import postgres from '@prisma/orm-postgres/runtime';
import type { Contract } from './contract.d';
import contractJson from './contract.json' with { type: 'json' };

// Prisma 8's PostgreSQL temporal codecs (pg/timestamptz-temporal@1 etc.) require the
// JS `Temporal` API to be available globally. This Node runtime does not ship it yet,
// so register the official polyfill once. No database schema is affected by this.
if (typeof (globalThis as { Temporal?: unknown }).Temporal === 'undefined') {
  (globalThis as { Temporal?: typeof Temporal }).Temporal = Temporal;
}

export const db = postgres<Contract>({
  contractJson,
  url: process.env['DATABASE_URL']!,
});
