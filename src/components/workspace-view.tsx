"use client";

import { Check, FileText, MoreHorizontal, Send, Settings2, UsersRound } from "lucide-react";
import { Card, Avatar, Badge, Button, Input, Progress } from "@/components/ui";
import { projects } from "@/data/mock";
import { SettingsView } from "@/components/settings-view";

const users = [
  ["Jordan Miller", "jordan@northstar.io", "Admin", "Active", "2 min ago", "coral"],
  ["Sofia Kim", "sofia@orbitlabs.co", "Editor", "Active", "18 min ago", "blue"],
  ["Owen Davis", "owen@fable.studio", "Viewer", "Away", "1 hour ago", "green"],
  ["Lena Novak", "lena@frame.io", "Editor", "Active", "3 hours ago", "purple"],
] as const;

const tasks = [
  { title: "Review Q4 campaign brief", owner: "JM", tone: "coral", tag: "Marketing" },
  { title: "Audit onboarding events", owner: "SK", tone: "blue", tag: "Product" },
  { title: "Publish release notes", owner: "LN", tone: "purple", tag: "Content" },
  { title: "QA mobile navigation", owner: "OD", tone: "green", tag: "Engineering" },
];

export function WorkspaceView({ slug }: { slug: string }) {
  if (slug === "projects") return <ProjectsView />;
  if (slug === "users") return <UsersView />;
  if (slug === "tasks") return <TasksView />;
  if (slug === "messages") return <MessagesView />;
  if (slug === "files") return <FilesView />;
  if (slug === "analytics") return <AnalyticsView />;
  if (slug === "settings") return <SettingsView />;
  return <LegacySettingsView slug={slug} />;
}

function ProjectsView() {
  return <div className="workspace-project-grid">{projects.map((project) => <Card className="workspace-project" key={project.name}><div className={`project-color project-${project.accent}`} /><div className="workspace-project-body"><div className="project-title-row"><div><strong>{project.name}</strong><span>{project.description}</span></div><Badge tone={project.status === "At risk" ? "danger" : project.status === "In review" ? "info" : "success"}>{project.status}</Badge></div><div className="project-meta"><div className="team-stack"><Avatar initials="JM" tone="coral" size="sm" /><Avatar initials="SK" tone="blue" size="sm" /><Avatar initials="+2" tone="green" size="sm" /></div><span>{project.progress}% complete</span><span className="project-due">Due {project.due}</span></div><Progress value={project.progress} tone={project.accent} /></div></Card>)}</div>;
}

function UsersView() {
  return <div className="table-wrap workspace-table"><table><thead><tr><th>Member</th><th>Role</th><th>Status</th><th>Last active</th><th /></tr></thead><tbody>{users.map(([name, email, role, status, active, tone]) => <tr key={email}><td><div className="customer-cell"><Avatar initials={name.split(" ").map((part) => part[0]).join("")} tone={tone} size="sm" /><span><strong>{name}</strong><small>{email}</small></span></div></td><td>{role}</td><td><Badge tone={status === "Active" ? "success" : "neutral"}>{status}</Badge></td><td>{active}</td><td><button className="more-button" aria-label={`More actions for ${name}`}><MoreHorizontal size={17} /></button></td></tr>)}</tbody></table></div>;
}

function TasksView() {
  const columns = [{ title: "Todo", items: tasks.slice(0, 1) }, { title: "In progress", items: tasks.slice(1, 2) }, { title: "Review", items: tasks.slice(2, 3) }, { title: "Completed", items: tasks.slice(3) }];
  return <div className="kanban-grid">{columns.map((column) => <section className="kanban-column" key={column.title}><div className="kanban-heading"><strong>{column.title}</strong><span>{column.items.length}</span></div>{column.items.map((task) => <Card className="task-card" key={task.title}><Badge tone="info">{task.tag}</Badge><h3>{task.title}</h3><div className="task-footer"><Avatar initials={task.owner} tone={task.tone} size="sm" /><button className="more-button" aria-label={`More actions for ${task.title}`}><MoreHorizontal size={16} /></button></div></Card>)}<button className="add-task"><span>+</span> Add task</button></section>)}</div>;
}

