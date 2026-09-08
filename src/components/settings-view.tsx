"use client";

import { useState } from "react";
import { Bell, Check, CreditCard, ExternalLink, KeyRound, Link2, LockKeyhole, Palette, Save, ShieldCheck, UserRound, UsersRound, X } from "lucide-react";
import { Button, Input } from "@/components/ui";

const settingsKey = "nexaui_demo_settings";

type SettingsState = {
  name: string;
  email: string;
  role: string;
  timezone: string;
  theme: string;
  density: string;
  weeklyDigest: boolean;
  productUpdates: boolean;
  securityAlerts: boolean;
  desktopNotifications: boolean;
  twoFactor: boolean;
};

const defaultSettings: SettingsState = {
  name: "Alex Morgan",
  email: "alex@northstar.io",
  role: "Product administrator",
  timezone: "America/Los_Angeles",
  theme: "system",
  density: "comfortable",
  weeklyDigest: true,
  productUpdates: true,
  securityAlerts: true,
  desktopNotifications: false,
  twoFactor: false,
};

const sections = [
  { id: "profile", label: "Profile", icon: UserRound },
  { id: "account", label: "Account", icon: UsersRound },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: ShieldCheck },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "connected", label: "Connected accounts", icon: Link2 },
  { id: "danger", label: "Danger zone", icon: LockKeyhole },
];

export function SettingsView() {
  const [settings, setSettings] = useState<SettingsState>(() => {
    if (typeof window === "undefined") return defaultSettings;
    const stored = window.localStorage.getItem(settingsKey);
    if (!stored) return defaultSettings;
    try {
      return { ...defaultSettings, ...JSON.parse(stored) };
    } catch {
      window.localStorage.removeItem(settingsKey);
      return defaultSettings;
    }
  });
  const [activeSection, setActiveSection] = useState("profile");
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function update<K extends keyof SettingsState>(key: K, value: SettingsState[K]) {
    setSettings((current) => ({ ...current, [key]: value }));
    setSaved(false);
    setError("");
  }

  function saveSettings(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!settings.name.trim()) {
      setError("Your name is required.");
      setActiveSection("profile");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(settings.email)) {
      setError("Enter a valid email address.");
      setActiveSection("profile");
      return;
    }
    setSaving(true);
    window.setTimeout(() => {
      window.localStorage.setItem(settingsKey, JSON.stringify(settings));
      setSaving(false);
      setSaved(true);
    }, 450);
  }

  function cancelChanges() {
    const stored = window.localStorage.getItem(settingsKey);
    setSettings(stored ? { ...defaultSettings, ...JSON.parse(stored) } : defaultSettings);
    setSaved(false);
    setError("");
  }

  return <form className="settings-experience" onSubmit={saveSettings}>
    <div className="settings-nav" role="tablist" aria-label="Settings sections">{sections.map((section) => { const Icon = section.icon; return <button key={section.id} className={`settings-nav-item ${activeSection === section.id ? "active" : ""}`} type="button" role="tab" aria-selected={activeSection === section.id} onClick={() => setActiveSection(section.id)}><Icon size={16} /><span>{section.label}</span></button>; })}</div>
    <div className="settings-panel"><div className="settings-panel-header"><div><p className="eyebrow">Workspace preferences</p><h2>{sections.find((section) => section.id === activeSection)?.label}</h2><p>Manage how NexaUI works for you and your team.</p></div><div className="settings-actions">{saved && <span className="save-confirmation"><Check size={14} /> Saved</span>}<Button variant="secondary" onClick={cancelChanges}><X size={14} /> Cancel</Button><Button type="submit" disabled={saving}>{saving ? "Saving..." : <><Save size={14} /> Save changes</>}</Button></div></div>{error && <p className="settings-error" role="alert">{error}</p>}<div className="settings-content">{activeSection === "profile" && <ProfileSection settings={settings} update={update} />}{activeSection === "account" && <AccountSection settings={settings} update={update} />}{activeSection === "appearance" && <AppearanceSection settings={settings} update={update} />}{activeSection === "notifications" && <NotificationsSection settings={settings} update={update} />}{activeSection === "security" && <SecuritySection settings={settings} update={update} />}{activeSection === "billing" && <BillingSection />}{activeSection === "connected" && <ConnectedSection />}{activeSection === "danger" && <DangerSection />}</div></div>
  </form>;
}

type SettingsProps = { settings: SettingsState; update: <K extends keyof SettingsState>(key: K, value: SettingsState[K]) => void };

function ProfileSection({ settings, update }: SettingsProps) { return <div className="settings-section-body"><div className="settings-avatar-row"><span className="settings-avatar">{settings.name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase() || "AM"}</span><div><strong>Profile photo</strong><p>Shown across your workspace activity.</p></div><Button variant="secondary" type="button">Change photo</Button></div><div className="settings-form-grid"><Input label="Full name" value={settings.name} onChange={(event) => update("name", event.target.value)} /><Input label="Email address" type="email" value={settings.email} onChange={(event) => update("email", event.target.value)} /><label className="field"><span className="field-label">Role</span><select className="input" value={settings.role} onChange={(event) => update("role", event.target.value)}><option>Product administrator</option><option>Product manager</option><option>Designer</option><option>Developer</option></select></label><label className="field"><span className="field-label">Timezone</span><select className="input" value={settings.timezone} onChange={(event) => update("timezone", event.target.value)}><option value="America/Los_Angeles">Pacific Time (PT)</option><option value="America/New_York">Eastern Time (ET)</option><option value="Europe/London">London (GMT)</option><option value="Asia/Tokyo">Tokyo (JST)</option></select></label></div></div>; }

