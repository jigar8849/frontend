"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Users,
  CreditCard,
  Car,
  UserCog,
  Building2,
  MessageSquare,
  LogOut,
} from "lucide-react";
import clsx from "clsx";

const menuItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: Home },
  { name: "Residents", href: "/admin/residents", icon: Users },
  { name: "Payments", href: "/admin/payments", icon: CreditCard },
  { name: "Parking", href: "/admin/parking", icon: Car },
  { name: "Employees", href: "/admin/employees", icon: UserCog },
  { name: "Flat List", href: "/admin/flats", icon: Building2 },
  { name: "Complaints", href: "/admin/complaints", icon: MessageSquare },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-white shadow-lg  flex flex-col z-50">
      {/* Header */}
      <div className="h-16 flex items-center justify-center text-xl font-extrabold border-b border-gray-200 bg-blue-500 text-white tracking-tight select-none">
        Admin Panel
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col px-4 py-6 space-y-1 overflow-y-auto">
        {menuItems.map(({ name, href, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={name}
              href={href}
              className={clsx(
                "flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium transition-colors",
                isActive
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-gray-700 hover:bg-blue-100 hover:text-blue-700"
              )}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon
                className={clsx(
                  "w-5 h-5 flex-shrink-0",
                  isActive ? "text-white" : "text-gray-500"
                )}
                aria-hidden="true"
              />
              {name}
            </Link>
          );
        })}
      </nav>

      {/* Separator */}
      <div className="border-t border-gray-200"></div>

      {/* Logout */}
      <div className="px-4 mt-auto py-6">
        <button
          type="button"
          className="flex items-center gap-3 w-full px-3 py-2 rounded-md text-red-600 font-semibold hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
          aria-label="Logout"
        >
          <LogOut className="w-5 h-5" aria-hidden="true" />
          Logout
        </button>
      </div>
    </aside>
  );
}
