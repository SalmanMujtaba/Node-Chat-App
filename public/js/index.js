// var moment = require('moment');
var socket = io();

function scrollToBottom () {
  // Selectors
  var messages = jQuery('#messages');
  var newMessage = messages.children('li:last-child')
  // Heights
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
}
socket.on('connect', ()=>{
  console.log('connected to server');
});
socket.on('disconnect', ()=>{
  console.log('disconnected from server');
});


socket.on('newMessage', function (message) {
  console.log('newMessage', message);
  // var li = jQuery('<li></li>');
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template, {
    from: message.from,
    text: message.text,
    createdAt: formattedTime
  });
  jQuery('#messages').append(html);
  scrollToBottom();
});

socket.on('newLocationMessage', function(location){

  var formattedTime = moment(location.createdAt).format('h:mm a');
  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template, {
    from: location.from,
    url: location.url,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html);
  scrollToBottom
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
