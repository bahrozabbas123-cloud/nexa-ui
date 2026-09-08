"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, CalendarDays, Check, ChevronDown, Clock3, Download, MoreHorizontal, Plus, Sparkles, TrendingUp, UsersRound, X } from "lucide-react";
import { activities, projects as seedProjects, revenueData, transactions } from "@/data/mock";
import { getCurrentDemoUser } from "@/lib/auth";
import { RevenueChart } from "@/components/charts";
import { Avatar, Badge, Button, Card, Progress } from "@/components/ui";

type Project = (typeof seedProjects)[number];
type DetailModal = { title: string; eyebrow: string; body: string } | null;
type Task = { title: string; owner: string; tone: string; due: string; status: string };

const statCards = [
  { label: "Total revenue", value: "$128,430", change: "+18.2%", comparison: "vs. last month", icon: TrendingUp, tone: "coral", bars: "▂▃▅▆▇", detail: "Revenue is ahead of target by $8,420 this period." },
  { label: "Active users", value: "24,892", change: "+12.6%", comparison: "vs. last month", icon: UsersRound, tone: "blue", bars: "▃▂▅▃▇", detail: "2,184 users were active in the last 24 hours." },
  { label: "New customers", value: "1,429", change: "+8.4%", comparison: "vs. last month", icon: Sparkles, tone: "green", bars: "▂▃▃▆▅", detail: "314 new customers joined from your top three channels." },
  { label: "Conversion rate", value: "4.86%", change: "-1.2%", comparison: "vs. last month", icon: ArrowUpRight, tone: "purple", bars: "▆▅▇▅▃", negative: true, detail: "Conversion dipped on mobile traffic. Review the onboarding funnel." },
];

const taskSeed: Task[] = [
  { title: "Review Q4 campaign brief", owner: "JM", tone: "coral", due: "Today", status: "In review" },
  { title: "Audit onboarding events", owner: "SK", tone: "blue", due: "Tomorrow", status: "In progress" },
  { title: "Publish release notes", owner: "LN", tone: "purple", due: "Friday", status: "Todo" },
];

