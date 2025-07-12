const http = require("http");
const socketIO = require("socket.io");
const app = require("./app"); // your express app

const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "*", // You can restrict this to your frontend origin
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 5000;

// Socket.io connection
io.on("connection", (socket) => {
  console.log("🟢 New client connected:", socket.id);

  socket.on("join_swap", (swapId) => {
    socket.join(swapId);
    console.log(`User joined swap room: ${swapId}`);
  });

  socket.on("send_message", (data) => {
    // Save to DB (optional)
    io.to(data.swapId).emit("receive_message", data); // Broadcast to all in room
  });

  socket.on("disconnect", () => {
    console.log("🔴 Client disconnected:", socket.id);
  });
});

// Attach io to app for access in controllers (optional)
app.set("io", io);

// Start server
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
