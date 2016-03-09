var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = 3001;

app.get('/',function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    //console.log(socket);
    var room_name = "";
    
    socket.on("join", function(data){ 
        room_name = data.room_name;
        socket.join(data.room_name);
        console.log("User Joined to room name"+room_name);
    });
    
    socket.on("New User", function(user_name){
        //console.log(socket);
        console.log(user_name+" user joined chat");
        socket.user_name = user_name;
        io.to(room_name).emit("New User Added", {'user_name' : user_name});
    });
    
    console.log("New user connected");
    
    socket.on('Chat Message', function(msg_json){
       //console.log("Message : "+msg_json.msg); 
       //io.emit('Chat Message',msg_json);
       io.to(room_name).emit('Chat Message',msg_json);
    }) ;
    
    socket.on('disconnect', function(obj){
        //console.log(obj);
        console.log(socket.user_name+" user disconnected"); 
        io.to(room_name).emit("disconnect",{'user_name' : socket.user_name});
    });
});

http.listen(port,function(){
    console.log('Listening on port '+port);
});