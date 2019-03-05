// server.js
// look at https://www.npmjs.com/package/next-routes for express setup
const { createServer } = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const next = require('next')
const app = next({dev: process.env.NODE_ENV !== 'production'});
const pathMatch = require('path-match');

const routes = require('./routes');
// For back-end api routes
const apiroutes = require('./api/routes/v1'); 
const handler = routes.getRequestHandler(app);
 
app.prepare().then(() => {

   // Configure express to expose a REST API
  const server = express();
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: true }));

  // mount api v1 routes
  server.use('/api/v1', apiroutes);

   // Server-side
   const route = pathMatch();


   // Everything that isn't '/api' gets passed along to Next.js
   server.get('*', (req, res) => {
    return handler(req, res)
   });

   server.get('/', (re, res) => {
      return app.render(req, res, '/', req.query);
   })
   server.get('/accounts/new', (re, res) => {
      return app.render(req, res, '/accounts/new', req.query);
   })

   server.get("/accounts/:address", (req, res) => {
      const params = route('/accounts/:address')(parse(req.url).pathname);
      return app.render(req, res, '/accounts/show', params);
      // console.log('params : ', req.params )
      // return app.render(req, res, "/accounts/show", {address: req.params.id});
  });



  server.use(handler).listen(3001, (err)=>{
      if (err) throw err;
      console.log('Ready on localhost:3001');
  });
})
