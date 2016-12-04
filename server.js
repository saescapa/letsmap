var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var rooms = [];

app.use('/css', express.static('css'));
app.use('/js', express.static('js'));


app.use('/test/', function(req, res){
  console.log(rooms);
});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
app.get('/r/*', function(req, res){
  res.sendFile(__dirname + '/room.html');
});

io.on('connection', function(socket){
  socket.on('connection', function(url){
    if(url.indexOf("/r/") != -1) {
      var room_id = url.substring(url.indexOf("/r/") + 3);
      var flag = lookForRoom(room_id);
      console.log(flag);
      if(flag != -1) {
        console.log("Sending to owner");
        rooms[flag].people.push(socket.id);
        socket.broadcast.to(rooms[flag].owner).emit('user_join', 'name');
      } else {
        var room = {
          name: room_id,
          owner: socket.id,
          people: [
            socket.id
          ]
        }
        rooms.push(room);
      }
    } else {
      // res.sendFile(__dirname + '/index.html');
    }
  });
});

function lookForRoom(room_id) {
  for(var i = 0; i < rooms.length; i++) {
    if(rooms[i].name = room_id) {
      return i;
    }
  }
  return -1;
}

http.listen(3000, function(){
  console.log('listening on *:3000');
});
