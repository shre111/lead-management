import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

export const fetchLeads = () => API.get("/leads");
export const addLead = (lead: {
  name: string;
  email: string;
  status: string;
}) => API.post("/leads", lead);
