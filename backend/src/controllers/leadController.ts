import { Request, Response } from "express";
import Lead from "../models/Lead";

export const addLead = async (req: Request, res: Response) => {
  try {
    const { name, email, status } = req.body;
    const lead = new Lead({ name, email, status });
    await lead.save();
    res.status(201).json(lead);
  } catch (error) {
    res.status(500).json({ message: "Error adding lead", error });
  }
};

export const getLeads = async (_req: Request, res: Response) => {
  try {
    const leads = await Lead.find();
    res.status(200).json(leads);
  } catch (error) {
    res.status(500).json({ message: "Error fetching leads", error });
  }
};
