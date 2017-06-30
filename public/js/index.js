var socket = io();
socket.on('connect', ()=>{
  console.log('connected to server');

  socket.emit('createMessage', {
    from: 'mujtaba',
    to: 'juhi'
  });
});

socket.on('disconnect', ()=>{
  console.log('disconnected from server');
});

socket.on('newMessage', function(message){
  console.log(message);
});
