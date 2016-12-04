$(document).ready( function() {
  var socket = io();
  socket.emit('connection', window.location.href);
  socket.on('user_join', function(msg){
    console.log(msg);
  });
});
