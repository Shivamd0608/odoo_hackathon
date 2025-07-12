const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema({
  title: String,         // e.g. "Frontend Developer"
  company: String,       // e.g. "Google"
  duration: String,      // e.g. "Jan 2022 - Present"
  description: String,   // Optional short description
});

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g. "React"
  type: { type: String, enum: ["offered", "wanted"], required: true },
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" }
});

const userSchema = new mongoose.Schema({
  // Basic Info
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  company: String,
  location: String,
  address: String,

  // Profile & Experience
  experience: [experienceSchema],  // array of experiences
  skills: [skillSchema],           // array of offered/wanted skills
  availability: [String],          // ["weekends", "evenings"]
  isPublic: { type: Boolean, default: true },

  // Visuals
  photoUrl: String,
  bannerUrl: String,

  

  // Social
  linkedin: String,
  website: String,
  twitter: String,
  github: String,
  portfolio: String,

  // System
  isBanned: { type: Boolean, default: false },
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: Date.now },

  badge: {
  type: String,
  enum: ["Beginner", "Starter", "Professional", "Expert"],
  default: "Beginner"},
    
  avgRating: {
  type: Number,
  default: 0},
    
  completedSwaps: {
  type: Number,
  default: 0
}

});

module.exports = mongoose.model("User", userSchema);
