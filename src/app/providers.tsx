'use client';
import { AuthProvider } from '@/components/auth/AuthProvider';

export const Providers = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider>{children}</AuthProvider>
);
