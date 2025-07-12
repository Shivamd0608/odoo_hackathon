const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const swapRoutes = require("./routes/swap");
const chatRoutes = require("./routes/chat");
const ratingRoutes = require("./routes/rating");

const app = express();

// Middlewares
app.use(cors()); 
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/swap", swapRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/rating", ratingRoutes);

app.get("/", (req, res) => {
  res.send("Skill Swap API is running");
});

module.exports = app;
