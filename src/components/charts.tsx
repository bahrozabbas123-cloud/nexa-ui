"use client";

import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { revenueData } from "@/data/mock";

const tooltipStyle = { backgroundColor: "#17212b", border: "0", borderRadius: "10px", color: "#fff" };

export function RevenueChart({ data = revenueData }: { data?: typeof revenueData }) {
  return <ResponsiveContainer width="100%" height="100%"><AreaChart data={data} margin={{ top: 12, right: 8, left: -20, bottom: 0 }}><defs><linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#e8845c" stopOpacity={0.28} /><stop offset="100%" stopColor="#e8845c" stopOpacity={0} /></linearGradient></defs><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e8ebe8" /><XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#929c9b", fontSize: 11 }} /><YAxis axisLine={false} tickLine={false} tick={{ fill: "#929c9b", fontSize: 11 }} tickFormatter={(value) => `$${value / 1000}k`} /><Tooltip contentStyle={tooltipStyle} formatter={(value) => [`$${Number(value).toLocaleString()}`, "Revenue"]} /><Area type="monotone" dataKey="revenue" stroke="#e8845c" strokeWidth={3} fill="url(#revenueFill)" activeDot={{ r: 5, fill: "#e8845c", stroke: "#fff", strokeWidth: 3 }} /></AreaChart></ResponsiveContainer>;
}

export function MiniBars() {
  const data = revenueData.slice(4, 12);
  return <ResponsiveContainer width="100%" height="100%"><BarChart data={data} margin={{ top: 4, right: 0, left: -30, bottom: 0 }}><Bar dataKey="revenue" radius={[4, 4, 0, 0]} fill="#6c8da2" /><XAxis dataKey="name" hide /><YAxis hide /><Tooltip cursor={{ fill: "transparent" }} contentStyle={tooltipStyle} /></BarChart></ResponsiveContainer>;
}

export function TrafficChart() {
  const data = [{ name: "Organic", value: 48, color: "#e8845c" }, { name: "Direct", value: 28, color: "#6c8da2" }, { name: "Social", value: 16, color: "#9ab28b" }, { name: "Referral", value: 8, color: "#d8bd7c" }];
  return <ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={data} innerRadius={58} outerRadius={82} paddingAngle={4} dataKey="value" stroke="none">{data.map((entry) => <Cell key={entry.name} fill={entry.color} />)}</Pie><Tooltip contentStyle={tooltipStyle} formatter={(value) => [`${value}%`, "Traffic"]} /></PieChart></ResponsiveContainer>;
}
