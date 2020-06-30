const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

// Enable CORS
io.set('origins', '*:*');
io.on('connection', socket => {

  // const room = 'ExampleRoom';
  
  // const join = (room) => {
  //   // Count clients in room
  //   const clientCount = (typeof io.sockets.adapter.rooms[room] !== 'undefined') ? io.sockets.adapter.rooms[room].length : 0;
  //   console.log('client', clientCount)
  //   // Check if client can join to the room
  //   if (clientCount < 5) {
  //     socket.join(room);
  //     socket.emit('join', { clientCount: clientCount+1 });
  //     console.log('Joined to room!');
  //   } else {
  //     console.log('Room is full!');
  //   };
  // }
  
  // join(room);
  
  // socket.on('signaling', (room, message) => {
  //   socket.to(room).emit('signaling', message);
  // })

  socket.on('joining', room => {
    console.log('typeof room ', typeof io.sockets.adapter.rooms[room], 'room', room)
    const clientCount = (typeof io.sockets.adapter.rooms[room] !== 'undefined') ? io.sockets.adapter.rooms[room].length : 0;
    console.log('client', clientCount)
    // Check if client can join to the room
    if (clientCount < 5) {
      socket.join(room);
      socket.emit('join', { clientCount: clientCount+1 });
      console.log('Joined to room!', room);
    } else {
      console.log('Room is full!');
    };
  })
  
  socket.on('signaling', (data) => {
    socket.to(data.room).emit('signaling', data.message);
  })
})

server.listen(3001, () => {
	console.log("Socket.IO server is running on localhost:3001");
})