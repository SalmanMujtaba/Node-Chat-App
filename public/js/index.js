// var moment = require('moment');
var socket = io();
socket.on('connect', ()=>{
  console.log('connected to server');
});
socket.on('disconnect', ()=>{
  console.log('disconnected from server');
});


socket.on('newMessage', function (message) {
  console.log('newMessage', message);
  var li = jQuery('<li></li>');
  var formattedTime = moment(message.createdAt).format('h:mm a');
  li.text(`${message.from} ${formattedTime}: ${message.text}`);
  jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(location){
  var li = jQuery('<li></li>');
  var a =  jQuery('<a target="_blank">My current location</a>');
  var formattedTime = moment(location.createdAt).format('h:mm a');

  li.text(location.from+' '+formattedTime+': ');
  a.attr('href', location.url);
  li.append(a);
  jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

var message =  jQuery('[name=message]');
  socket.emit('createMessage', {
     from: 'User',
     text: message.val()
   }, function () {
    message.val('');
   });
 });


var locationB = jQuery('#send-location');
locationB.on('click', function(){
  if(!navigator.geolocation){
    return alert('Gelocation not supported');
  }
  locationB.attr('disabled', 'disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(function(position){
    locationB.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage',{
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function(){
    locationB.removeAttr('disabled').text('Send location');
          alert('Unable to fetch location.');
        });
});
