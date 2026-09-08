"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowRight, Bell, ChartNoAxesCombined, ChevronDown, CreditCard, Files, FolderKanban, LayoutDashboard, ListTodo, LogOut, Menu, MessagesSquare, Moon, PanelLeftClose, PanelLeftOpen, Search, Settings, Sun, Users, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { navGroups } from "@/data/mock";
import { clearDemoSession, getCurrentDemoUser, type DemoSession } from "@/lib/auth";

const icons = { LayoutDashboard, ChartNoAxesCombined, FolderKanban, Users, ListTodo, MessagesSquare, Files, CreditCard, Settings };

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [demoUser] = useState<DemoSession | null>(() => getCurrentDemoUser());
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFeedback, setSearchFeedback] = useState("");
  const userMenuRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        setUserMenuOpen(false);
        setNotificationsOpen(false);
      }
    };
    const closeOnOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node;
      if (!userMenuRef.current?.contains(target)) setUserMenuOpen(false);
      if (!notificationsRef.current?.contains(target)) setNotificationsOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("mousedown", closeOnOutsideClick);
    };
  }, []);
  function logout() {
    clearDemoSession();
    router.replace("/login");
  }
  function submitSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = searchQuery.trim().toLowerCase();
    const match = navGroups.flatMap((group) => group.items).find((item) => item.label.toLowerCase().includes(query));
    if (match) {
      setSearchFeedback("");
      setSearchQuery("");
      router.push(match.href);
    } else {
      setSearchFeedback(query ? `No workspace view matches “${searchQuery.trim()}”.` : "Type a page name to search.");
    }
  }
  const displayName = demoUser?.name ?? "Loading...";
  const initials = demoUser?.name ? demoUser.name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase() : "--";
  return <div className={`app-shell ${collapsed ? "sidebar-collapsed" : ""} ${dark ? "theme-dark" : ""}`}>
    <aside className={`sidebar ${mobileOpen ? "sidebar-open" : ""}`}>
      <div className="brand"><Link href="/dashboard" className="brand-home" aria-label="Go to dashboard"><span className="brand-mark">N</span><span className="brand-name">nexa<span>ui</span></span></Link><button className="mobile-close" onClick={() => setMobileOpen(false)} aria-label="Close navigation"><X size={18} /></button></div>
      <nav className="sidebar-nav" aria-label="Primary navigation">{navGroups.map((group) => <div className="nav-group" key={group.label}><p className="nav-label">{group.label}</p>{group.items.map((item) => { const Icon = icons[item.icon as keyof typeof icons]; const active = pathname === item.href; return <Link key={item.href} href={item.href} className={`nav-item ${active ? "nav-item-active" : ""}`} onClick={() => setMobileOpen(false)}><Icon size={18} strokeWidth={active ? 2.4 : 1.8} /><span>{item.label}</span>{item.label === "Messages" && <span className="nav-count">3</span>}</Link> })}</div>)}</nav>
      <div className="sidebar-bottom"><div className="upgrade-card"><div className="upgrade-icon">✦</div><div><strong>Unlock your edge</strong><span>Explore Pro features</span></div><ChevronDown size={15} /></div><div className="profile-row"><Link href="/profile" className="profile-link"><span className="avatar avatar-coral avatar-md">{initials}</span><span className="profile-copy"><strong>{displayName}</strong><span>Demo account</span></span></Link><button className="icon-button logout-button" onClick={logout} aria-label="Log out" title="Log out"><LogOut size={16} /></button></div><button className="collapse-button" onClick={() => setCollapsed(!collapsed)} aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"} aria-expanded={!collapsed}>{collapsed ? <PanelLeftOpen size={17} /> : <PanelLeftClose size={17} />}<span>{collapsed ? "Expand sidebar" : "Collapse sidebar"}</span></button></div>
    </aside>
    {mobileOpen && <button className="sidebar-backdrop" onClick={() => setMobileOpen(false)} aria-label="Close navigation" />}
    <div className="main-column"><header className="topbar"><button className="icon-button mobile-menu" onClick={() => setMobileOpen(true)} aria-label="Open navigation" aria-expanded={mobileOpen}><Menu size={20} /></button><button className="icon-button desktop-toggle" onClick={() => setCollapsed(!collapsed)} aria-label="Toggle sidebar">{collapsed ? <PanelLeftOpen size={19} /> : <PanelLeftClose size={19} />}</button><form className="topbar-search" onSubmit={submitSearch}><Search size={17} /><input aria-label="Search workspace" placeholder="Search anything..." value={searchQuery} onChange={(event) => { setSearchQuery(event.target.value); setSearchFeedback(""); }} /><kbd>⌘ K</kbd>{searchFeedback && <span className="search-feedback" role="status">{searchFeedback}</span>}</form><div className="topbar-actions"><button className="icon-button" onClick={() => setDark(!dark)} aria-label={dark ? "Use light theme" : "Use dark theme"} aria-pressed={dark}>{dark ? <Sun size={18} /> : <Moon size={18} />}</button><div className="menu-anchor" ref={notificationsRef}><button className="icon-button notification-button" onClick={() => { setNotificationsOpen(!notificationsOpen); setUserMenuOpen(false); }} aria-label="Notifications" aria-expanded={notificationsOpen}><Bell size={18} /><span /></button>{notificationsOpen && <div className="popover notification-popover"><div className="popover-header"><strong>Notifications</strong><span>3 new</span></div><Link href="/messages" className="notification-item" onClick={() => setNotificationsOpen(false)}><span className="notification-dot coral-dot" /><span><strong>Sofia commented on Mobile application</strong><small>12 minutes ago</small></span></Link><Link href="/projects" className="notification-item" onClick={() => setNotificationsOpen(false)}><span className="notification-dot blue-dot" /><span><strong>Website redesign is ready for review</strong><small>48 minutes ago</small></span></Link><Link href="/billing" className="notification-item" onClick={() => setNotificationsOpen(false)}><span className="notification-dot green-dot" /><span><strong>Your monthly invoice is available</strong><small>Yesterday</small></span></Link><Link href="/messages" className="popover-footer" onClick={() => setNotificationsOpen(false)}>View all notifications <ArrowRight size={13} /></Link></div>}</div><div className="menu-anchor" ref={userMenuRef}><button className="topbar-user" onClick={() => { setUserMenuOpen(!userMenuOpen); setNotificationsOpen(false); }} aria-label="Open user menu" aria-expanded={userMenuOpen}><span className="avatar avatar-coral avatar-sm">{initials}</span><ChevronDown size={15} /></button>{userMenuOpen && <div className="popover user-popover"><div className="user-popover-heading"><span className="avatar avatar-coral avatar-md">{initials}</span><span><strong>{displayName}</strong><small>{demoUser?.email ?? "Demo account"}</small></span></div><Link href="/profile" onClick={() => setUserMenuOpen(false)}><Users size={15} /> Profile</Link><Link href="/settings" onClick={() => setUserMenuOpen(false)}><Settings size={15} /> Settings</Link><button onClick={logout}><LogOut size={15} /> Log out</button></div>}</div></div></header><main className="content">{children}</main></div>
  </div>;
}
