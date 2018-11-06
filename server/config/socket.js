var usersCount = 0;

io.on('connection', (socket) => {
    console.log('user connected');
    
    // when the client emits 'new message', this listens and executes
    socket.on('new message', (data) => {
        // we tell the client to execute 'new message'
        socket.broadcast.emit('new message', {
          username: data.username,
          message: data.message,
          gender: data.gender
        });
        console.log(socket.username);
        console.log(data);
    });

    // when the client emits 'add user', this listens and executes
    socket.on('add user', (username) => {
        socket.username = username;        
        ++usersCount;
        socket.emit('login', {
            usersCount: usersCount
        });
        console.log(usersCount);
        // echo globally (all clients) that a person has connected
        socket.broadcast.emit('user joined', {
        username: socket.username,
        usersCount: usersCount
        });
    });

    // when the user disconnects.. perform this
    socket.on('user left', () => {
        --usersCount;
        // echo globally that this client has left
        socket.broadcast.emit('user left', {
            username: socket.username,
            usersCount: usersCount
        });
    });

    // when the client emits 'typing', we broadcast it to others
    socket.on('typing', (username) => {
        socket.broadcast.emit('typing', {
            username: username
        });
    });

    // when the client emits 'stop typing', we broadcast it to others
    socket.on('stop typing', (username) => {
        socket.broadcast.emit('stop typing', {
            username: username
        });
    });
    });