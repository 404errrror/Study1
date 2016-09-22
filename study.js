var io = require('socket.io')({
    transports: ['websocket'],
});


io.attach(3000);

io.on('connection', function(socket) {
    console.log('Server Connect!!');
    socket.on('join',function (data){
        console.log(data.user + ' : ' + data.roomname);

        socket.leave(socket.room);
        socket.join(data.roomname);
        socket.room = data.rommname;
    });


    socket.on('chat',function (data) {
        console.log(data.user + ' : ' + data.msg + ' : ' + data.dae);

        io.socket.in(socket.room).emit('chat', data);
    });

    socket.on('disconnect',function(data){
        console.log(data.user + 'disconnect!');
    });

});
