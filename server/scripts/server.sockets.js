'use strict'

module.exports = function( io, user_model, room_model) {

  let sockets = {};
  let rooms = {};

  const configUser = userConfig => {
    sockets[userConfig.id].name = userConfig.name;
  }

  const createRoom = request => {
    const room = new room_model( sockets[request.id], request.name );

  }

  const joinRoom = request => {
    try {
      rooms[request.room].add_user( sockets[request.id] );
    } catch ( error ) {
      sockets[request.id].socket.emit('Connection Error:', error );
    }
  }

  const onUserDisconnect = id => {
    console.log(`User ${id}, has left the server`);
    delete sockets[id];
  }

  const receiveTransmission = message => {
    const route = message.to.split(":");
    if( route[0] == 'user' ) sendMessageToUser( message, route[1] )
    else if ( route[0] == 'room' ) sendMessageToRoom( message, route[1] );
  }

  const sendMessageToRoom = (message, room_id) => {
    try {
      message.owner.to( sockets[room_id].socket ).emit( 'transmission', message );
    } catch( error ) {
      message.owner.emit('Transmission Failure:', error );
    }
  }

  const sendMessageToUser = (message, user_id ) => {
    try{
      io.to(user_id).emit( 'transmission',  message );
    } catch {
      message.owner.emit('Transmission Failure:', error );
    }
  }

  io.on('connection', function( socket ){
    console.log(`User ${id}, has joined the server`);
    sockets[socket.id] = new user_model( socket );
    sockets[socket.id].on('transmission', receiveTransmission );
    sockets[socket.id].on('whoami', configUser );
    sockets[socket.id].on('join', joinRoom );
    sockets[socket.id].on('leave', leaveRoom );
    sockets[socket.id].on('disconnect',  () => {onUserDisconnect(socket.id)});
    sockets[socket.id].on('host', createRoom );
  })

}
