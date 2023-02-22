import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";

const PORT = 4000;
const app = express();

const httpServer = createServer(app); // http 서버를 만들고
// const wss = new WebSocket.Server({ server }); //http 서버 위에 소켓을 올리는 과정이다.
const wsServer = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:4000"],
    credentials: true,
  },
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(cors());

const generateID = () => Math.random().toString(36).substring(2, 10);
let chatRooms = [];

//멤버 카운트 함수
function countMember(roomName) {
  return wsServer.sockets.adapter.rooms.get(roomName)?.size;
}

wsServer.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on("createRoom", (roomName) => {
    // console.log(name); client에서 input value이다. 즉 방 제목이 파라미터로 들어온다.
    socket.join(roomName);
    chatRooms.unshift({ id: generateID(), roomName, messages: [] });
    socket.emit("roomsList", chatRooms, countMember(roomName));
  });

  socket.on("findRoom", (id) => {
    let result = chatRooms.filter((room) => room.id == id);
    console.log(
      `방에 진입했을 때 방 정보를 받습니다.: ${JSON.stringify(result)}`
    );
    socket.emit("foundRoom", result[0].messages);
    // console.log("Messages Form", result[0].messages);
  });

  socket.on("newMessage", (data) => {
    const { room_id, message, user, timestamp, file } = data;
    let result = chatRooms.filter((room) => room.id == room_id);
    console.log(
      `방에서 메세지를 보낼때 해당방의 정보입니다.${JSON.stringify(result)}`
    );
    const newMessage = {
      id: generateID(),
      text: message,
      user,
      file,
      time: `${timestamp.hour}:${timestamp.mins}`,
    };
    console.log("New Message: ", newMessage);

    socket.to(result[0].roomName).emit("roomMessage", newMessage);
    result[0].messages.push(newMessage);

    socket.emit("roomsList", chatRooms);
    socket.emit("foundRoom", result[0].messages);
  });

  socket.on("members", (roomName) => {
    const count = wsServer.sockets.adapter.rooms.get(roomName)?.size;
    console.log(`count:${count}`);
    socket.emit("roomMemberCount", count);
  });

  socket.on("disconnect", () => {
    socket.disconnect();
    console.log("🔥: A user disconnected");
  });
});

app.get("/api", (req, res) => {
  res.json(chatRooms);
});

httpServer.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
