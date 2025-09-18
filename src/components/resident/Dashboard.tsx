// app/(resident)/resident/page.tsx
import Link from "next/link";
import {
  Bell,
  CalendarDays,
  Car,
  CreditCard,
  FileText,
  Home,
  Megaphone,
  Shield,
  Wallet,
} from "lucide-react";

// ----- Types (replace with your real ones later)
type Bill = { id: string; title: string; due: string; amount: number; status: "Pending" | "Paid" };
type Event = { id: string; title: string; date: string; place: string };
type Notification = { id: string; text: string; timeAgo: string };

// ----- Demo data (frontend only)
const stats = [
  { label: "Pending Bills", value: 2, Icon: CreditCard, tone: "bg-rose-100" },
  { label: "Open Complaints", value: 1, Icon: Megaphone, tone: "bg-amber-100" },
  { label: "Upcoming Events", value: 3, Icon: CalendarDays, tone: "bg-indigo-100" },
  { label: "Your Vehicles", value: 2, Icon: Car, tone: "bg-emerald-100" },
];

const bills: Bill[] = [
  { id: "b1", title: "Maintenance", due: "2024-01-15", amount: 3500, status: "Pending" },
  { id: "b2", title: "Water Bill", due: "2024-01-20", amount: 450, status: "Pending" },
  { id: "b3", title: "Electricity", due: "2024-01-10", amount: 5100, status: "Paid" },
];

const notifications: Notification[] = [
  { id: "n1", text: "Maintenance bill due in 3 days", timeAgo: "1 hour ago" },
  { id: "n2", text: "Society meeting scheduled for Jan 20", timeAgo: "1 hour ago" },
  { id: "n3", text: "Your complaint #123 has been resolved", timeAgo: "1 hour ago" },
];

const events: Event[] = [
  { id: "e1", title: "Society Annual Meeting", date: "2024-01-20 at 6:00 PM", place: "Club House" },
  { id: "e2", title: "Holi Celebration", date: "2024-03-24 at 5:00 PM", place: "Garden Area" },
  { id: "e3", title: "Health Camp", date: "2024-02-05 at 10:00 AM", place: "Community Hall" },
];

// ----- Small UI bits
function Card({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={`rounded-xl border border-gray-200 bg-white shadow-sm ${className}`}>
      {children}
    </div>
  );
}

function SectionHeader({
  title,
  Icon,
  action,
}: {
  title: string;
  Icon?: React.ComponentType<{ className?: string }>;
  action?: React.ReactNode;
}) {
  const Ico = Icon;
  return (
    <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
      <h2 className="flex items-center gap-2 text-lg font-semibold">
        {Ico && <Ico className="h-5 w-5" />} {title}
      </h2>
      {action}
    </div>
  );
}

