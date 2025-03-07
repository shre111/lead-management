import express from "express";
import { addLead, getLeads } from "../controllers/leadController";

const router = express.Router();

router.post("/leads", addLead);
router.get("/leads", getLeads);

export default router;
