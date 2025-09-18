"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  CalendarDays,
  MapPin,
  Users,
  CheckCircle2,
  Clock,
  Pencil,
  Trash2,
  Plus,
} from "lucide-react";

/* ------------ types ------------ */
type Venue = {
  id: string;
  name: string;
  capacity: number;
  availableToday: boolean;
};

type EventStatus = "Pending" | "Approved" | "Rejected";
type EventItem = {
  id: string;
  title: string;
  date: string;          // ISO date (yyyy-mm-dd)
  startTime: string;     // "HH:MM"
  endTime: string;       // "HH:MM"
  venueId: string;
  attendees: number;
  organizer: string;
  status: EventStatus;
};

/* ------------ demo data ------------ */
const VENUES: Venue[] = [
  { id: "v1", name: "Club House",      capacity: 100, availableToday: true  },
  { id: "v2", name: "Garden Area",     capacity: 200, availableToday: true  },
  { id: "v3", name: "Community Hall",  capacity: 150, availableToday: true  },
  { id: "v4", name: "Terrace Garden",  capacity: 80,  availableToday: true  },
];

const INITIAL_EVENTS: EventItem[] = [
  {
    id: "e1",
    title: "dffevf",
    date: "2025-07-26",
    startTime: "20:38",
    endTime: "23:36",
    venueId: "v1",
    attendees: 321,
    organizer: "Jigar Prajapati",
    status: "Pending",
  },
];

/* ------------ helpers ------------ */
const venueById = (id: string) => VENUES.find(v => v.id === id)?.name ?? "—";
const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" });

const statusPill = (s: EventStatus) =>
  s === "Approved"
    ? "bg-emerald-50 text-emerald-700"
    : s === "Rejected"
    ? "bg-rose-50 text-rose-700"
    : "bg-amber-50 text-amber-700";