function StatusPill({ status }: { status: Bill["status"] }) {
  const isPending = status === "Pending";
  return (
    <span
      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
        isPending
          ? "bg-rose-50 text-rose-600"
          : "bg-emerald-50 text-emerald-600"
      }`}
    >
      {status}
    </span>
  );
}

function currency(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}

export default function ResidentDashboard() {
  // you could fetch the resident's name from client state/localStorage; hardcoded here
  const residentName = "Jigar Prajapati";

  return (
    <div className="space-y-6 mt-15">
      {/* HERO */}
      <Card className="bg-gradient-to-r from-blue-600 to-blue-500 text-white">
        <div className="px-5 py-6 sm:px-8">
          <p className="text-sm/6 opacity-90">Welcome,</p>
          <h1 className="text-2xl font-extrabold sm:text-3xl">
            {residentName.includes(" ") ? (
              <>
                {residentName.split(" ")[0]},{" "}
                <span className="underline decoration-white/60 underline-offset-4">
                  {residentName.split(" ").slice(1).join(" ")}
                </span>
              </>
            ) : (
              residentName
            )}
          </h1>
          <p className="mt-1 max-w-3xl text-sm opacity-90">
            Manage your society life with ease — bills, complaints, events and more
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href="/resident/billing"
              className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-1.5 text-sm font-medium ring-1 ring-inset ring-white/30 hover:bg-white/15"
            >
              <Wallet className="h-4 w-4" /> Pay a bill
            </Link>
            <Link
              href="/resident/complaints"
              className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-1.5 text-sm font-medium ring-1 ring-inset ring-white/30 hover:bg-white/15"
            >
              <Megaphone className="h-4 w-4" /> File complaint
            </Link>
          </div>
        </div>
      </Card>

      {/* STATS */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ label, value, Icon, tone }) => (
          <Card key={label} className="p-4">
            <div className="flex items-center gap-4">
              <div className={`rounded-lg p-3 ${tone}`}>
                <Icon className="h-6 w-6 text-gray-700" />
              </div>
              <div>
                <p className="text-sm text-gray-600">{label}</p>
                <p className="text-2xl font-bold text-gray-900">{value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Recent Bills */}
        <Card className="lg:col-span-1">
          <SectionHeader
            title="Recent Bills"
            Icon={CreditCard}
            action={
              <Link
                href="/resident/billing"
                className="rounded-md px-2 py-1 text-sm font-medium text-blue-700 hover:bg-blue-50"
              >
                View all
              </Link>
            }
          />
          <ul className="divide-y divide-gray-100">
            {bills.map((b) => (
              <li key={b.id} className="flex items-center justify-between gap-3 px-4 py-3">
                <div>
                  <p className="font-semibold text-gray-900">{b.title}</p>
                  <p className="text-sm text-gray-500">Due: {b.due}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-gray-900">{currency(b.amount)}</div>
                  <div className="mt-1">
                    <StatusPill status={b.status} />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Card>

        {/* Notifications */}
        <Card className="lg:col-span-1">
          <SectionHeader
            title="Notification"
            Icon={Bell}
            action={<Bell className="mr-2 h-5 w-5 text-gray-500" aria-hidden="true" />}
          />
          <ul className="space-y-3 px-4 py-3">
            {notifications.map((n) => (
              <li key={n.id} className="flex items-start gap-3">
                <div className="mt-1 h-2 w-2 rounded-full bg-blue-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{n.text}</p>
                  <p className="text-xs text-gray-500">{n.timeAgo}</p>
                </div>
              </li>
            ))}
          </ul>
        </Card>

        {/* Upcoming Events */}
        <Card className="lg:col-span-1">
          <SectionHeader
            title="Upcoming Events"
            Icon={CalendarDays}
            action={
              <Link
                href="/resident/events"
                className="rounded-md px-2 py-1 text-sm font-medium text-blue-700 hover:bg-blue-50"
              >
                All events
              </Link>
            }
          />
          <div className="space-y-3 px-4 py-3">
            {events.map((ev) => (
              <Link
                key={ev.id}
                href="/resident/events"
                className="block rounded-lg bg-indigo-50 px-4 py-3 transition hover:bg-indigo-100"
              >
                <p className="font-semibold text-gray-900">{ev.title}</p>
                <p className="text-sm text-gray-700">{ev.date}</p>
                <p className="text-sm font-medium text-blue-700">{ev.place}</p>
              </Link>
            ))}
          </div>
        </Card>
      </div>

      {/* QUICK ACTIONS */}
      <Card>
        <div className="px-4 py-3">
          <h3 className="text-lg font-semibold">Quick-Action</h3>
        </div>
        <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 lg:grid-cols-4">
          <Link
            href="/resident/billing"
            className="flex items-center gap-3 rounded-lg bg-blue-50 px-4 py-3 font-medium text-blue-700 ring-1 ring-inset ring-blue-200 hover:bg-blue-100"
          >
            <CreditCard className="h-5 w-5" /> Pay Bills
          </Link>
          <Link
            href="/resident/complaints"
            className="flex items-center gap-3 rounded-lg bg-rose-50 px-4 py-3 font-medium text-rose-700 ring-1 ring-inset ring-rose-200 hover:bg-rose-100"
          >
            <Megaphone className="h-5 w-5" /> File Complaint
          </Link>
          <Link
            href="/resident/events"
            className="flex items-center gap-3 rounded-lg bg-emerald-50 px-4 py-3 font-medium text-emerald-700 ring-1 ring-inset ring-emerald-200 hover:bg-emerald-100"
          >
            <CalendarDays className="h-5 w-5" /> Book Event
          </Link>
          <Link
            href="/resident/vehicles"
            className="flex items-center gap-3 rounded-lg bg-indigo-50 px-4 py-3 font-medium text-indigo-700 ring-1 ring-inset ring-indigo-200 hover:bg-indigo-100"
          >
            <Car className="h-5 w-5" /> Vehicle Search
          </Link>
        </div>
      </Card>

      {/* Helpful footer links */}
      <div className="flex flex-wrap justify-between gap-3 text-xs text-gray-500">
        <span className="inline-flex items-center gap-1">
          <Home className="h-4 w-4" /> <span>Society Resident Portal</span>
        </span>
        <div className="flex gap-4">
          <Link href="/resident/profile" className="hover:text-gray-700">
            Profile
          </Link>
          <Link href="/resident" className="hover:text-gray-700">
            Dashboard
          </Link>
          <Link href="/" className="hover:text-gray-700">
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
}
