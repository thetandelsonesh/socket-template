const express = require('express');
const socketIO = require('socket.io');

const app = express();

app.use('/', express.static(__dirname + '/public/'));

const io = socketIO.listen(app.listen(3000, () => {
  console.log(`Server Running on port 3000`);
  app.set("io",io);
}));

io.on('connection', (socket) => {

  socket.on('handshake', (data) => {
    console.log('JOINED ', data.deviceId);
    socket.join(data.deviceId);
  });

  socket.on('action', (data) => {

    console.log('ACTION ', data);
    socket.to('DEVICE_A').emit('response',data);
    socket.to('DEVICE_B').emit('response',data);
    socket.to('DEVICE_C').emit('response',data);
  });

  socket.on('response_ack', (data) => {
    console.log('RESPONSE ACK', data);
  });
});