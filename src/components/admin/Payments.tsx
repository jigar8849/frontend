"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, DollarSign, CreditCard, Filter } from "lucide-react";

export default function PaymentManagement() {
  const [search, setSearch] = useState("");

  const payments = [
    {
      id: 1,
      name: "Jigar Prajapati",
      flat: "D-11",
      bill: "Maintenance",
      amount: "₹700",
      due: "2025-08-15",
      paid: "2025-07-24",
      status: "Paid",
      method: "Online",
    },
  ];

  return (
    <div className="p-6 mt-15">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold">Payment Management</h1>
        <div className="flex gap-2">
          {/* Manage Created Bills -> link */}
          <Link
            href="/admin/forms/manageBills" /* change if your route differs */
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Manage Created Bills
          </Link>

          {/* Create Bills -> link */}
          <Link
            href="/admin/forms/createBill" /* change if your route differs */
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Create Bills
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        <div className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
          <div>
            <p className="text-gray-500">Total Collected</p>
            <h2 className="text-xl font-bold text-green-600">₹700</h2>
          </div>
          <DollarSign className="h-10 w-10 text-green-500" />
        </div>
        <div className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
          <div>
            <p className="text-gray-500">Pending Amount</p>
            <h2 className="text-xl font-bold text-red-500">₹0</h2>
          </div>
          <CreditCard className="h-10 w-10 text-yellow-500" />
        </div>
        <div className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
          <div>
            <p className="text-gray-500">Collection Rate</p>
            <h2 className="text-xl font-bold text-blue-600">100%</h2>
          </div>
          <Filter className="h-10 w-10 text-blue-500" />
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        <div className="flex items-center border rounded-md px-3 py-2 flex-1 bg-white">
          <Search className="h-5 w-5 text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search residents by name, flat number, or block..."
            className="w-full outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select className="border px-3 py-2 rounded-md bg-white">
          <option>All Status</option>
          <option>Paid</option>
          <option>Pending</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto mt-6">
        <table className="min-w-full border-collapse bg-white shadow rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 font-semibold">RESIDENT DETAILS</th>
              <th className="p-3 font-semibold">BILL DETAILS</th>
              <th className="p-3 font-semibold">AMOUNT</th>
              <th className="p-3 font-semibold">DUE DATE</th>
              <th className="p-3 font-semibold">STATUS</th>
              <th className="p-3 font-semibold">PAYMENT METHOD</th>
              <th className="p-3 font-semibold">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p.id} className="border-t hover:bg-gray-50">
                <td className="p-3">
                  <p className="font-bold">{p.name}</p>
                  <p className="text-sm text-gray-600">{p.flat}</p>
                </td>
                <td className="p-3">{p.bill}</td>
                <td className="p-3">{p.amount}</td>
                <td className="p-3">
                  {p.due}
                  <p className="text-xs text-gray-500">Paid: {p.paid}</p>
                </td>
                <td className="p-3">
                  <span className="px-2 py-1 rounded-md text-sm font-medium bg-green-100 text-green-600">
                    {p.status}
                  </span>
                </td>
                <td className="p-3">{p.method}</td>
                <td className="p-3">
                  <button className="text-blue-600 hover:underline">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
