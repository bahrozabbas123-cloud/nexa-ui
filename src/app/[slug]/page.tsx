import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Card, SectionHeading, Button } from "@/components/ui";
import { pageCopy } from "@/data/mock";
import { WorkspaceView } from "@/components/workspace-view";
import { LoginForm } from "@/components/auth/login-form";
import { SignupForm } from "@/components/auth/signup-form";

export default async function GenericPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug === "login") return <LoginPage />;
  if (slug === "signup") return <SignupPage />;
  const copy = pageCopy[slug] ?? { eyebrow: "Workspace", title: "A calm place to do your best work", description: "NexaUI keeps the details close and the experience uncomplicated." };
  return <AppShell><SectionHeading eyebrow={copy.eyebrow} title={copy.title} description={copy.description} action={<Button><Plus size={16} /> Create new</Button>} /><div className="generic-layout"><Card className="generic-main"><div className="toolbar"><label className="search-control"><span className="sr-only">Search {slug}</span><input placeholder={`Search ${slug}...`} /></label><div className="toolbar-pills"><button className="filter-pill active" type="button">All</button><button className="filter-pill" type="button">Active</button><button className="filter-pill" type="button">Archived</button></div></div><WorkspaceView slug={slug} /></Card><Card className="generic-side"><p className="eyebrow">Quick start</p><h2>Make this view yours</h2><p>Every view is composed from typed, reusable pieces so your product data can take over when you are ready.</p><div className="check-list"><span>✓ Typed data structures</span><span>✓ Responsive states</span><span>✓ Accessible controls</span></div><Link className="text-button" href="/dashboard">Back to overview <ArrowRight size={15} /></Link></Card></div></AppShell>;
}

function LoginPage() {
  return <main className="auth-page"><div className="auth-brand"><Link href="/" className="brand"><span className="brand-mark">N</span><span className="brand-name">nexa<span>ui</span></span></Link><Link href="/" className="auth-back">Back to website <ArrowRight size={14} /></Link></div><div className="auth-card"><div className="auth-heading"><p className="eyebrow">Welcome to NexaUI</p><h1>Welcome back</h1><p>Sign in to continue to your workspace.</p></div><LoginForm /><p className="auth-switch">New to NexaUI? <Link href="/signup">Create an account</Link></p></div><p className="auth-footer">By continuing, you agree to NexaUI&apos;s Terms and Privacy Policy.</p></main>;
}

function SignupPage() {
  return <main className="auth-page"><div className="auth-brand"><Link href="/" className="brand"><span className="brand-mark">N</span><span className="brand-name">nexa<span>ui</span></span></Link><Link href="/" className="auth-back">Back to website <ArrowRight size={14} /></Link></div><div className="auth-card"><div className="auth-heading"><p className="eyebrow">Welcome to NexaUI</p><h1>Create your workspace</h1><p>Start building something people will love.</p></div><SignupForm /><p className="auth-switch">Already have an account? <Link href="/login">Sign in</Link></p></div><p className="auth-footer">By continuing, you agree to NexaUI&apos;s Terms and Privacy Policy.</p></main>;
}
