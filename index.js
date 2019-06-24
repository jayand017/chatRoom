var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname));

/* app.get('/', function(req, res){
  res.send('<h1>Hello world</h1>');
});
 */

app.get('/', function(req, res){
    res.header({'Content-Type' : 'text/html'});
    res.sendFile('/index.html');
});

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('chat message', function(msg){
        console.log('message: ' + msg);
        socket.broadcast.emit('chat message', msg);
    });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});