export function Dashboard() {
  const demoUser = getCurrentDemoUser();
  const [period, setPeriod] = useState("12 months");
  const [dateRange, setDateRange] = useState("Oct 01 - Oct 31");
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [modal, setModal] = useState<DetailModal>(null);
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectError, setProjectError] = useState("");
  const [toast, setToast] = useState("");
  const [tasks, setTasks] = useState<Task[]>(taskSeed);
  const [projects, setProjects] = useState<Project[]>(() => {
    if (typeof window === "undefined") return seedProjects;
    try {
      const stored = window.localStorage.getItem("nexaui_dashboard_projects");
      return stored ? JSON.parse(stored) as Project[] : seedProjects;
    } catch {
      return seedProjects;
    }
  });

  const chartData = dateRange === "Q4 2024" || period === "7 days" ? revenueData.slice(-3) : dateRange === "Sep 01 - Sep 30" || period === "30 days" ? revenueData.slice(-6) : revenueData;
  const displayName = demoUser?.name?.split(" ")[0] ?? "Alex";

  function showToast(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2600);
  }

  function downloadFile(filename: string, content: string, type: string, message: string) {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([content], { type }));
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
    showToast(message);
  }

  async function copyChartData() {
    await navigator.clipboard?.writeText(JSON.stringify(chartData));
    showToast("Chart data copied");
  }

  function addToReport(label: string) {
    const current = JSON.parse(window.localStorage.getItem("nexaui_dashboard_report_cards") || "[]") as string[];
    if (!current.includes(label)) window.localStorage.setItem("nexaui_dashboard_report_cards", JSON.stringify([...current, label]));
    showToast(`${label} added to your report`);
  }

  function createProject(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!projectName.trim()) {
      setProjectError("Add a project name to continue.");
      return;
    }
    const newProject: Project = { name: projectName.trim(), description: projectDescription.trim() || "New workspace initiative", progress: 0, status: "On track", due: "Dec 20", team: ["AM"], accent: "coral" };
    const nextProjects = [newProject, ...projects];
    setProjects(nextProjects);
    window.localStorage.setItem("nexaui_dashboard_projects", JSON.stringify(nextProjects));
    setProjectName("");
    setProjectDescription("");
    setProjectError("");
    setProjectModalOpen(false);
    showToast("Project created");
  }

  function addTask() {
    setTasks((current) => [...current, { title: "Plan next team milestone", owner: "AM", tone: "coral", due: "Next week", status: "Todo" }]);
    showToast("Task added to Todo");
  }

  return <div className="dashboard-page" onClick={() => openMenu && setOpenMenu(null)}>
    <div className="welcome-row"><div><p className="eyebrow">Thursday, October 31, 2024</p><h1>Good morning, {displayName} <span className="wave">✦</span></h1><p className="section-description">Here is what is happening across your workspace today.</p></div><div className="welcome-actions"><div className="dashboard-dropdown" onClick={(event) => event.stopPropagation()}><Button variant="secondary" onClick={() => setOpenMenu(openMenu === "date" ? null : "date")} aria-expanded={openMenu === "date"}><CalendarDays size={16} /> {dateRange} <ChevronDown size={15} /></Button>{openMenu === "date" && <DashboardMenu className="date-menu"><button onClick={() => { setDateRange("Oct 01 - Oct 31"); setOpenMenu(null); showToast("Showing October data"); }}>Oct 01 - Oct 31</button><button onClick={() => { setDateRange("Sep 01 - Sep 30"); setOpenMenu(null); showToast("Showing September data"); }}>Sep 01 - Sep 30</button><button onClick={() => { setDateRange("Q4 2024"); setOpenMenu(null); showToast("Showing Q4 data"); }}>Q4 2024</button></DashboardMenu>}</div><Button onClick={() => setProjectModalOpen(true)}><Plus size={17} /> New project</Button></div></div>
    <div className="stats-grid">{statCards.map((stat) => <Card className="stat-card" key={stat.label}><div className="stat-top"><button className={`stat-icon icon-${stat.tone}`} onClick={() => setModal({ title: stat.label, eyebrow: "Metric detail", body: stat.detail })} aria-label={`View ${stat.label} details`}><stat.icon size={17} /></button><div className="dashboard-dropdown" onClick={(event) => event.stopPropagation()}><button className="more-button" onClick={() => setOpenMenu(openMenu === stat.label ? null : stat.label)} aria-label={`More options for ${stat.label}`} aria-expanded={openMenu === stat.label}><MoreHorizontal size={18} /></button>{openMenu === stat.label && <DashboardMenu><button onClick={() => setModal({ title: stat.label, eyebrow: "Metric detail", body: stat.detail })}>View details</button><button onClick={() => addToReport(stat.label)}>Add to report</button></DashboardMenu>}</div></div><p className="stat-label">{stat.label}</p><div className="stat-value-row"><strong>{stat.value}</strong><span className={`stat-change ${stat.negative ? "negative" : ""}`}>{stat.change}</span></div><p className="stat-comparison">{stat.comparison}</p><div className={`stat-spark spark-${stat.tone}`}>{stat.bars}</div></Card>)}</div>
    <div className="dashboard-grid"><Card className="revenue-card"><div className="card-heading"><div><p className="eyebrow">Performance</p><h2>Revenue overview</h2></div><div className="chart-actions">{["12 months", "30 days", "7 days"].map((option) => <button key={option} className={`chart-period ${period === option ? "active" : ""}`} onClick={() => setPeriod(option)} aria-pressed={period === option}>{option}</button>)}<div className="dashboard-dropdown" onClick={(event) => event.stopPropagation()}><button className="more-button" onClick={() => setOpenMenu(openMenu === "revenue" ? null : "revenue")} aria-label="Revenue chart options" aria-expanded={openMenu === "revenue"}><MoreHorizontal size={18} /></button>{openMenu === "revenue" && <DashboardMenu><button onClick={copyChartData}>Copy chart data</button><button onClick={() => downloadFile("nexaui-revenue.csv", `Period,Revenue\n${chartData.map((item) => `${item.name},${item.revenue}`).join("\n")}`, "text/csv", "Revenue report exported")}>Export report</button></DashboardMenu>}</div></div></div><div className="revenue-summary"><strong>{period === "7 days" ? "$38,900.00" : period === "30 days" ? "$63,800.00" : "$128,430.00"}</strong><span className="positive-pill">+18.2%</span><span>compared to the previous period</span></div><div className="chart-area"><RevenueChart data={chartData} /></div></Card><Card className="activity-card"><div className="card-heading"><div><p className="eyebrow">Live feed</p><h2>Recent activity</h2></div><button className="text-button" onClick={() => setModal({ title: "Recent activity", eyebrow: "Live feed", body: "You are viewing the latest workspace activity. New events will appear here as your team works." })}>View all <ArrowUpRight size={15} /></button></div><div className="activity-list">{activities.map((activity) => <button className="activity-item activity-button" key={activity.name} onClick={() => setModal({ title: activity.name, eyebrow: "Activity detail", body: `${activity.name} ${activity.action}. This activity was recorded ${activity.time}.` })}><Avatar initials={activity.initials} tone={activity.color} size="md" /><span className="activity-copy"><p><strong>{activity.name}</strong> {activity.action}</p><span><Clock3 size={12} />{activity.time}</span></span><ArrowUpRight size={14} /></button>)}</div><div className="activity-footer"><span className="live-dot" /> Live updates enabled</div></Card></div>
    <div className="dashboard-grid lower-grid"><Card className="transactions-card"><div className="card-heading"><div><p className="eyebrow">Cash flow</p><h2>Recent transactions</h2></div><Button variant="ghost" onClick={() => downloadFile("nexaui-transactions.csv", ["Customer,Email,Amount,Status,Date", ...transactions.map((item) => `${item.customer},${item.email},${item.amount},${item.status},${item.date}`)].join("\n"), "text/csv", "Transactions exported")}><Download size={15} /> Export</Button></div><div className="table-wrap"><table><thead><tr><th>Customer</th><th>Amount</th><th>Status</th><th>Date</th><th /></tr></thead><tbody>{transactions.map((transaction) => <tr key={transaction.email}><td><div className="customer-cell"><Avatar initials={transaction.initials} tone="blue" size="sm" /><span><strong>{transaction.customer}</strong><small>{transaction.email}</small></span></div></td><td className="amount-cell">{transaction.amount}</td><td><Badge tone={transaction.status === "Paid" ? "success" : "warning"}>{transaction.status}</Badge></td><td className="date-cell">{transaction.date}</td><td><div className="dashboard-dropdown" onClick={(event) => event.stopPropagation()}><button className="more-button" onClick={() => setOpenMenu(openMenu === transaction.email ? null : transaction.email)} aria-label={`More options for ${transaction.customer}`} aria-expanded={openMenu === transaction.email}><MoreHorizontal size={17} /></button>{openMenu === transaction.email && <DashboardMenu><button onClick={() => setModal({ title: transaction.customer, eyebrow: "Transaction detail", body: `${transaction.amount} was ${transaction.status.toLowerCase()} on ${transaction.date}.` })}>View details</button><button onClick={() => downloadFile(`${transaction.customer.toLowerCase().replaceAll(" ", "-")}-receipt.txt`, `${transaction.customer}\n${transaction.amount}\n${transaction.status}\n${transaction.date}`, "text/plain", "Receipt downloaded")}>Download receipt</button></DashboardMenu>}</div></td></tr>)}</tbody></table></div></Card><Card className="projects-card"><div className="card-heading"><div><p className="eyebrow">Delivery</p><h2>Active projects</h2></div><Link className="text-button" href="/projects">View all <ArrowUpRight size={15} /></Link></div><div className="project-list">{projects.slice(0, 3).map((project) => <button className="project-item project-button" key={project.name} onClick={() => setModal({ title: project.name, eyebrow: "Project detail", body: `${project.description}. ${project.progress}% complete and due ${project.due}.` })}><div className="project-title-row"><div><strong>{project.name}</strong><span>{project.description}</span></div><Badge tone={project.status === "At risk" ? "danger" : project.status === "In review" ? "info" : "success"}>{project.status}</Badge></div><div className="project-meta"><div className="team-stack">{project.team.map((member, index) => <Avatar key={member} initials={member} tone={["blue", "coral", "green"][index % 3]} size="sm" />)}</div><span>{project.progress}%</span><span className="project-due">Due {project.due}</span></div><Progress value={project.progress} tone={project.accent} /></button>)}</div></Card></div>
    <Card className="tasks-card"><div className="card-heading"><div><p className="eyebrow">Focus</p><h2>Priority tasks</h2></div><Link className="text-button" href="/tasks">View all <ArrowUpRight size={15} /></Link></div><div className="dashboard-task-list">{tasks.map((task) => <button className="dashboard-task" key={task.title} onClick={() => setModal({ title: task.title, eyebrow: task.status, body: `Owned by ${task.owner}. Due ${task.due}.` })}><Avatar initials={task.owner} tone={task.tone} size="sm" /><span><strong>{task.title}</strong><small>{task.status} · Due {task.due}</small></span><ArrowUpRight size={14} /></button>)}<button className="add-task dashboard-add-task" onClick={addTask}><Plus size={15} /> Add task</button></div></Card>
    {toast && <div className="dashboard-toast" role="status"><Check size={15} /> {toast}</div>}
    {projectModalOpen && <ProjectDialog name={projectName} description={projectDescription} error={projectError} onNameChange={(value) => { setProjectName(value); setProjectError(""); }} onDescriptionChange={setProjectDescription} onClose={() => setProjectModalOpen(false)} onSubmit={createProject} />}
    {modal && <DetailDialog modal={modal} onClose={() => setModal(null)} />}
  </div>;
}

