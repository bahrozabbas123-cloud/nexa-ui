export const demoAccountKey = "nexaui_demo_account";
export const demoSessionKey = "nexaui_demo_session";

export type DemoAccount = {
  name: string;
  email: string;
  password: string;
};

export type DemoSession = {
  name: string;
  email: string;
  signedInAt: string;
  remember: boolean;
};

function readStorage<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  const stored = window.localStorage.getItem(key);
  if (!stored) return null;
  try {
    return JSON.parse(stored) as T;
  } catch {
    return null;
  }
}

export function getDemoAccount(): DemoAccount | null {
  return readStorage<DemoAccount>(demoAccountKey);
}

export function getCurrentDemoUser(): DemoSession | null {
  return readStorage<DemoSession>(demoSessionKey);
}

export function saveDemoAccount(account: DemoAccount) {
  window.localStorage.setItem(demoAccountKey, JSON.stringify(account));
}

export function createDemoSession(account: Pick<DemoAccount, "name" | "email">, remember = true) {
  const session: DemoSession = {
    name: account.name,
    email: account.email,
    signedInAt: new Date().toISOString(),
    remember,
  };
  window.localStorage.setItem(demoSessionKey, JSON.stringify(session));
}

export function clearDemoSession() {
  window.localStorage.removeItem(demoSessionKey);
}
