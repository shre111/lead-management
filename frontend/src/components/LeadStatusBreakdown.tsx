import { motion } from "framer-motion";
import { Lead, StatusOption } from "../types/lead";

interface LeadStatusBreakdownProps {
  leads: Lead[];
  statusOptions: StatusOption[];
}

export function LeadStatusBreakdown({ leads, statusOptions }: LeadStatusBreakdownProps) {
  const getStatusBreakdown = () => {
    return statusOptions.map((option) => {
      const count = leads.filter((lead) => lead.status === option.value).length;
      return {
        status: option.value,
        count,
        percentage: leads.length > 0 ? Math.round((count / leads.length) * 100) : 0,
      };
    });
  };

  const statusBreakdown = getStatusBreakdown();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 mb-4">
      {statusBreakdown.map((item) => (
        <motion.div
          key={item.status}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="relative h-3 bg-gray-100 rounded-full overflow-hidden"
          title={`${item.status}: ${item.count} leads (${item.percentage}%)`}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${item.percentage}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`absolute top-0 left-0 h-full ${
              statusOptions
                .find((opt) => opt.value === item.status)
                ?.color.replace("text-", "bg-")
                .replace("100", "500") || "bg-gray-500"
            }`}
          />
        </motion.div>
      ))}
    </div>
  );
}
