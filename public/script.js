var baseUrl = 'localhost:3000/';
var io = io.connect(baseUrl);

io.on('connect',function(){
  console.log('connection established');
  io.emit('handshake',{ deviceId : deviceId})
});

function goLeft() {
  console.log('S: LEFT');
  io.emit('action',{ action : 'LEFT', deviceId : deviceId});
}

function goRight() {
  console.log('S: RIGHT');
  io.emit('action',{ action : 'RIGHT', deviceId : deviceId});
}

function goTop() {
  console.log('S: TOP');
  io.emit('action',{ action : 'TOP', deviceId : deviceId});
}

function goDown() {
  console.log('S: DOWN');
  io.emit('action',{ action : 'DOWN', deviceId : deviceId});
}

io.on('response',function(data){

  switch (data.action) {
    case 'LEFT':
      console.log('R: LEFT', data.deviceId);
      io.emit('response_ack',{deviceId : deviceId, action : 'LEFT', data: data});
      break;
    case 'RIGHT':
      console.log('R: RIGHT', data.deviceId);
      io.emit('response_ack',{deviceId : deviceId, action : 'RIGHT', data: data});
      break;
    case 'TOP':
      console.log('R: TOP', data.deviceId);
      io.emit('response_ack',{deviceId : deviceId, action : 'TOP', data: data});
      break;
    case 'DOWN':
      console.log('R: DOWN', data.deviceId);
      io.emit('response_ack',{deviceId : deviceId, action : 'DOWN', data: data});
      break;
  }

});