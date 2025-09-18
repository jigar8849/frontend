'use client'
import React, { useState } from "react";
import Link from "next/link";

import { FaArrowLeft, FaBuilding } from "react-icons/fa";

type Props = {
  error?: string;
  success?: string;
};

export default function CreateSocietyAccount({ error, success }: Props) {
  const [form, setForm] = useState({
    socity_name: "",
    total_flat: "",
    total_block: "",
    total_floor: "",
    house_per_level: "",
    total_four_wheeler_slot: "",
    total_two_wheeler_slot: "",
    socity_address: "",
    city: "",
    state: "",
    pincode: "",
    admin_name: "",
    email: "",
    phone: "",
    password: "",
    confirm_password: "",
  });
  const [localError, setLocalError] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function validate() {
    if (!form.socity_name || !form.email || !form.password || !form.confirm_password) 
      return "Please fill all required fields.";
    if (form.password.length < 6) 
      return "Password must be at least 6 characters.";
    if (form.password !== form.confirm_password) 
      return "Passwords do not match.";
    // You can add more detailed checks as needed
    return null;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validation = validate();
    if (validation) {
      setLocalError(validation);
      return;
    }
    setLocalError(null);
    // Submit the form, e.g. via fetch/axios
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col">
      <div className="container mx-auto py-8 px-2 sm:px-0 max-w-3xl">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-blue-700 hover:text-blue-800 text-base font-medium"
          >
            <FaArrowLeft /> Back to Home
          </Link>
        </div>
        <div className="rounded-2xl bg-white shadow-2xl border border-gray-100">
          <div className="px-6 py-8 sm:p-10">
            <div className="text-center mb-8">
              <span className="inline-block bg-blue-100 rounded-full p-3 mb-4">
                <FaBuilding className="text-blue-700 text-3xl" />
              </span>
              <h1 className="text-2xl md:text-3xl font-bold">Create Society Account</h1>
              <p className="text-gray-500 mt-2">Set up your residential society management system</p>
            </div>

            {(localError || error) && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 mb-4 rounded text-center text-sm">
                {localError || error}
              </div>
            )}
            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-2 mb-4 rounded text-center text-sm">
                {success}
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit} autoComplete="off">
              <div className="bg-slate-50 rounded-xl p-5 space-y-5">
                <h2 className="text-xl font-semibold mb-3 text-gray-800">Society Information</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block mb-1 font-medium">Society Name</label>
                    <input
                      className="w-full rounded border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-200 bg-white"
                      name="socity_name"
                      required
                      value={form.socity_name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <label className="block mb-1 font-medium">Total Flats</label>
                      <input
                        type="number"
                        className="w-full rounded border border-gray-300 px-3 py-2"
                        name="total_flat"
                        required
                        value={form.total_flat}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block mb-1 font-medium">Total Blocks</label>
                      <input
                        type="number"
                        className="w-full rounded border border-gray-300 px-3 py-2"
                        name="total_block"
                        required
                        value={form.total_block}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <label className="block mb-1 font-medium">Levels per Block</label>
                      <input
                        type="number"
                        className="w-full rounded border border-gray-300 px-3 py-2"
                        name="total_floor"
                        required
                        value={form.total_floor}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block mb-1 font-medium">Houses per Level</label>
                      <input
                        type="number"
                        className="w-full rounded border border-gray-300 px-3 py-2"
                        name="house_per_level"
                        required
                        value={form.house_per_level}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <label className="block mb-1 font-medium">Four Wheeler Slots</label>
                      <input
                        type="number"
                        className="w-full rounded border border-gray-300 px-3 py-2"
                        name="total_four_wheeler_slot"
                        required
                        value={form.total_four_wheeler_slot}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block mb-1 font-medium">Two Wheeler Slots</label>
                      <input
                        type="number"
                        className="w-full rounded border border-gray-300 px-3 py-2"
                        name="total_two_wheeler_slot"
                        required
                        value={form.total_two_wheeler_slot}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">Society Address</label>
                    <textarea
                      className="w-full rounded border border-gray-300 px-3 py-2"
                      name="socity_address"
                      rows={3}
                      required
                      value={form.socity_address}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <label className="block mb-1 font-medium">City</label>
                      <input
                        className="w-full rounded border border-gray-300 px-3 py-2"
                        name="city"
                        required
                        value={form.city}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block mb-1 font-medium">State</label>
                      <input
                        className="w-full rounded border border-gray-300 px-3 py-2"
                        name="state"
                        required
                        value={form.state}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block mb-1 font-medium">Pincode</label>
                      <input
                        className="w-full rounded border border-gray-300 px-3 py-2"
                        name="pincode"
                        required
                        value={form.pincode}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl p-5 space-y-5">
                <h2 className="text-xl font-semibold mb-3 text-gray-800">Admin Information</h2>

                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <label className="block mb-1 font-medium">Admin Name</label>
                    <input
                      className="w-full rounded border border-gray-300 px-3 py-2"
                      name="admin_name"
                      required
                      value={form.admin_name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block mb-1 font-medium">Admin Email</label>
                    <input
                      type="email"
                      className="w-full rounded border border-gray-300 px-3 py-2"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <label className="block mb-1 font-medium">Admin Phone</label>
                    <input
                      type="tel"
                      className="w-full rounded border border-gray-300 px-3 py-2"
                      name="phone"
                      required
                      value={form.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block mb-1 font-medium">Create Password</label>
                    <input
                      type="password"
                      className="w-full rounded border border-gray-300 px-3 py-2"
                      name="password"
                      required
                      minLength={6}
                      value={form.password}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div>
                  <label className="block mb-1 font-medium">Confirm Password</label>
                  <input
                    type="password"
                    className="w-full rounded border border-gray-300 px-3 py-2"
                    name="confirm_password"
                    required
                    value={form.confirm_password}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 text-lg shadow transition-all active:scale-95"
                >
                  Create Society Account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
