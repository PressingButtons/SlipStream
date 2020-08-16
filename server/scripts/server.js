'use strict';
const server = ( path, app ) => {

  const http = require('http').createServer( app );
  const io   = require('socket.io')(http);

  //server libraries
  const routing = require( path.join(__dirname, 'server.outer.js'))( app, path.join(__dirname, '../HTML'), path );
  const server_room = require(path.join(__dirname, 'server.room.js'));
  const server_user = require(path.join(__dirname, 'server.user.js'));
  const server_io   = require(path.join(__dirname, 'server.sockets.js'))( io, server_user, server_room );
  //



  return {
    init : function( port ) {
      http.listen( port, err => {
        if ( err ) throw err;
        console.log(`Server initialized, listening on port *:${port}`);
      })
    }
  }

}
