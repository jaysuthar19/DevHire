const express = require("express");
const cors = require("cors");
require("dotenv").config();
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");

const connectDB = require("./config/db");

// ROUTES
const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const userRoutes = require("./routes/userRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const messageRoutes = require("./routes/messageRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

const app = express();

// CONNECT DATABASE
connectDB();

// MIDDLEWARE
app.use(express.json());

// CORS
app.use(
  cors({
    origin: [
      "https://dev-hire-liard-five.vercel.app",
      "http://localhost:5173",
    ],
    credentials: true,
  })
);

// STATIC FILES
app.use(
  "/uploads",
  express.static(path.join(__dirname, "/uploads"))
);

// API ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/user", userRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/notifications", notificationRoutes);

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("DevHire API Running...");
});

// CREATE HTTP SERVER
const server = http.createServer(app);

// SOCKET.IO
const io = new Server(server, {
  cors: {
    origin: [
      "https://dev-hire-liard-five.vercel.app",
      "http://localhost:5173",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// SOCKET EVENTS
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // JOIN ROOM
  socket.on("joinRoom", ({ userId, otherUserId }) => {
    const roomId = [userId, otherUserId]
      .sort()
      .join("_");

    socket.join(roomId);
  });

  // SEND MESSAGE
  socket.on("sendMessage", (data) => {
    const roomId = [data.sender, data.receiver]
      .sort()
      .join("_");

    io.to(roomId).emit(
      "receiveMessage",
      data
    );
  });

  // DISCONNECT
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// START SERVER
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});