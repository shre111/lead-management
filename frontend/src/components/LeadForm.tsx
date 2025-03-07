"use client";

import { useState } from "react";
import {
  UserPlus,
  Mail,
  Tag,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

type Lead = {
  _id: string;
  name: string;
  email: string;
  status: string;
};
import { addLead } from "../services/api";

export default function LeadForm({
  onNewLead,
}: {
  onNewLead: (lead: Lead) => void;
}) {
  const [form, setForm] = useState({ name: "", email: "", status: "New" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ text: "", type: "" });

    try {
      const response = await addLead(form);
      onNewLead(response.data);
      setForm({ name: "", email: "", status: "" });
      setMessage({ text: "Lead added successfully!", type: "success" });
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
    } catch (error) {
      console.error("Error adding lead:", error);
      setMessage({
        text: "Failed to add lead. Please try again.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const statusOptions = [
    { value: "New", color: "bg-blue-100 text-blue-800" },
    { value: "Engaged", color: "bg-yellow-100 text-yellow-800" },
    { value: "Proposal Sent", color: "bg-indigo-100 text-indigo-800" },
    { value: "Closed-Won", color: "bg-green-100 text-green-800" },
    { value: "Closed-Lost", color: "bg-red-100 text-red-800" },
  ];

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-6 border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        <UserPlus className="mr-2 text-blue-600" size={20} />
        New Lead Capture
      </h2>

      {message.text && (
        <div
          className={`mb-4 p-3 rounded text-sm flex items-center ${
            message.type === "success"
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle className="mr-2" size={16} />
          ) : (
            <AlertCircle className="mr-2" size={16} />
          )}
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            <span className="flex items-center">
              <UserPlus className="mr-2 text-gray-500" size={16} />
              Name
            </span>
          </label>
          <input
            id="name"
            name="name"
            placeholder="Enter lead name"
            required
            value={form.name}
            onChange={handleChange}
            className="w-full text-black px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pl-10"
            style={{
              background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236B7280' stroke-width='1.5'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z' /%3E%3C/svg%3E") no-repeat 12px center/20px`,
            }}
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            <span className="flex items-center">
              <Mail className="mr-2 text-gray-500" size={16} />
              Email
            </span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter lead email"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full text-black px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pl-10"
            style={{
              background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236B7280' stroke-width='1.5'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75' /%3E%3C/svg%3E") no-repeat 12px center/20px`,
            }}
          />
        </div>

        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            <span className="flex items-center">
              <Tag className="mr-2 text-gray-500" size={16} />
              Status
            </span>
          </label>
          <div className="relative">
            <select
              id="status"
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full text-black px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none pl-10 pr-8 bg-white"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.value}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Tag className="text-gray-500" size={16} />
            </div>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <svg
                className="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                Adding...
              </>
            ) : (
              <>
                <UserPlus className="-ml-1 mr-2 h-5 w-5" />
                Add Lead
              </>
            )}
          </button>
        </div>
      </form>

      <div className="mt-4 flex flex-wrap gap-2">
        {statusOptions.map((option) => (
          <span
            key={option.value}
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${option.color}`}
          >
            {option.value}
          </span>
        ))}
      </div>
    </div>
  );
}
