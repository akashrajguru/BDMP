// server.js
// look at https://www.npmjs.com/package/next-routes for express setup
const { createServer } = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const next = require('next')
const app = next({dev: process.env.NODE_ENV !== 'production'});

//const routes = require('./routes');
// For back-end api routes
const routes = require('./api/routes/v1'); 
const handler = app.getRequestHandler()
 
app.prepare().then(() => {

   // Configure express to expose a REST API
  const server = express();
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: true }));

  // mount api v1 routes
  server.use('/api/v1', routes);


   // Everything that isn't '/api' gets passed along to Next.js
   server.get('*', (req, res) => {
    return handler(req, res)
   });

   server.get('/accounts/new', (re, res) => {
      return app.render(req, res, '/accounts/new', req.query);
   })




  server.use(handler).listen(3001, (err)=>{
      if (err) throw err;
      console.log('Ready on localhost:3001');
  });
})
