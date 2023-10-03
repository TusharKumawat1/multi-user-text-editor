import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
try {
  const app = express();
const server = createServer(app);
const port = 4001;
app.use(cors());
const io = new Server(server, {
  cors: { origin: "*" },
});
app.use(express.json());

//socket io
const usersInAroom = {};
function getAllConnectedClients(roomId) {
  // Map
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
    (socketId) => {
      return {
        socketId,
        username: usersInAroom[socketId],
      };
    }
  );
}
let outputArray = [];
io.on("connection", (socket) => {
  console.log("a user connect with id:", socket.id);
  socket.on("join room", (data) => {
    usersInAroom[socket.id] = data.username;
    socket.join(data.roomId);
    const clients = getAllConnectedClients(data.roomId);
    clients.forEach(({ socketId }) => {
      io.to(socketId).emit("joined", {
        clients,
        username: data.username,
        socketId: socket.id,
      });
    });
  });

  socket.emit("joined", outputArray);
  socket.on("changeValue", (data) => {
    socket.in(data.roomId).emit("reciveValue", data.value);
  });
  socket.on("disconnecting", (roomId) => {
    console.log("disconnecting")
    const rooms = [...socket.rooms];
    rooms.forEach((roomId) => {
      socket.in(roomId).emit("leave", {
        socketId: socket.id,
        username: usersInAroom[socket.id],
      });
    });
    delete usersInAroom[socket.id];
    socket.leave();
  });
});
server.listen(port, () => {
  console.log("listening on *:4001");
});

} catch (error) {
  console.log(error)
}