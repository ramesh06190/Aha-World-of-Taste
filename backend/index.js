const http = require("http");
const app = require("./app");
const socketio = require("socket.io");
const { saveMessage } = require("./controller/user");

const port = process.env.PORT || 8090;

const server = http.createServer(app);

// socket connection
const io = socketio(server, {
  cors: {
    origin: "*",
  },
});

const rooms = {};
io.on("connection", (socket) => {
  console.log("New user connected");
  socket.on("join room", (roomId) => {
    console.log(roomId, "here");
    socket.join(roomId);
    if (!rooms[roomId]) {
      rooms[roomId] = [];
    }
    rooms[roomId].push(socket);
    io.to(roomId).emit("user joined", socket.id);
  });
  socket.on("send message", (roomId, message, sender) => {
    saveMessage(roomId, sender, message);
    io.to(roomId).emit("new message", {
      senderId: socket.id,
      content: message,
      sender,
      timestamp: Date.now(),
    });
  });
  socket.on("disconnect", () => {
    console.log("User disconnected");

    for (const roomId in rooms) {
      if (rooms[roomId].includes(socket)) {
        rooms[roomId].splice(rooms[roomId].indexOf(socket), 1);
        io.to(roomId).emit("user left", socket.id); // Notify users in the room
      }
    }
  });

  // Reconnection logic
  socket.on("reconnect", (attemptNumber) => {
    console.log(
      `User ${socket.id} is attempting to reconnect (attempt ${attemptNumber})`
    );

    // Add any specific reconnection logic you need here
    // For example, rejoin rooms, send a welcome back message, etc.
  });
});

server.listen(port, () => {
  console.log(`local server started on http://localhost:${port}`);
});
