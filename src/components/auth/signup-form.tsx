"use client";

import { useState } from "react";
import { ArrowRight, LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { createDemoSession, saveDemoAccount } from "@/lib/auth";

const demoEmail = "demo@nexaui.dev";
const demoPassword = "nexaui-demo";








type SignupErrors = { name?: string; email?: string; password?: string; confirmPassword?: string; form?: string };

export function SignupForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<SignupErrors>({});
  const [loading, setLoading] = useState(false);

  function validate() {
    const nextErrors: SignupErrors = {};
    if (!name.trim()) nextErrors.name = "Enter your name.";
    else if (name.trim().length < 2) nextErrors.name = "Use at least 2 characters.";
    if (!email.trim()) nextErrors.email = "Enter your work email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = "Use a valid email address.";
    if (!password) nextErrors.password = "Create a password.";
    else if (password.length < 8) nextErrors.password = "Password must be at least 8 characters.";
    if (!confirmPassword) nextErrors.confirmPassword = "Confirm your password.";
    else if (password !== confirmPassword) nextErrors.confirmPassword = "Passwords do not match.";
    return nextErrors;
  }

  function clearError(field: keyof SignupErrors) {
    setErrors((current) => ({ ...current, [field]: undefined, form: undefined }));
  }

  function completeSignup() {
    const account = { name: name.trim(), email: email.trim().toLowerCase(), password };
    saveDemoAccount(account);
    createDemoSession(account);
    router.push("/dashboard");
  }

  async function submitSignup(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) return;
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setLoading(true);
    try {
  const res = await fetch('http://localhost:5000/api/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: name.trim(), email: email.trim().toLowerCase(), password })
  });
  const data = await res.json();
  if (!res.ok) {
    setErrors(prev => ({ ...prev, form: data.error || 'Signup failed' }));
  } else {
    router.push('/login');
  }
} catch (e) {
  setErrors(prev => ({ ...prev, form: 'Network error' }));
} finally {
  setLoading(false);
}
  }

  function useDemoAccount() {
    if (loading) return;
    saveDemoAccount({ name: "Demo User", email: demoEmail, password: demoPassword });
    createDemoSession({ name: "Demo User", email: demoEmail });
    setLoading(true);
    window.setTimeout(() => router.push("/dashboard"), 450);
  }

  return <>
    <div className="social-row"><button className="social-button" type="button">G <span>Continue with Google</span></button><button className="social-button" type="button">⌘ <span>Continue with Apple</span></button></div>
    <div className="or-divider"><span>or continue with email</span></div>
    <form className="auth-form" onSubmit={submitSignup} noValidate>
      <label className="field"><span className="field-label">Your name</span><input className="input" type="text" placeholder="Alex Morgan" value={name} onChange={(event) => { setName(event.target.value); clearError("name"); }} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "signup-name-error" : undefined} autoComplete="name" />{errors.name && <span className="field-error" id="signup-name-error">{errors.name}</span>}</label>
      <label className="field"><span className="field-label">Work email</span><input className="input" type="email" placeholder="you@company.com" value={email} onChange={(event) => { setEmail(event.target.value); clearError("email"); }} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "signup-email-error" : undefined} autoComplete="email" />{errors.email && <span className="field-error" id="signup-email-error">{errors.email}</span>}</label>
      <label className="field"><span className="field-label">Password</span><input className="input" type="password" placeholder="At least 8 characters" value={password} onChange={(event) => { setPassword(event.target.value); clearError("password"); }} aria-invalid={Boolean(errors.password)} aria-describedby={errors.password ? "signup-password-error" : undefined} autoComplete="new-password" />{errors.password && <span className="field-error" id="signup-password-error">{errors.password}</span>}</label>
      <label className="field"><span className="field-label">Confirm password</span><input className="input" type="password" placeholder="Repeat your password" value={confirmPassword} onChange={(event) => { setConfirmPassword(event.target.value); clearError("confirmPassword"); }} aria-invalid={Boolean(errors.confirmPassword)} aria-describedby={errors.confirmPassword ? "signup-confirm-password-error" : undefined} autoComplete="new-password" />{errors.confirmPassword && <span className="field-error" id="signup-confirm-password-error">{errors.confirmPassword}</span>}</label>
      {errors.form && <p className="auth-error" role="alert">{errors.form}</p>}
      <button className="button button-primary auth-submit" type="submit" disabled={loading} aria-busy={loading}>{loading ? <><LoaderCircle className="button-spinner" size={15} /> Creating account...</> : <>Create account <ArrowRight size={15} /></>}</button>
    </form>
    <div className="demo-login"><div><strong>Try the demo workspace</strong><small>Creates a temporary account on this browser.</small></div><button type="button" onClick={useDemoAccount} disabled={loading}>Use demo account</button></div>
  </>;
}