function MessagesView() {
  return <div className="messages-layout"><div className="conversation-list"><div className="conversation active"><Avatar initials="SK" tone="blue" size="md" /><span><strong>Sofia Kim</strong><small>Can you review the latest flow?</small></span><time>10:42</time></div><div className="conversation"><Avatar initials="JM" tone="coral" size="md" /><span><strong>Jordan Miller</strong><small>The campaign is ready to ship.</small></span><time>Yesterday</time></div><div className="conversation"><Avatar initials="LN" tone="purple" size="md" /><span><strong>Lena Novak</strong><small>Added comments to the brief.</small></span><time>Mon</time></div></div><div className="message-thread"><div className="thread-header"><Avatar initials="SK" tone="blue" size="md" /><span><strong>Sofia Kim</strong><small>Product design · Online</small></span></div><div className="message-history"><div className="message received">The new onboarding flow is ready for a final look.</div><div className="message received">I kept the first-run experience focused on the activation moment.</div><div className="message sent">Looks great. I will review the edge states this afternoon.</div></div><div className="message-compose"><input placeholder="Write a message..." aria-label="Write a message" /><button className="icon-button" aria-label="Send message"><Send size={17} /></button></div></div></div>;
}

function FilesView() {
  const files = [["Q4 campaign brief.pdf", "2.4 MB", "Jordan Miller", "Today"], ["Product roadmap.fig", "8.1 MB", "Sofia Kim", "Yesterday"], ["Brand guidelines.zip", "14.8 MB", "Lena Novak", "Oct 24"], ["Customer research.csv", "824 KB", "Owen Davis", "Oct 21"]];
  return <div className="file-list">{files.map(([name, size, owner, date]) => <div className="file-row" key={name}><span className="file-icon"><FileText size={17} /></span><span className="file-name"><strong>{name}</strong><small>{size}</small></span><span>{owner}</span><span>{date}</span><button className="more-button" aria-label={`More actions for ${name}`}><MoreHorizontal size={17} /></button></div>)}<div className="storage-meter"><div><span>Workspace storage</span><strong>42.8 GB <small>of 100 GB</small></strong></div><Progress value={43} tone="blue" /></div></div>;
}

function AnalyticsView() {
  return <div className="analytics-grid"><Card className="analytics-metric"><span>Activation rate</span><strong>68.4%</strong><Badge tone="success">+6.2%</Badge><div className="metric-line"><i /><i /><i /><i /><i /><i /><i /><i /></div></Card><Card className="analytics-metric"><span>Avg. session</span><strong>08:42</strong><Badge tone="info">+14 sec</Badge><div className="metric-line blue-line"><i /><i /><i /><i /><i /><i /><i /><i /></div></Card><Card className="analytics-chart"><div className="card-heading"><div><p className="eyebrow">Acquisition</p><h2>Traffic sources</h2></div><Settings2 size={17} className="muted-icon" /></div><div className="source-list"><span><i className="source-dot coral-dot" />Organic search <b>48%</b></span><span><i className="source-dot blue-dot" />Direct <b>28%</b></span><span><i className="source-dot green-dot" />Social <b>16%</b></span><span><i className="source-dot gold-dot" />Referral <b>8%</b></span></div></Card><Card className="analytics-chart"><div className="card-heading"><div><p className="eyebrow">Retention</p><h2>Returning users</h2></div><UsersRound size={17} className="muted-icon" /></div><div className="retention-number">72.8% <Badge tone="success">+4.1%</Badge></div><Progress value={73} tone="green" /><p className="chart-caption">Users returning within 30 days</p></Card></div>;
}

function LegacySettingsView({ slug }: { slug: string }) {
  const heading = slug === "billing" ? "Plan & usage" : slug === "profile" ? "Personal details" : "Workspace preferences";
  return <div className="settings-layout"><Card className="settings-card"><div className="settings-title"><span className="feature-icon">{slug === "billing" ? <FileText size={19} /> : slug === "profile" ? <UsersRound size={19} /> : <Settings2 size={19} />}</span><div><h2>{heading}</h2><p>Keep your workspace details current and useful.</p></div></div><div className="settings-form"><Input label={slug === "profile" ? "Full name" : "Workspace name"} defaultValue={slug === "profile" ? "Alex Morgan" : "Northstar Studio"} /><Input label="Email address" defaultValue="alex@northstar.io" type="email" /><div className="settings-actions"><Button variant="secondary">Cancel</Button><Button>Save changes <Check size={15} /></Button></div></div></Card><Card className="settings-summary"><p className="eyebrow">Workspace health</p><h2>Everything looks good</h2><p>Your workspace is configured and ready for the next stage of growth.</p><div className="summary-check"><Check size={15} /> All systems operational</div><div className="summary-check"><Check size={15} /> Weekly digest enabled</div></Card></div>;
}
