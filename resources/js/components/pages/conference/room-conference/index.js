import socketIO from 'socket.io-client';
const socket = socketIO('https://88ad4b78e902.ngrok.io', { transports: ['websocket'] });
// const socket = socketIO('http://localhost:3001', {transports: ['websocket']});

const join = (room, callback) => {
  // Listen for 'join' messages
  socket.emit('joining', room)
  socket.on('join', (message) => {
    callback(message);
  })
}

const signaling = (callback) => {
  // Listen for 'signaling' messages
  socket.on('signaling', (message) => {
    callback(message);
  })
}

const send = (channel, message) => {
  // Send message to server
  socket.emit(channel, message);
}

export { join, signaling, send }