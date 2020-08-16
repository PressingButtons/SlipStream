'use strict';
const router = ( app, htmlDirectory, path  ) => {

  app.get('/', (req, res) => {
    res.send( path.join( htmlDirectory, index.html ))
  })

}
