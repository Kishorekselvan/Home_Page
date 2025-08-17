import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// __dirname fix for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ MongoDB Connection (cleaner for Mongoose 7+)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Atlas connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// --- SCHEMAS & MODELS ---
const eventSchema = new mongoose.Schema({
  name: String,
  description: String,
  date: Date,
  createdAt: { type: Date, default: Date.now },
});

const Event = mongoose.model("Event", eventSchema, "events");
const PastEvent = mongoose.model("PastEvent", eventSchema, "events_past");
const Workshop = mongoose.model("Workshop", eventSchema, "workshops");

// --- API ROUTES ---
app.get("/api/events", async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (error) {
    console.error("❌ Error fetching events:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

app.get("/api/past-events", async (req, res) => {
  try {
    const pastEvents = await PastEvent.find().sort({ date: -1 });
    res.json(pastEvents);
  } catch (error) {
    console.error("❌ Error fetching past events:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

app.get("/api/workshops", async (req, res) => {
  try {
    const workshops = await Workshop.find().sort({ date: 1 });
    res.json(workshops);
  } catch (error) {
    console.error("❌ Error fetching workshops:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// --- SERVE FRONTEND BUILD ---
// ⚠️ Adjust path if frontend is outside backend folder
const frontendPath = path.join(__dirname, "../frontend/dist");
app.use(express.static(frontendPath));

// ✅ Catch-all route for React Router
app.get("/*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// --- START SERVER ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
