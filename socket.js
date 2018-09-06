module.exports = (server)=>{
    let io = require('socket.io')(server);
    io.on('connection', function (socket) {
        socket.on('chat message', function (msg) {
            io.emit('chat message', msg);
        });
    });
};

