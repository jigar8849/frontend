"use client";

import { useState } from "react";
import { FaPlus, FaEye, FaEdit, FaTrash } from "react-icons/fa";

interface Resident {
  id: number;
  name: string;
  flat: string;
  joined: string;
  email: string;
  phone: string;
  members: number;
  vehicles: number;
  status: "active" | "inactive";
}

const dummyResidents: Resident[] = [
  {
    id: 1,
    name: "Jigar Prajapati",
    flat: "Block D-11",
    joined: "2023-01-15",
    email: "jigar@gmail.com",
    phone: "8849602896",
    members: 2,
    vehicles: 2,
    status: "active",
  },
];

export default function ResidentsPage() {
  const [residents] = useState<Resident[]>(dummyResidents);

  return (
    <div className="p-4 mt-15 md:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
        <h1 className="text-2xl font-bold text-gray-800">
          Resident Management
        </h1>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition">
          <FaPlus /> Add New Resident
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Search residents by name, flat number, or block..."
          className="flex-1 px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
        />
        <select className="px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500">
          <option>All Blocks</option>
          <option>Block A</option>
          <option>Block B</option>
          <option>Block D</option>
        </select>
        <select className="px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500">
          <option>All Status</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full hidden md:table">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-600 font-medium">
              <th className="px-4 py-3">Resident</th>
              <th className="px-4 py-3">Flat Details</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Family & Vehicles</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {residents.map((r) => (
              <tr
                key={r.id}
                className="border-t hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-3">
                  <span className="font-semibold">{r.name}</span>
                  <div className="text-sm text-gray-500">ID: {r.id}</div>
                </td>
                <td className="px-4 py-3">
                  {r.flat}
                  <div className="text-sm text-gray-500">
                    Joined: {r.joined}
                  </div>
                </td>
                <td className="px-4 py-3">
                  {r.email}
                  <div className="text-sm text-gray-500">{r.phone}</div>
                </td>
                <td className="px-4 py-3">
                  {r.members} Members <br /> {r.vehicles} Vehicles
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      r.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {r.status}
                  </span>
                </td>
                <td className="px-4 py-3 flex gap-3 text-lg">
                  <button className="text-blue-600 hover:text-blue-800">
                    <FaEye />
                  </button>
                  <button className="text-yellow-600 hover:text-yellow-800">
                    <FaEdit />
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mobile View (Card Style) */}
        <div className="md:hidden space-y-4">
          {residents.map((r) => (
            <div
              key={r.id}
              className="border rounded-lg p-4 shadow-sm bg-white space-y-2"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="font-semibold">{r.name}</h2>
                  <p className="text-sm text-gray-500">ID: {r.id}</p>
                </div>
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    r.status === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {r.status}
                </span>
              </div>
              <p className="text-gray-600">{r.flat}</p>
              <p className="text-sm text-gray-500">Joined: {r.joined}</p>
              <p className="text-gray-600">{r.email}</p>
              <p className="text-sm text-gray-500">{r.phone}</p>
              <p className="text-gray-600">
                {r.members} Members, {r.vehicles} Vehicles
              </p>
              <div className="flex gap-4 pt-2 text-lg">
                <button className="text-blue-600 hover:text-blue-800">
                  <FaEye />
                </button>
                <button className="text-yellow-600 hover:text-yellow-800">
                  <FaEdit />
                </button>
                <button className="text-red-600 hover:text-red-800">
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
