var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = 3001;

app.get('/',function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    
    socket.on("New User", function(user_name){
        console.log(user_name+" user joined chat");
        io.emit("New User Added", user_name);
    });
    
    console.log("New user connected");
    
    socket.on('Chat Message', function(msg_json){
       //console.log("Message : "+msg_json.msg); 
       io.emit('Chat Message',msg_json);
    }) ;
    
    socket.on('disconnect', function(obj){
        console.log(obj);
       console.log("User disconnected"); 
       io.emit("disconnect");
    });
});

http.listen(port,function(){
    console.log('Listening on port '+port);
});