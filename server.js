// server.js
// look at https://www.npmjs.com/package/next-routes for express setup
const { createServer } = require('http');
const next = require('next')
const app = next({dev: process.env.NODE_ENV !== 'production'});

const routes = require('./routes');
const handler = routes.getRequestHandler(app)
 
app.prepare().then(() => {
  createServer(handler).listen(3001, (err)=>{
      if (err) throw err;
      console.log('Ready on localhost:3001');
  });
})