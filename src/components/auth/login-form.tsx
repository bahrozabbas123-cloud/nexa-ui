"use client";

import { useState } from "react";
import { ArrowRight, LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { createDemoSession, getDemoAccount, saveDemoAccount } from "@/lib/auth";

const demoEmail = "demo@nexaui.dev";
const demoPassword = "nexaui-demo";
export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [errors, setErrors] = useState<{ email?: string; password?: string; form?: string }>({});
  const [loading, setLoading] = useState(false);

  function validate() {
    const nextErrors: { email?: string; password?: string } = {};
    if (!email.trim()) nextErrors.email = "Enter your work email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = "Use a valid email address.";
    if (!password) nextErrors.password = "Enter your password.";
    else if (password.length < 8) nextErrors.password = "Password must be at least 8 characters.";
    return nextErrors;
  }

  function completeLogin(loginEmail: string, accountName = "Demo User") {
    createDemoSession({ name: accountName, email: loginEmail }, remember);
    router.push("/dashboard");
  }

  function submitLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) return;
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const loginEmail = email.trim().toLowerCase();
    const storedAccount = getDemoAccount();
    const validDemoCredentials = loginEmail === demoEmail && password === demoPassword;
    const validStoredCredentials = storedAccount?.email === loginEmail && storedAccount.password === password;
    if (!validDemoCredentials && !validStoredCredentials) {
      setErrors({ form: "The email or password is incorrect." });
      return;
    }

    setLoading(true);
    window.setTimeout(() => completeLogin(loginEmail, validStoredCredentials ? storedAccount.name : "Demo User"), 450);
  }

  function useDemoAccount() {
    if (loading) return;
    setEmail(demoEmail);
    setPassword(demoPassword);
    saveDemoAccount({ name: "Demo User", email: demoEmail, password: demoPassword });
    setErrors({});
    setLoading(true);
    window.setTimeout(() => completeLogin(demoEmail), 450);
  }

  return <>
    <div className="social-row"><button className="social-button" type="button">G <span>Continue with Google</span></button><button className="social-button" type="button">⌘ <span>Continue with Apple</span></button></div>
    <div className="or-divider"><span>or continue with email</span></div>
    <form className="auth-form" onSubmit={submitLogin} noValidate>
      <label className="field"><span className="field-label">Work email</span><input className="input" type="email" placeholder="you@company.com" value={email} onChange={(event) => { setEmail(event.target.value); setErrors((current) => ({ ...current, email: undefined, form: undefined })); }} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "login-email-error" : undefined} autoComplete="email" />{errors.email && <span className="field-error" id="login-email-error">{errors.email}</span>}</label>
      <label className="field"><span className="field-label">Password</span><input className="input" type="password" placeholder="At least 8 characters" value={password} onChange={(event) => { setPassword(event.target.value); setErrors((current) => ({ ...current, password: undefined, form: undefined })); }} aria-invalid={Boolean(errors.password)} aria-describedby={errors.password ? "login-password-error" : undefined} autoComplete="current-password" />{errors.password && <span className="field-error" id="login-password-error">{errors.password}</span>}</label>
      <div className="auth-options"><label><input type="checkbox" checked={remember} onChange={(event) => setRemember(event.target.checked)} /> Remember me</label><button className="auth-link-button" type="button" onClick={() => setErrors({ form: "Password recovery will be available when authentication is connected." })}>Forgot password?</button></div>
      {errors.form && <p className="auth-error" role="alert">{errors.form}</p>}
      <button className="button button-primary auth-submit" type="submit" disabled={loading} aria-busy={loading}>{loading ? <><LoaderCircle className="button-spinner" size={15} /> Signing in...</> : <>Sign in <ArrowRight size={15} /></>}</button>
    </form>
    <div className="demo-login"><div><strong>Try the demo workspace</strong><small>Uses a temporary local session on this browser.</small></div><button type="button" onClick={useDemoAccount} disabled={loading}>Use demo account</button></div>
  </>;
}
