// Backwards-compatible shim: re-exports the Prisma 8 database client.
// New code should import { db } from './db.js' directly.
export { db as default } from './db.js';
