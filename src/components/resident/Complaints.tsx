"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  MessageSquare,
  AlertCircle,
  Clock,
  CheckCircle2,
  Plus,
  Paperclip,
  Trash2,
} from "lucide-react";

/* ---------- types ---------- */
type Status = "Pending" | "In Progress" | "Resolved" | "Rejected";
type Priority = "Low" | "Medium" | "High";
type Complaint = {
  id: string;
  title: string;
  description: string;
  filedOn: string;     // ISO date
  category: string;
  status: Status;
  priority: Priority;
  attachments: number;
};

/* ---------- demo data ---------- */
const INITIAL: Complaint[] = [
  {
    id: "c1",
    title: "testing",
    description:
      "at night society member talk loudly in gate so it can be disturbing",
    filedOn: "2025-07-28",
    category: "Noise",
    status: "Pending",
    priority: "High",
    attachments: 1,
  },
];

/* ---------- helpers ---------- */
function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

function pillClass(kind: "status" | "priority", value: string) {
  if (kind === "status") {
    switch (value) {
      case "Pending":
        return "bg-amber-50 text-amber-700";
      case "In Progress":
        return "bg-blue-50 text-blue-700";
      case "Resolved":
        return "bg-emerald-50 text-emerald-700";
      case "Rejected":
        return "bg-rose-50 text-rose-700";
    }
  } else {
    // priority
    switch (value) {
      case "Low":
        return "bg-gray-100 text-gray-700";
      case "Medium":
        return "bg-orange-50 text-orange-700";
      case "High":
        return "bg-rose-50 text-rose-700";
    }
  }
}

/* ---------- page ---------- */
export default function ComplaintsPage() {
  const [items, setItems] = useState<Complaint[]>(INITIAL);
  const [showModal, setShowModal] = useState(false);

  // form state (for demo modal)
  const [form, setForm] = useState<{
    title: string;
    description: string;
    category: string;
    priority: Priority;
  }>({
    title: "",
    description: "",
    category: "Noise",
    priority: "Medium",
  });

  const stats = useMemo(() => {
    const total = items.length;
    const rejected = items.filter((c) => c.status === "Rejected").length;
    const inProgress = items.filter((c) => c.status === "In Progress").length;
    const resolved = items.filter((c) => c.status === "Resolved").length;
    return { total, rejected, inProgress, resolved };
  }, [items]);

  const addComplaint = () => {
    if (!form.title.trim() || !form.description.trim()) return;
    const c: Complaint = {
      id: `c_${Date.now()}`,
      title: form.title.trim(),
      description: form.description.trim(),
      category: form.category,
      priority: form.priority,
      status: "Pending",
      filedOn: new Date().toISOString().slice(0, 10),
      attachments: 0,
    };
    setItems((prev) => [c, ...prev]);
    setShowModal(false);
    setForm({ title: "", description: "", category: "Noise", priority: "Medium" });
  };

  const removeComplaint = (id: string) =>
    setItems((prev) => prev.filter((c) => c.id !== id));

  return (
    <div className="space-y-6 mt-20">
      {/* header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Complaints</h1>
          <p className="text-sm text-gray-600">File and track your complaints</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          File Complaint
        </button>
      </div>

      {/* stat cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <StatCard title="Total Complaints" value={stats.total} Icon={MessageSquare} tone="text-gray-700" />
        <StatCard title="Rejected" value={stats.rejected} Icon={AlertCircle} tone="text-rose-600" />
        <StatCard title="In Progress" value={stats.inProgress} Icon={Clock} tone="text-blue-600" />
        <StatCard title="Resolved" value={stats.resolved} Icon={CheckCircle2} tone="text-emerald-600" />
      </div>

      {/* list */}
      <section className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-100 px-4 py-3">
          <h2 className="text-xl font-semibold">Your Complaints</h2>
        </div>

        {items.length === 0 ? (
          <div className="p-6 text-sm text-gray-600">
            No complaints yet.{" "}
            <button
              className="text-blue-700 underline hover:text-blue-800"
              onClick={() => setShowModal(true)}
            >
              File your first complaint
            </button>
            .
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {items.map((c) => (
              <li key={c.id} className="px-4 py-4">
                <ComplaintRow complaint={c} onDelete={() => removeComplaint(c.id)} />
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* modal (simple) */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 px-4 pb-6 pt-12 sm:items-center">
          <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">
            <div className="border-b border-gray-100 px-5 py-3">
              <h3 className="text-lg font-semibold">File Complaint</h3>
            </div>
            <div className="space-y-4 px-5 py-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Title</label>
                <input
                  className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-600"
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  placeholder="Issue title"
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Description</label>
                <textarea
                  rows={4}
                  className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-600"
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  placeholder="Describe the issue…"
                />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Category</label>
                  <select
                    className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-600"
                    value={form.category}
                    onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                  >
                    <option>Noise</option>
                    <option>Cleanliness</option>
                    <option>Security</option>
                    <option>Parking</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Priority</label>
                  <select
                    className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-600"
                    value={form.priority}
                    onChange={(e) => setForm((f) => ({ ...f, priority: e.target.value as Priority }))}
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 border-t border-gray-100 px-5 py-3">
              <button
                className="rounded-lg px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                onClick={addComplaint}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- small components ---------- */

function StatCard({
  title,
  value,
  Icon,
  tone,
}: {
  title: string;
  value: number;
  Icon: React.ComponentType<{ className?: string }>;
  tone: string; // text color classes
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="mt-1 text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <span className={`rounded-lg border border-gray-200 p-3 ${tone}`}>
          <Icon className="h-6 w-6" />
        </span>
      </div>
    </div>
  );
}

function ComplaintRow({
  complaint,
  onDelete,
}: {
  complaint: Complaint;
  onDelete: () => void;
}) {
  const { title, description, filedOn, category, status, priority, attachments } = complaint;

  return (
    <article className="flex flex-col gap-3 rounded-xl border border-gray-100 p-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-blue-600" />
          <h3 className="truncate text-base font-semibold text-gray-900">{title}</h3>
        </div>
        <p className="mt-1 line-clamp-2 text-sm text-gray-600">{description}</p>

        <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-gray-600">
          <span>Filed on {formatDate(filedOn)}</span>
          <span className="text-gray-300">|</span>
          <span>
            Category: <span className="font-medium">{category}</span>
          </span>
          <span className="text-gray-300">|</span>
          <Link href="#" className="inline-flex items-center gap-1 text-blue-700 hover:underline">
            <Paperclip className="h-4 w-4" />
            {attachments} attachment(s)
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:flex-col sm:items-end">
        <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${pillClass("status", status)}`}>
          {status}
        </span>
        <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${pillClass("priority", priority)}`}>
          {priority}
        </span>
        <button
          onClick={onDelete}
          className="inline-flex items-center gap-2 rounded-lg bg-rose-50 px-3 py-1.5 text-sm font-semibold text-rose-700 ring-1 ring-inset ring-rose-200 hover:bg-rose-100"
          aria-label="Delete complaint"
          title="Delete"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </article>
  );
}
