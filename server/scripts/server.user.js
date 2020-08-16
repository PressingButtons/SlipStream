'use strict';
const server_user = function( socket ) => {

  var name = null;

  return {
    get socket() { return socket; },
  }

}
