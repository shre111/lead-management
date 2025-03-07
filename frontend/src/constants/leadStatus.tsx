import { Zap, Star, Mail, Award, AlertCircle } from "lucide-react";
import { StatusOption } from "../types/lead";

export const STATUS_OPTIONS: StatusOption[] = [
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