function AccountSection({ settings, update }: SettingsProps) { return <div className="settings-section-body"><div className="settings-info-row"><div><strong>Northstar Studio</strong><p>Workspace ID: nx_4fd82a</p></div><span className="settings-plan-badge">Pro plan</span></div><div className="settings-form-grid"><Input label="Workspace name" defaultValue="Northstar Studio" /><Input label="Workspace URL" defaultValue="northstar.nexaui.dev" /></div><div className="settings-callout"><UsersRound size={17} /><span><strong>Team members</strong><small>12 of 25 seats are currently in use.</small></span><Button variant="soft" type="button">Manage members</Button></div><input type="hidden" value={settings.email} onChange={() => update("email", settings.email)} /></div>; }

function AppearanceSection({ settings, update }: SettingsProps) { return <div className="settings-section-body"><ChoiceGroup label="Color theme" description="Choose how NexaUI looks on this device." value={settings.theme} options={[{ value: "light", label: "Light" }, { value: "system", label: "System" }, { value: "dark", label: "Dark" }]} onChange={(value) => update("theme", value)} /><ChoiceGroup label="Interface density" description="Adjust the amount of information shown in lists and tables." value={settings.density} options={[{ value: "compact", label: "Compact" }, { value: "comfortable", label: "Comfortable" }, { value: "spacious", label: "Spacious" }]} onChange={(value) => update("density", value)} /></div>; }

function NotificationsSection({ settings, update }: SettingsProps) { return <div className="settings-section-body"><Toggle label="Weekly digest" description="A summary of workspace activity every Monday." checked={settings.weeklyDigest} onChange={(value) => update("weeklyDigest", value)} /><Toggle label="Product updates" description="News about new NexaUI features and improvements." checked={settings.productUpdates} onChange={(value) => update("productUpdates", value)} /><Toggle label="Security alerts" description="Important alerts about account access and changes." checked={settings.securityAlerts} onChange={(value) => update("securityAlerts", value)} /><Toggle label="Desktop notifications" description="Receive notifications while NexaUI is open." checked={settings.desktopNotifications} onChange={(value) => update("desktopNotifications", value)} /></div>; }

function SecuritySection({ settings, update }: SettingsProps) { return <div className="settings-section-body"><div className="security-method"><span className="security-icon"><KeyRound size={18} /></span><div><strong>Password</strong><p>Last changed 42 days ago.</p></div><Button variant="secondary" type="button">Change password</Button></div><Toggle label="Two-step verification" description="Add another layer of protection to your account. Demo only." checked={settings.twoFactor} onChange={(value) => update("twoFactor", value)} /><div className="security-method"><span className="security-icon"><LockKeyhole size={18} /></span><div><strong>Active sessions</strong><p>1 session on this browser.</p></div><Button variant="ghost" type="button">Review sessions <ExternalLink size={14} /></Button></div></div>; }

function BillingSection() { return <div className="settings-section-body"><div className="settings-info-row"><div><p className="eyebrow">Current plan</p><strong>Pro plan</strong><p>Renews on November 30, 2024.</p></div><strong className="settings-price">$79<small>/ month</small></strong></div><div className="usage-grid"><span><small>Members</small><strong>12 / 25</strong></span><span><small>Storage</small><strong>42.8 / 100 GB</strong></span><span><small>Projects</small><strong>18 / unlimited</strong></span></div><Button variant="secondary" type="button">View billing details <ExternalLink size={14} /></Button></div>; }

function ConnectedSection() { return <div className="settings-section-body"><ConnectedRow name="Slack" detail="Notifications in #northstar-product" connected /><ConnectedRow name="GitHub" detail="northstar-studio / product" connected /><ConnectedRow name="Linear" detail="Sync projects and issues" /></div>; }
function ConnectedRow({ name, detail, connected = false }: { name: string; detail: string; connected?: boolean }) { return <div className="connected-row"><span className="connected-logo">{name[0]}</span><span><strong>{name}</strong><small>{detail}</small></span><Button variant={connected ? "ghost" : "soft"} type="button">{connected ? "Connected" : "Connect"}</Button></div>; }
function DangerSection() { return <div className="settings-section-body"><div className="danger-card"><div><strong>Export workspace data</strong><p>Download a copy of your workspace data before making changes.</p></div><Button variant="secondary" type="button">Request export</Button></div><div className="danger-card destructive"><div><strong>Delete workspace</strong><p>Permanently remove this demo workspace and its data. This action cannot be undone.</p></div><Button variant="secondary" type="button">Delete workspace</Button></div></div>; }
function ChoiceGroup({ label, description, value, options, onChange }: { label: string; description: string; value: string; options: { value: string; label: string }[]; onChange: (value: string) => void }) { return <div className="choice-group"><div><strong>{label}</strong><p>{description}</p></div><div className="choice-options">{options.map((option) => <button key={option.value} className={value === option.value ? "choice active" : "choice"} type="button" onClick={() => onChange(option.value)} aria-pressed={value === option.value}>{option.label}</button>)}</div></div>; }
function Toggle({ label, description, checked, onChange }: { label: string; description: string; checked: boolean; onChange: (value: boolean) => void }) { return <div className="toggle-row"><div><strong>{label}</strong><p>{description}</p></div><button className={checked ? "toggle active" : "toggle"} type="button" role="switch" aria-label={label} aria-checked={checked} onClick={() => onChange(!checked)}><span /></button></div>; }
