export const revenueData = [
  { name: "Jan", revenue: 18400, target: 15000 },
  { name: "Feb", revenue: 22100, target: 19000 },
  { name: "Mar", revenue: 19800, target: 21000 },
  { name: "Apr", revenue: 27600, target: 23000 },
  { name: "May", revenue: 31200, target: 28000 },
  { name: "Jun", revenue: 35400, target: 32000 },
  { name: "Jul", revenue: 38900, target: 35000 },
  { name: "Aug", revenue: 42200, target: 37000 },
  { name: "Sep", revenue: 46800, target: 41000 },
  { name: "Oct", revenue: 51500, target: 46000 },
  { name: "Nov", revenue: 58200, target: 51000 },
  { name: "Dec", revenue: 63800, target: 57000 },
];

export const activities = [
  { initials: "JM", name: "Jordan Miller", action: "upgraded to Pro", time: "12 min ago", color: "coral" },
  { initials: "SK", name: "Sofia Kim", action: "completed Website redesign", time: "48 min ago", color: "blue" },
  { initials: "OD", name: "Owen Davis", action: "joined the workspace", time: "2 hours ago", color: "green" },
  { initials: "LN", name: "Lena Novak", action: "commented on Mobile app", time: "4 hours ago", color: "purple" },
];

export const transactions = [
  { initials: "JM", customer: "Jordan Miller", email: "jordan@northstar.io", amount: "$2,400.00", status: "Paid", date: "Today, 10:24 AM" },
  { initials: "SK", customer: "Sofia Kim", email: "sofia@orbitlabs.co", amount: "$1,840.00", status: "Paid", date: "Yesterday, 4:18 PM" },
  { initials: "OD", customer: "Owen Davis", email: "owen@fable.studio", amount: "$980.00", status: "Pending", date: "Oct 24, 2024" },
  { initials: "LN", customer: "Lena Novak", email: "lena@frame.io", amount: "$3,200.00", status: "Paid", date: "Oct 22, 2024" },
];

export const projects = [
  { name: "Website redesign", description: "Marketing site & brand refresh", progress: 78, status: "On track", due: "Nov 18", team: ["SK", "LN", "JM"], accent: "blue" },
  { name: "Mobile application", description: "iOS and Android experience", progress: 46, status: "In review", due: "Dec 02", team: ["OD", "JM", "SK"], accent: "purple" },
  { name: "Q4 growth campaign", description: "Acquisition & lifecycle experiments", progress: 92, status: "On track", due: "Nov 12", team: ["LN", "OD"], accent: "orange" },
  { name: "Customer portal", description: "Self-serve account management", progress: 24, status: "At risk", due: "Dec 18", team: ["JM", "SK"], accent: "green" },
];

export const navGroups = [
  { label: "Workspace", items: [
    { label: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
    { label: "Analytics", href: "/analytics", icon: "ChartNoAxesCombined" },
    { label: "Projects", href: "/projects", icon: "FolderKanban" },
  ] },
  { label: "Manage", items: [
    { label: "Users", href: "/users", icon: "Users" },
    { label: "Tasks", href: "/tasks", icon: "ListTodo" },
    { label: "Messages", href: "/messages", icon: "MessagesSquare" },
    { label: "Files", href: "/files", icon: "Files" },
  ] },
  { label: "Workspace settings", items: [
    { label: "Billing", href: "/billing", icon: "CreditCard" },
    { label: "Settings", href: "/settings", icon: "Settings" },
  ] },
];

export const pageCopy: Record<string, { eyebrow: string; title: string; description: string }> = {
  analytics: { eyebrow: "Insights", title: "Analytics that move the work forward", description: "Understand what is happening across your workspace with clear, actionable reporting." },
  projects: { eyebrow: "Delivery", title: "Projects, in one clear view", description: "Keep every initiative moving with shared context, owners, and momentum." },
  users: { eyebrow: "Workspace", title: "Your people, organized", description: "Manage members, roles, and access without losing the human context." },
  tasks: { eyebrow: "Focus", title: "Make progress visible", description: "A calm place for the team to prioritize the work that matters most." },
  messages: { eyebrow: "Communication", title: "Keep the conversation close", description: "Share decisions, feedback, and updates without leaving the workspace." },
  files: { eyebrow: "Library", title: "Everything your team needs", description: "Find project files quickly and keep important work within reach." },
  billing: { eyebrow: "Workspace settings", title: "Simple, transparent billing", description: "Your plan, usage, and invoices are all in one place." },
  settings: { eyebrow: "Workspace settings", title: "Make NexaUI yours", description: "Tune your workspace preferences and notification habits." },
  profile: { eyebrow: "Account", title: "Your profile", description: "Manage your personal details and workspace presence." },
};
