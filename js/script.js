$(document).ready( function() {
  $(".start").on("click", function() {
    $(".intro_box").addClass("left");
    var room_name = Math.random();
    window.history.pushState("test", "", "/r/" + room_name);
    var socket = io();
    socket.emit('connection', window.location.href);
    socket.on('user_join', function(msg){
      console.log(msg);
    });
  })
});
