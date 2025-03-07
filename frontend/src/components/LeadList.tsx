"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Loader2,
  AlertCircle,
  Search,
  SortAsc,
  SortDesc,
  Filter,
  UserCheck,
  Mail,
  Tag,
  Award,
  Star,
  Zap,
  BarChart,
  RefreshCw,
} from "lucide-react";
import { fetchLeads } from "../services/api";
import { Lead } from "../types/lead";
import { LeadStatusBreakdown } from "./LeadStatusBreakdown";
import { LeadTableRow } from "./LeadTableRow";

export default function LeadList({ newLead }: { newLead?: Lead | null }) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<"name" | "status">("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [highlightedLead, setHighlightedLead] = useState<string | null>(null);

  const statusOptions = [
    {
      value: "New",
      color: "bg-blue-100 text-blue-800",
      icon: <Zap size={12} className="mr-1" />,
    },
    {
      value: "Engaged",
      color: "bg-yellow-100 text-yellow-800",
      icon: <Star size={12} className="mr-1" />,
    },
    {
      value: "Proposal Sent",
      color: "bg-indigo-100 text-indigo-800",
      icon: <Mail size={12} className="mr-1" />,
    },
    {
      value: "Closed-Won",
      color: "bg-green-100 text-green-800",
      icon: <Award size={12} className="mr-1" />,
    },
    {
      value: "Closed-Lost",
      color: "bg-red-100 text-red-800",
      icon: <AlertCircle size={12} className="mr-1" />,
    },
  ];

  const fetchData = () => {
    setLoading(true);
    fetchLeads()
      .then((res) => {
        setLeads(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching leads:", err);
        setError("Failed to fetch leads. Please try again.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refreshLeads = () => {
    setRefreshing(true);
    fetchLeads()
      .then((res) => {
        setLeads(res.data);
        setTimeout(() => setRefreshing(false), 600);
      })
      .catch((err) => {
        console.error("Error refreshing leads:", err);
        setError("Failed to refresh leads. Please try again.");
        setRefreshing(false);
      });
  };

  useEffect(() => {
    if (newLead) {
      setLeads((prevLeads) => [newLead, ...prevLeads]);
      setHighlightedLead(newLead._id);
      setTimeout(() => setHighlightedLead(null), 3000);
    }
  }, [newLead]);

  const filteredLeads = leads
    .filter((lead) => {
      const matchesSearch =
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter ? lead.status === statusFilter : true;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortField === "name") {
        return sortDirection === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else {
        return sortDirection === "asc"
          ? a.status.localeCompare(b.status)
          : b.status.localeCompare(a.status);
      }
    });

  const toggleSort = (field: "name" | "status") => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  return (
    <div className="w-full bg-white rounded-lg overflow-hidden">
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="m-4 p-3 rounded text-sm flex items-center bg-red-50 text-red-700 border border-red-200"
        >
          <AlertCircle className="mr-2" size={16} />
          {error}
        </motion.div>
      )}

      <div className="px-6 pt-4 pb-3 border-b border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center">
            <BarChart className="mr-2 text-blue-600" size={18} />
            Pipeline Analytics
          </h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={refreshLeads}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600"
            disabled={refreshing}
          >
            <RefreshCw size={16} className={refreshing ? "animate-spin" : ""} />
          </motion.button>
        </div>

      <LeadStatusBreakdown leads={leads} statusOptions={statusOptions} />

      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search leads..."
            className="pl-10 pr-4 py-2 w-full border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="relative">
          <select
            value={statusFilter || ""}
            onChange={(e) => setStatusFilter(e.target.value || null)}
            className="pl-10 text-black pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
          >
            <option value="">All Statuses</option>
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.value}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Filter className="h-4 w-4 text-gray-400" />
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
    </div>

    <div className="flex flex-wrap gap-2 px-6 py-3 bg-gray-50 border-b border-gray-100">
      {statusOptions.map((option) => (
        <motion.button
          key={option.value}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() =>
            setStatusFilter(statusFilter === option.value ? null : option.value)
          }
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
            option.color
          } ${
            statusFilter === option.value
              ? "ring-2 ring-offset-1 ring-blue-500"
              : "hover:ring-1 hover:ring-offset-1 hover:ring-gray-300"
          }`}
        >
          {option.icon}
          {option.value}
          <span className="ml-1 bg-white bg-opacity-30 px-1.5 py-0.5 rounded-full text-xs">
            {leads.filter((lead) => lead.status === option.value).length}
          </span>
        </motion.button>
      ))}
    </div>

    <AnimatePresence>
      {loading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex justify-center items-center p-16"
        >
          <div className="flex flex-col items-center">
            <Loader2 className="animate-spin h-10 w-10 text-blue-600 mb-4" />
            <p className="text-gray-500 font-medium">Loading your pipeline...</p>
          </div>
        </motion.div>
      ) : filteredLeads.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-12 text-gray-500 bg-gray-50"
        >
          <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <Users className="h-8 w-8 text-gray-400" />
          </div>
          <p className="font-medium text-gray-700">No leads found</p>
          <p className="text-sm mt-1 max-w-md mx-auto">
            {searchTerm || statusFilter
              ? "Try adjusting your search or filter criteria"
              : "Add your first lead to get started"}
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setSearchTerm("");
              setStatusFilter(null);
            }}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Clear filters
          </motion.button>
        </motion.div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => toggleSort("name")}
                >
                  <div className="flex items-center">
                    <UserCheck className="h-4 w-4 mr-1" />
                    Name
                    {sortField === "name" &&
                      (sortDirection === "asc" ? (
                        <SortAsc className="h-4 w-4 ml-1" />
                      ) : (
                        <SortDesc className="h-4 w-4 ml-1" />
                      ))}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-1" />
                    Email
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => toggleSort("status")}
                >
                  <div className="flex items-center">
                    <Tag className="h-4 w-4 mr-1" />
                    Status
                    {sortField === "status" &&
                      (sortDirection === "asc" ? (
                        <SortAsc className="h-4 w-4 ml-1" />
                      ) : (
                        <SortDesc className="h-4 w-4 ml-1" />
                      ))}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <AnimatePresence>
                {filteredLeads.map((lead) => (
                  <LeadTableRow
                    key={lead._id}
                    lead={lead}
                    statusOptions={statusOptions}
                    isHighlighted={lead._id === highlightedLead}
                  />
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      )}
    </AnimatePresence>

    <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 text-sm text-gray-500 flex items-center justify-between">
      <div>
        Showing <span className="font-medium">{filteredLeads.length}</span> of{" "}
        <span className="font-medium">{leads.length}</span> leads
      </div>
      <div className="text-xs text-gray-400">
        Last updated: {new Date().toLocaleTimeString()}
      </div>
    </div>
  </div>
);
}
