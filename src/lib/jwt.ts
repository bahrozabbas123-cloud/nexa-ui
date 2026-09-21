// src/lib/jwt.ts
// Simple JWT utility for storing token in localStorage

const TOKEN_KEY = "nexaui_jwt_token";

/**
 * Save JWT token to localStorage.
 * @param token JWT token string
 */
export function setToken(token: string): void {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(TOKEN_KEY, token);
  }
}

/**
 * Retrieve JWT token from localStorage.
 * @returns token string or null if not present
 */
export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

/**
 * Remove JWT token from localStorage (e.g., on logout).
 */
export function clearToken(): void {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(TOKEN_KEY);
  }
}
