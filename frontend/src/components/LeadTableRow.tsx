import { motion } from "framer-motion";
import { Lead, StatusOption } from "../types/lead";

interface LeadTableRowProps {
  lead: Lead;
  statusOptions: StatusOption[];
  isHighlighted: boolean;
}

export function LeadTableRow({ lead, statusOptions, isHighlighted }: LeadTableRowProps) {
  const statusOption = statusOptions.find((option) => option.value === lead.status);
  const statusColor = statusOption?.color || "bg-gray-100 text-gray-800";

  return (
    <motion.tr
      key={lead._id}
      initial={isHighlighted ? { backgroundColor: "#e6f7ff" } : {}}
      animate={
        isHighlighted
          ? { backgroundColor: ["#e6f7ff", "#ffffff"] }
          : { backgroundColor: "#ffffff" }
      }
      transition={isHighlighted ? { duration: 2, ease: "easeOut" } : {}}
      className="hover:bg-gray-50 group"
    >
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-md"
          >
            <span className="text-white font-medium">
              {lead.name.charAt(0).toUpperCase()}
            </span>
          </motion.div>
          <div className="ml-3">
            <div className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
              {lead.name}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <a
          href={`mailto:${lead.email}`}
          className="text-blue-600 hover:text-blue-800 hover:underline"
        >
          {lead.email}
        </a>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <motion.span
          whileHover={{ scale: 1.05 }}
          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${statusColor}`}
        >
          {statusOption?.icon}
          {lead.status}
        </motion.span>
      </td>
    </motion.tr>
  );
}
