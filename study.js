var io = require('socket.io')({
    transports: ['websocket'],
});

var userNum = 1;
io.attach(46455);

//var port = process.env.Port || 3000;

io.on('connection', function(socket) {
    console.log('Server Connect!!');
    var userName = 'user' + userNum;
    userNum++;
    socket.on('userInit',function(data){
        console.log('sfafsd');
        data.userName = userName;
        io.to(socket.id).emit('getName',data);
        console.log(userName + "Success!!");
    });


    socket.on('join',function (data){
        console.log(data.user + ' : ' + data.roomname);

        socket.leave(socket.room);
        socket.join(data.roomname);
        socket.room = data.rommname;
    });


    socket.on('chat',function (data) {
        console.log(data.user + ' : ' + data.msg + ' : ' + data.dae );

        io.sockets.in(data.roomname).emit('chat', data);
    });

    socket.on('disconnect',function(data){
        console.log(data.user + 'disconnect!');
    });

});
