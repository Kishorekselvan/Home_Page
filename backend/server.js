import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Backend is connected to MongoDB Atlas!");
});


mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB Atlas connected");
    app.listen(process.env.PORT, () =>
      console.log(`🚀 Server running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));


const eventSchema = new mongoose.Schema({
  name: String,
  description: String,
  date: Date,
  createdAt: { type: Date, default: Date.now },
});


const Event = mongoose.model("Event", eventSchema, "events");
const PastEvent = mongoose.model("PastEvent", eventSchema, "events_past");
const Workshop = mongoose.model("Workshop", eventSchema, "workshops");


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
