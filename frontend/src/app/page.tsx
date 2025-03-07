"use client";

import { useState, useEffect } from "react";
import { Users, UserPlus, BarChart, Sparkles, TrendingUp, Award } from "lucide-react";
import LeadList from "../components/LeadList";
import LeadForm from "../components/LeadForm";
import { motion, AnimatePresence } from "framer-motion";

interface Lead {
  _id: string;
  name: string;
  email: string;
  status: string;
}

// Animation variants
const pageVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } }
};

export default function Home() {
  const [newLead, setNewLead] = useState<Lead | null>(null);
  const [activeTab, setActiveTab] = useState<"list" | "add">("list");
  const [showAnimation, setShowAnimation] = useState(true);
  const [statsSummary, setStatsSummary] = useState({
    totalLeads: 0,
    newToday: 0,
    conversionRate: 0
  });

  // Simulated stats update
  useEffect(() => {
    // This would normally come from your API
    setStatsSummary({
      totalLeads: 128,
      newToday: 8,
      conversionRate: 24
    });
    
    // Disable initial animation after first render
    const timer = setTimeout(() => setShowAnimation(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Success notification when a new lead is added
  const [showNotification, setShowNotification] = useState(false);
  
  const handleNewLead = (lead: Lead) => {
    setNewLead(lead);
    setShowNotification(true);
    
    // Auto-hide notification after 3 seconds
    setTimeout(() => setShowNotification(false), 3000);
    
    // On mobile, switch to list view after adding a lead
    if (window.innerWidth < 640) {
      setActiveTab("list");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Success Notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-4 right-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded shadow-lg z-50 max-w-md"
          >
            <div className="flex items-center">
              <Sparkles className="mr-3 text-green-500" size={20} />
              <p>New lead <span className="font-bold">{newLead?.name}</span> added successfully!</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <motion.div 
            initial={showAnimation ? "hidden" : "visible"}
            animate="visible"
            variants={pageVariants}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
          >
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center mb-4 sm:mb-0">
              <motion.div
                whileHover={{ rotate: 360, transition: { duration: 0.6 } }}
                className="mr-3 p-2 bg-blue-100 rounded-full"
              >
                <BarChart className="text-blue-600" size={28} />
              </motion.div>
              Lead Sparkle
            </h1>
            
            <div className="hidden sm:flex space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab("list")}
                className={`px-4 py-2 rounded-md text-sm font-medium flex items-center transition-all duration-200 ${
                  activeTab === "list"
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Users className="mr-2" size={18} />
                View Leads
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab("add")}
                className={`px-4 py-2 rounded-md text-sm font-medium flex items-center transition-all duration-200 ${
                  activeTab === "add"
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <UserPlus className="mr-2" size={18} />
                Add New Lead
              </motion.button>
            </div>
          </motion.div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Summary Cards */}
        <motion.div 
          initial={showAnimation ? { y: 30, opacity: 0 } : { y: 0, opacity: 1 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6"
        >
          <div className="bg-white rounded-lg shadow-md p-4 flex items-center">
            <div className="p-3 bg-blue-100 rounded-full mr-4">
              <Users className="text-blue-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Leads</p>
              <p className="text-2xl font-bold text-gray-800">{statsSummary.totalLeads}</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-4 flex items-center">
            <div className="p-3 bg-green-100 rounded-full mr-4">
              <TrendingUp className="text-green-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">New Today</p>
              <p className="text-2xl font-bold text-gray-800">+{statsSummary.newToday}</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-4 flex items-center">
            <div className="p-3 bg-purple-100 rounded-full mr-4">
              <Award className="text-purple-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Conversion Rate</p>
              <p className="text-2xl font-bold text-gray-800">{statsSummary.conversionRate}%</p>
            </div>
          </div>
        </motion.div>

        <div className="sm:hidden mb-6">
          <select
            className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value as "list" | "add")}
          >
            <option value="list">View Leads</option>
            <option value="add">Add New Lead</option>
          </select>
        </div>

        <motion.div 
          initial={showAnimation ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Desktop: Always show form on the right */}
          <div
            className={`lg:col-span-2 ${
              activeTab === "list" ? "block" : "hidden sm:block"
            }`}
          >
            <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-100">
              <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600">
                <h2 className="text-xl font-semibold text-white flex items-center">
                  <Users className="mr-2" size={20} />
                  Your Leads Pipeline
                </h2>
              </div>
              <LeadList newLead={newLead} />
            </div>
          </div>

          <div
            className={`${activeTab === "add" ? "block" : "hidden sm:block"}`}
          >
            <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-100">
              <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600">
                <h2 className="text-xl font-semibold text-white flex items-center">
                  <UserPlus className="mr-2" size={20} />
                  Add New Opportunity
                </h2>
              </div>
              <LeadForm onNewLead={handleNewLead} />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}