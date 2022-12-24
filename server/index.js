const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"], credentials: true },
});
const PORT = process.env.PORT || 5000;
const router = require("./routes/router");
const cors = require("cors");
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");

//cors policy
app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS,GET , POST, PUT ,PATCH,DELETE"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type , Authorization");
    if (req.method === "OPTIONS") {
      return res.sendStatus(200);
    }
    next();
  });
  app.use(router);
  
  io.on("connection", (socket) => {
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({id:socket.id ,name,room});
    if(error) return callback(error);
    socket.emit('message',{user:'admin' , text:`${user?.name}, welcome to the room ${user?.room}`});
    socket.broadcast.to(user?.room).emit('message',{user:'admin',text:`${user?.name}, has joined the chat`});
    socket.join(user?.room);

    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

    callback()
  });
    socket.on('sendMessage',(message,callback)=>{
      const user = getUser(socket.id);
  
      io.to(user?.room).emit('message',{user:user?.name,text:message});
      callback();
    })

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    
    if(user){
      io.to(user?.room).emit('message',{user:"admin", text:`${user?.name} Has Left`});
      io.to(user?.room).emit('roomData',{room:user?.room,  users:getUsersInRoom(user?.room)});
    }
  });
});


//connection
server.listen(PORT, () => {
  console.log(`server is running ${PORT}`);
});
