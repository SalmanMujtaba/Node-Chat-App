const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

var users = new Users();
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var moment = require('moment');

app.use(express.static(publicPath));

io.on('connection', (socket)=>{
  console.log('New user connected');

  socket.on('join', (param, callback)=>{
    if(!isRealString(param.name) || !isRealString(param.room)){
      return callback('Name and room are required');
    }
      io.to(param.room).emit('updateUsersList', )
      socket.join(param.room);
      //remove users from any other rooms
      users.removeUser(socket.id);
      //add the user into the current room
      users.addUser(socket.id, param.name, param.room);

      io.to(param.room).emit('updateUsersList', users.getUserList(param.room));
      socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
      socket.broadcast.to(param.room).emit('newMessage', generateMessage('Admin', param.name+' has joined.'));
    callback();
  });

  socket.on('createMessage', (message,callback) => {
    console.log(message);
    io.emit('newMessage',generateMessage(message.from, message.text));
    callback();
  });

  socket.on('createLocationMessage', (coords)=>{
    io.emit('newLocationMessage',generateLocationMessage('Admin', coords.latitude,coords.latitude));
  });

  socket.on('disconnect', ()=>{
    var user = users.removeUser(socket.id);
    console.log('disconnected from server');

    if(user)
    {
      io.to(user.room).emit('updateUsersList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', user.name+' has left.'));
    }
  });

});
server.listen(port,()=>{
  console.log('server started on port'+port);
});

module.exports = {app};
