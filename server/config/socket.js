var numUsers = 0;

io.on('connection', (socket) => {
    console.log('user connected');
    
    // when the client emits 'new message', this listens and executes
    socket.on('new message', (data) => {
        // we tell the client to execute 'new message'
        socket.broadcast.emit('new message', {
          username: data.username,
          message: data.message
        });
        console.log(socket.username);
        console.log(data);
    });


    // when the client emits 'add user', this listens and executes
    socket.on('add user', (username) => {
        socket.username = username;
        ++numUsers;
        socket.emit('login', {
        numUsers: numUsers
        });
        // echo globally (all clients) that a person has connected
        socket.broadcast.emit('user joined', {
        username: socket.username,
        numUsers: numUsers
        });
    });

    // when the user disconnects.. perform this
    socket.on('disconnect', () => {
        --numUsers;

        // echo globally that this client has left
        socket.broadcast.emit('user left', {
            username: socket.username,
            numUsers: numUsers
        });
    });
});