const server_room = function ( host, name ) {

  var users = [host];

  const add_user = function( user ) {
    users.push( user );
    user.socket.join( name );
  }

  const close_room = function( ) {
    while( users.length > 0 ) {
      const user = users.pop();
      remove_user( user );
      user.socket.emit('room disconnection');
    }
  }

  const remove_user = function( user ) {
    user.leave( name );
    users.splice( users.indexOf(user), 1 );
    if( user = host ) closeRoom();
  }

  return {
    get name() { return name },
    get host() { return host },
    add_user : add_user,
  }

}
