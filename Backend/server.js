import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { sendEmail, sendBulkEmail, generateWelcomeEmail, generateBulkWelcomeEmail } from "./emailService.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5002;

app.use(cors({ origin: process.env.CORS_ORIGIN || "http://localhost:3000", credentials: true }));
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

// Settings schema for controlling registration form
const settingsSchema = new mongoose.Schema({
  key: { type: String, unique: true, required: true },
  value: { type: mongoose.Schema.Types.Mixed, required: true }
});

const User = mongoose.model("User", userSchema);
const Settings = mongoose.model("Settings", settingsSchema);

// Admin Login Route
app.post("/api/admin/login", async (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ 
      success: false, 
      message: "Email and password are required" 
    });
  }

  try {
    // Get admin credentials from environment variables
    const adminEmails = process.env.ADMIN_EMAILS1 || process.env.ADMIN_EMAILS2 || process.env.ADMIN_EMAILS3;
    const adminPasswords = process.env.ADMIN_PASSWORDS1 || process.env.ADMIN_PASSWORDS2 || process.env.ADMIN_PASSWORDS3;
    
    // Split by || to get array of admins
    const emailList = adminEmails.split("||").map(e => e.trim());
    const passwordList = adminPasswords.split("||").map(p => p.trim());
    
    // Check if email and password match at the same index
    const adminIndex = emailList.findIndex(e => e === email);
    
    if (adminIndex !== -1 && passwordList[adminIndex] === password) {
      // Generate a simple token (in production, use JWT)
      const token = Buffer.from(`${email}:${Date.now()}`).toString('base64');
      
      return res.json({ 
        success: true, 
        token: token,
        email: email,
        message: "Login successful" 
      });
    }
    
    // Invalid credentials
    return res.status(401).json({ 
      success: false, 
      message: "Invalid credentials" 
    });
    
  } catch (error) {
    console.error("Admin login error:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Server error during login" 
    });
  }
});

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

// Get registration form status
app.get("/api/settings/registration-status", async (req, res) => {
  try {
    let setting = await Settings.findOne({ key: "registrationFormOpen" });
    if (!setting) {
      // Create default setting if doesn't exist
      setting = await Settings.create({ key: "registrationFormOpen", value: true });
    }
    res.json({ isOpen: setting.value });
  } catch (err) {
    console.error("Error fetching registration status:", err);
    res.status(500).json({ error: "Failed to fetch registration status" });
  }
});

// Update registration form status (admin only)
app.put("/api/settings/registration-status", async (req, res) => {
  const { isOpen } = req.body;
  try {
    let setting = await Settings.findOneAndUpdate(
      { key: "registrationFormOpen" },
      { value: isOpen },
      { new: true, upsert: true }
    );
    res.json({ isOpen: setting.value, message: `Registration form ${isOpen ? 'opened' : 'closed'}` });
  } catch (err) {
    console.error("Error updating registration status:", err);
    res.status(500).json({ error: "Failed to update registration status" });
  }
});

// Send email to individual user
app.post("/api/email/send-individual", async (req, res) => {
  const { userId } = req.body;
  
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const htmlContent = generateWelcomeEmail(user);
    const result = await sendEmail(
      user.email,
      "Welcome to Code Crafters Programming Club",
      htmlContent
    );

    if (result.success) {
      res.json({ success: true, message: `Email sent to ${user.email}` });
    } else {
      res.status(500).json({ success: false, message: "Failed to send email", error: result.error });
    }
  } catch (error) {
    console.error("Error sending individual email:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
});

// Send email to all active users
app.post("/api/email/send-bulk", async (req, res) => {
  try {
    const activeUsers = await User.find({ active: true });
    
    if (activeUsers.length === 0) {
      return res.status(400).json({ success: false, message: "No active users found" });
    }

    const recipients = activeUsers.map(u => u.email);
    const htmlContent = generateBulkWelcomeEmail();
    
    const result = await sendBulkEmail(
      recipients,
      "Welcome to Code Crafters Programming Club",
      htmlContent
    );

    if (result.success) {
      res.json({ 
        success: true, 
        message: `Bulk email sent to ${activeUsers.length} users`,
        count: activeUsers.length 
      });
    } else {
      res.status(500).json({ success: false, message: "Failed to send bulk email", error: result.error });
    }
  } catch (error) {
    console.error("Error sending bulk email:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
