const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const { errorHandler } = require("./middlewares/errorHandler");
const { notFound } = require("./middlewares/notFoundHandler");
const authRouter = require("./routes/authRoute");
const cloudinary = require("cloudinary");
const usersRouter = require("./routes/usersRoute");
const auth = require("./middlewares/authMiddleware");
const chatsRouter = require("./routes/chatsRoute");
const messagesRouter = require("./routes/messagesRoute");
const notificationsRouter = require("./routes/notificationsRoute");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", auth, usersRouter);
app.use("/api/v1/chats", auth, chatsRouter);
app.use("/api/v1/messages", auth, messagesRouter);
app.use("/api/v1/notifications", auth, notificationsRouter);

app.use(errorHandler);
app.use(notFound);

let usersOnline = [];

const server = createServer(app);

const io = new Server(server, {
  pingTimeout: 100000,
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log(`Socket connected - ${socket.id}`);
  socket.on("set_up", (userData) => {
    socket.join(userData?._id);
    console.log("User === ", userData?._id);
    usersOnline.push({ ...userData, lastActive: null });
    io.emit("users_online", usersOnline);
  });
  socket.on("user_connected", (user) => {
    console.log("User --- logged in ", user?._id);
    usersOnline.push({ ...user, lastActive: null });
    io.emit("users_online", usersOnline);
  });
  socket.on("disconnect_user", (user) => {
    console.log("User --- logged out ", user?._id);
    usersOnline = usersOnline.map((u) =>
      u?._id === user?._id ? { ...u, lastActive: new Date().toISOString() } : u
    );
    io.emit("users_online", usersOnline);
  });
  socket.on("join_chat", (chat) => {
    socket.join(chat?._id);
    console.log("Joined chat ---", chat?._id);
  });
  socket.on("send_message", (message) => {
    message?.chat?.users?.forEach((user) => {
      if (user?._id === message?.sender?._id) return;
      console.log(user?._id);
      socket.to(user?._id).emit("new_message", message);
    });
  });
  socket.on("set_typing_indicator", (typing, chat, userId) => {
    console.log(typing)
    console.log(userId)
    chat?.users?.forEach((user) => {
      if (user?._id === userId) return;
      console.log(chat?.users)
      socket.to(user?._id).emit("get_typing_indicator", typing);
    });
  });
});

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_URL);
    server.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  } catch (err) {
    console.error(err);
    process.exit();
  }
}

startServer();
