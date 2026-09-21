// src/lib/api.ts
// Central configuration for reaching the NexaUI backend API.

const DEFAULT_API_URL = "http://localhost:5000";

/**
 * Base URL of the backend API.
 *
 * Configure NEXT_PUBLIC_API_URL in `.env.local` (development) or in your hosting
 * provider's environment settings (production). Defaults to the local backend so
 * development keeps working with no configuration.
 *
 * NOTE: this must stay a static `process.env.NEXT_PUBLIC_API_URL` reference.
 * Next.js inlines NEXT_PUBLIC_* values into the client bundle at build time, and
 * dynamic lookups (`process.env[name]`, or reading it off a copy of
 * `process.env`) are NOT inlined and would resolve to undefined in the browser.
 */
export const API_BASE_URL: string = (
  process.env.NEXT_PUBLIC_API_URL || DEFAULT_API_URL
).replace(/\/+$/, "");

/**
 * Build an absolute URL for a backend endpoint.
 * @param path Endpoint path starting with a slash, e.g. "/api/auth/login".
 * @returns The full URL, e.g. "http://localhost:5000/api/auth/login".
 */
export function apiUrl(path: string): string {
  return `${API_BASE_URL}${path}`;
}
