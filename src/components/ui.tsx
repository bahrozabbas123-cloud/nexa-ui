import { type ButtonHTMLAttributes, type InputHTMLAttributes, type ReactNode } from "react";

export function Button({ children, variant = "primary", className = "", type = "button", ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "ghost" | "soft" }) {
  return <button className={`button button-${variant} ${className}`} type={type} {...props}>{children}</button>;
}

export function Card({ children, className = "", ...props }: { children: ReactNode; className?: string } & React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`card ${className}`} {...props}>{children}</div>;
}

export function Badge({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "success" | "warning" | "danger" | "info" }) {
  return <span className={`badge badge-${tone}`}><span className="badge-dot" />{children}</span>;
}

export function Avatar({ initials, tone = "blue", size = "md" }: { initials: string; tone?: string; size?: "sm" | "md" | "lg" }) {
  return <span className={`avatar avatar-${tone} avatar-${size}`} aria-label={`Avatar for ${initials}`}>{initials}</span>;
}

export function Progress({ value, tone = "blue" }: { value: number; tone?: string }) {
  return <div className="progress-track" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100} aria-label={`${value}% complete`}><div className={`progress-bar progress-${tone}`} style={{ width: `${value}%` }} /></div>;
}

export function Input({ label, ...props }: InputHTMLAttributes<HTMLInputElement> & { label?: string }) {
  return <label className="field">{label && <span className="field-label">{label}</span>}<input className="input" {...props} /></label>;
}

export function SectionHeading({ eyebrow, title, description, action }: { eyebrow?: string; title: string; description?: string; action?: ReactNode }) {
  return <div className="section-heading"><div>{eyebrow && <p className="eyebrow">{eyebrow}</p>}<h1>{title}</h1>{description && <p className="section-description">{description}</p>}</div>{action}</div>;
}
