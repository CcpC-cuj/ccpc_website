import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ MongoDB connection error:", err.message));
console.log("Mongo URI:", process.env.MONGO_URI);

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phone: String,
  preferedLanguage: String,
  skills: String,
  reg_no: String,
  batch: String,
  active: { type: Boolean, default: true }, // everyone active by default
  tasks: { type: [String], default: [] }   // store tasks as array
});


const User = mongoose.model("User", userSchema);

// Registration Route
app.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, Email, and Password are required" });
  }

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: "User already exists" });

    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get all users
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// PUT /api/users/:id/status
app.put("/api/users/:id/status", async (req, res) => {
  const { active } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { active },
      { new: true }
    );
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: "Failed to update status" });
  }
});

// // POST /api/users/:id/task
app.post("/api/users/:id/task", async (req, res) => {
  const { task } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $push: { tasks: task } }, // tasks should be an array in User schema
      { new: true }
    );
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: "Failed to assign task" });
  }
});

app.put("/api/users/:id/updateTasks", async (req, res) => {
  const { tasks } = req.body;
  console.log("Update Tasks called:", req.params.id, tasks); // debug

  if (!Array.isArray(tasks)) {
    return res.status(400).json({ error: "Tasks must be an array" });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { tasks },
      { new: true, runValidators: true }
    );

    if (!updatedUser) return res.status(404).json({ error: "User not found" });

    res.json(updatedUser);
  } catch (err) {
    console.error("Error updating tasks:", err);
    res.status(500).json({ error: "Failed to update tasks" });
  }
});


app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
