"use client";

import { useMemo, useState } from "react";
import {
  Users,
  UserCheck,
  UserX,
  Wallet,
  Plus,
  Search,
  ChevronDown,
} from "lucide-react";

type Employee = {
  id: number;
  name: string;
  role: string;
  shift?: string;
  phone: string;
  salary: number;
  joinDate: string;
  status: "Active" | "Inactive";
};

export default function EmployeeManagement() {
  const [q, setQ] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("All");

  // mock data
  const employees: Employee[] = [
    { id: 1, name: "bhavya", role: "Security Guard", shift: "Night", phone: "908907089", salary: 1234, joinDate: "2025-07-24", status: "Active" },
    { id: 2, name: "shaddha", role: "Cleaner", phone: "8849602896", salary: 123, joinDate: "2025-07-10", status: "Active" },
    { id: 3, name: "eee", role: "Other", phone: "90890700", salary: 5345, joinDate: "2025-07-31", status: "Active" },
  ];

  // stats
  const total = employees.length;
  const active = employees.filter((e) => e.status === "Active").length;
  const inactive = total - active;
  const monthlyPayroll = employees.reduce((s, e) => s + e.salary, 0);

  const roles = ["All", ...Array.from(new Set(employees.map((e) => e.role)))];

  // filter + search
  const rows = useMemo(() => {
    const text = q.trim().toLowerCase();
    return employees.filter((e) => {
      const matchRole = roleFilter === "All" || e.role === roleFilter;
      const matchText =
        !text ||
        e.name.toLowerCase().includes(text) ||
        e.role.toLowerCase().includes(text) ||
        e.phone.includes(text);
      return matchRole && matchText;
    });
  }, [q, roleFilter, employees]);

  const money = (n: number) =>
    `₹${n.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;

  return (
    <div className="p-6 mt-15">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold">Employee Management</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 inline-flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Add New Employee
        </button>
      </div>

     {/* Stat Cards */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
  <div className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
    <div>
      <p className="text-gray-500">Total Employees</p>
      <h2 className="text-xl font-bold">{total}</h2>
    </div>
    <Users className="h-10 w-10 text-blue-600" />
  </div>

  <div className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
    <div>
      <p className="text-gray-500">Active</p>
      <h2 className="text-xl font-bold text-emerald-700">{active}</h2>
    </div>
    <UserCheck className="h-10 w-10 text-emerald-600" />
  </div>

  <div className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
    <div>
      <p className="text-gray-500">In-active</p>
      <h2 className="text-xl font-bold text-rose-600">{inactive}</h2>
    </div>
    <UserX className="h-10 w-10 text-rose-500" />
  </div>

  <div className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
    <div>
      <p className="text-gray-500">Monthly Payroll</p>
      <h2 className="text-xl font-bold">{money(monthlyPayroll)}</h2>
    </div>
    <Wallet className="h-10 w-10 text-indigo-600" />
  </div>
</div>


      {/* Search + Role filter */}
      <div className="mt-6 flex flex-col sm:flex-row gap-4">
        <div className="flex items-center border rounded-md px-3 py-2 flex-1 bg-white">
          <Search className="h-5 w-5 text-gray-500 mr-2" />
          <input
            placeholder="Search employees by name..."
            className="w-full outline-none"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>

        <div className="relative">
          <select
            className="appearance-none border bg-white px-3 py-2 pr-9 rounded-md"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            {roles.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto mt-6">
        <table className="min-w-full border-collapse bg-white shadow rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 font-semibold">Employee</th>
              <th className="p-3 font-semibold">Role &amp; Shift</th>
              <th className="p-3 font-semibold">Contact</th>
              <th className="p-3 font-semibold">Salary</th>
              <th className="p-3 font-semibold">Join Date</th>
              <th className="p-3 font-semibold">Status</th>
              <th className="p-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((e) => (
              <tr key={e.id} className="border-t hover:bg-gray-50">
                <td className="p-3 font-semibold">{e.name}</td>
                <td className="p-3">
                  <div className="font-medium">{e.role}</div>
                  <div className="text-sm text-gray-500">
                    Joined: {e.joinDate}
                    {e.shift ? ` · ${e.shift}` : ""}
                  </div>
                </td>
                <td className="p-3">{e.phone}</td>
                <td className="p-3">{money(e.salary)}</td>
                <td className="p-3">{e.joinDate}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-md text-sm font-medium ${
                      e.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-rose-100 text-rose-700"
                    }`}
                  >
                    {e.status}
                  </span>
                </td>
                <td className="p-3">
                  <button className="bg-blue-600 text-white px-3 py-1.5 rounded-md text-sm hover:bg-blue-700">
                    Manage
                  </button>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={7} className="p-6 text-center text-gray-500">
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
