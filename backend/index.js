const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors');
const port = process.env.PORT || 5000;
const { connect } = require('mongoose');

require('dotenv').config()

app.use(cors());
app.use(express.json())

const uri = process.env.Atlas_URI;
mongoose.connect(uri,{
    useNewUrlParser:true,
    // useCreateIndex:true,
});
const connection = mongoose.connection;
connection.once('open',()=>{
    console.log('MongoDB database connection successful..')
})

//Setting Router
const userRoutes = require('./router/routes');
app.use('/api/auth',userRoutes);

const messageRoutes = require("./router/message");
app.use('/api/messages',messageRoutes);

const server = app.listen(port,()=>{
    console.log(`server is listening on port ${port}`)
})


const socket = require('socket.io');

const io = socket(server,{
    cors:{
        origin:"http://localhost:3000",
        credentials:true,
    },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
      onlineUsers.set(userId, socket.id);
    });
  
    socket.on("send-msg", (data) => {
      const sendUserSocket = onlineUsers.get(data.to);
      if (sendUserSocket) {
        socket.to(sendUserSocket).emit("msg-recieve", data.msg);
      }
    });
  });

