const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const {generateMessage, generateLocationMessage} = require('./utils/message');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket)=>{
  console.log('New user connected');

  socket.on('disconnect', ()=>{
    console.log('disconnected from server');
  });

  socket.on('createLocationMessage', (coords)=>{
    io.emit('newLocationMessage',generateLocationMessage('Admin', coords.latitude,coords.latitude));
  });


  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user Joined'));

  socket.on('createMessage', (message) => {
    console.log(message);
    io.emit('newMessage',generateMessage(message.from, message.text));
  });
});
server.listen(port,()=>{
  console.log('server started on port'+port);
});

module.exports = {app};