/* ------------ page ------------ */
export default function EventsPage() {
  const [events, setEvents] = useState<EventItem[]>(INITIAL_EVENTS);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<EventItem | null>(null);

  const [form, setForm] = useState<{
    title: string;
    date: string;
    startTime: string;
    endTime: string;
    venueId: string;
    attendees: number;
  }>({
    title: "",
    date: new Date().toISOString().slice(0, 10),
    startTime: "18:00",
    endTime: "21:00",
    venueId: "v1",
    attendees: 50,
  });

  const openCreate = () => {
    setEditing(null);
    setForm({
      title: "",
      date: new Date().toISOString().slice(0, 10),
      startTime: "18:00",
      endTime: "21:00",
      venueId: "v1",
      attendees: 50,
    });
    setModalOpen(true);
  };

  const openEdit = (ev: EventItem) => {
    setEditing(ev);
    setForm({
      title: ev.title,
      date: ev.date,
      startTime: ev.startTime,
      endTime: ev.endTime,
      venueId: ev.venueId,
      attendees: ev.attendees,
    });
    setModalOpen(true);
  };

  const saveEvent = () => {
    if (!form.title.trim()) return;
    if (editing) {
      setEvents(prev =>
        prev.map(e => (e.id === editing.id ? { ...editing, ...form } : e))
      );
    } else {
      setEvents(prev => [
        {
          id: `e_${Date.now()}`,
          title: form.title.trim(),
          date: form.date,
          startTime: form.startTime,
          endTime: form.endTime,
          venueId: form.venueId,
          attendees: form.attendees,
          organizer: "Jigar Prajapati",
          status: "Pending",
        },
        ...prev,
      ]);
    }
    setModalOpen(false);
  };

  const removeEvent = (id: string) =>
    setEvents(prev => prev.filter(e => e.id !== id));

  // simple availability demo
  const availabilityNote = (v: Venue) =>
    v.availableToday ? (
      <div className="inline-flex items-center gap-2 text-emerald-700">
        <CheckCircle2 className="h-4 w-4" />
        <span>Available Today</span>
      </div>
    ) : (
      <div className="inline-flex items-center gap-2 text-rose-700">
        <Clock className="h-4 w-4" />
        <span>Not Available</span>
      </div>
    );

  return (
    <div className="space-y-6 mt-15">
      {/* header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Event Booking</h1>
          <p className="text-sm text-gray-600">Book venues for your events and celebrations</p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          Book Event
        </button>
      </div>

      {/* venues */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {VENUES.map((v) => (
          <div
            key={v.id}
            className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-semibold text-gray-900">{v.name}</h3>
              <MapPin className="h-5 w-5 text-blue-600" />
            </div>

            <div className="mt-3 space-y-2 text-sm text-gray-700">
              <div className="inline-flex items-center gap-2">
                <Users className="h-4 w-4 text-gray-500" />
                <span>
                  Capacity:{" "}
                  <span className="font-medium">{v.capacity}</span> people
                </span>
              </div>
              {availabilityNote(v)}
            </div>

            <button
              onClick={() => {
                setForm((f) => ({ ...f, venueId: v.id }));
                openCreate();
              }}
              className="mt-4 w-full rounded-lg bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700 ring-1 ring-inset ring-indigo-200 hover:bg-indigo-100"
            >
              Check Availability
            </button>
          </div>
        ))}
      </div>

      {/* upcoming events */}
      <section className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-100 px-4 py-3">
          <h2 className="text-2xl font-semibold">Upcoming Events</h2>
        </div>

        {events.length === 0 ? (
          <div className="p-6 text-sm text-gray-600">
            No upcoming events.{" "}
            <button className="text-blue-700 underline hover:text-blue-800" onClick={openCreate}>
              Book your first event
            </button>
            .
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {events.map((ev) => (
              <li key={ev.id} className="px-4 py-4">
                <EventRow
                  ev={ev}
                  onEdit={() => openEdit(ev)}
                  onDelete={() => removeEvent(ev.id)}
                />
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 px-4 pb-6 pt-12 sm:items-center">
          <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">
            <div className="border-b border-gray-100 px-5 py-3">
              <h3 className="text-lg font-semibold">
                {editing ? "Edit Booking" : "Book Event"}
              </h3>
            </div>

            <div className="space-y-4 px-5 py-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Event Title</label>
                <input
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  placeholder="Birthday / Society Meet / Yoga Session…"
                  className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Date</label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                    className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Venue</label>
                  <select
                    value={form.venueId}
                    onChange={(e) => setForm((f) => ({ ...f, venueId: e.target.value }))}
                    className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    {VENUES.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Start Time</label>
                  <input
                    type="time"
                    value={form.startTime}
                    onChange={(e) => setForm((f) => ({ ...f, startTime: e.target.value }))}
                    className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">End Time</label>
                  <input
                    type="time"
                    value={form.endTime}
                    onChange={(e) => setForm((f) => ({ ...f, endTime: e.target.value }))}
                    className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Attendees</label>
                  <input
                    type="number"
                    min={1}
                    value={form.attendees}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, attendees: Number(e.target.value || 1) }))
                    }
                    className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-gray-100 px-5 py-3">
              <button
                className="rounded-lg px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                onClick={saveEvent}
              >
                {editing ? "Save Changes" : "Create Booking"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------ small components ------------ */

function EventRow({
  ev,
  onEdit,
  onDelete,
}: {
  ev: EventItem;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <article className="rounded-xl border border-gray-100 p-4">
      <div className="flex flex-col-reverse items-start justify-between gap-3 sm:flex-row sm:items-start">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-900">{ev.title}</h3>
          <div className="grid grid-cols-1 gap-2 text-sm text-gray-700 sm:grid-cols-2 md:grid-cols-3">
            <div className="inline-flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-gray-500" />
              <span>{fmtDate(ev.date)}</span>
            </div>
            <div className="inline-flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <span>
                {ev.startTime} – {ev.endTime}
              </span>
            </div>
            <div className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span>{venueById(ev.venueId)}</span>
            </div>
            <div className="inline-flex items-center gap-2">
              <Users className="h-4 w-4 text-gray-500" />
              <span>{ev.attendees} attendees</span>
            </div>
          </div>

          <p className="mt-2 text-sm text-gray-700">
            <span className="font-semibold">Organized by :</span> {ev.organizer}
          </p>
        </div>

        <div className="flex items-center gap-2 self-start">
          <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusPill(ev.status)}`}>
            {ev.status}
          </span>
          <button
            onClick={onEdit}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-1.5 text-sm font-semibold text-blue-700 ring-1 ring-inset ring-blue-200 hover:bg-blue-100"
            aria-label="Edit"
            title="Edit"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            onClick={onDelete}
            className="inline-flex items-center gap-2 rounded-lg bg-rose-50 px-3 py-1.5 text-sm font-semibold text-rose-700 ring-1 ring-inset ring-rose-200 hover:bg-rose-100"
            aria-label="Delete"
            title="Delete"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </article>
  );
}