function DashboardMenu({ children, className = "" }: { children: React.ReactNode; className?: string }) { return <div className={`dashboard-menu ${className}`}>{children}</div>; }
function ProjectDialog({ name, description, error, onNameChange, onDescriptionChange, onClose, onSubmit }: { name: string; description: string; error: string; onNameChange: (value: string) => void; onDescriptionChange: (value: string) => void; onClose: () => void; onSubmit: (event: React.FormEvent<HTMLFormElement>) => void }) { return <div className="dashboard-modal-backdrop" role="presentation" onMouseDown={onClose}><div className="dashboard-modal" role="dialog" aria-modal="true" aria-labelledby="create-project-title" onMouseDown={(event) => event.stopPropagation()}><div className="modal-header"><div><p className="eyebrow">Delivery</p><h2 id="create-project-title">Create a project</h2></div><button className="icon-button" type="button" onClick={onClose} aria-label="Close create project dialog"><X size={18} /></button></div><form className="dashboard-project-form" onSubmit={onSubmit}><label className="field"><span className="field-label">Project name</span><input className="input" value={name} onChange={(event) => onNameChange(event.target.value)} placeholder="e.g. Mobile app refresh" autoFocus />{error && <span className="field-error">{error}</span>}</label><label className="field"><span className="field-label">Description</span><textarea className="input dashboard-textarea" value={description} onChange={(event) => onDescriptionChange(event.target.value)} placeholder="What is this project about?" /></label><div className="modal-actions"><Button variant="secondary" type="button" onClick={onClose}>Cancel</Button><Button type="submit">Create project <ArrowUpRight size={15} /></Button></div></form></div></div>; }
function DetailDialog({ modal, onClose }: { modal: NonNullable<DetailModal>; onClose: () => void }) { return <div className="dashboard-modal-backdrop" role="presentation" onMouseDown={onClose}><div className="dashboard-modal detail-modal" role="dialog" aria-modal="true" aria-labelledby="detail-title" onMouseDown={(event) => event.stopPropagation()}><div className="modal-header"><div><p className="eyebrow">{modal.eyebrow}</p><h2 id="detail-title">{modal.title}</h2></div><button className="icon-button" type="button" onClick={onClose} aria-label="Close detail dialog"><X size={18} /></button></div><p className="modal-body-copy">{modal.body}</p><div className="modal-actions"><Button onClick={onClose}>Done</Button></div></div></div>; }
