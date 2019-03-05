const routes = require('next-routes')();

routes
.add('/accounts/new', '/accounts/new')
.add('/accounts/:address', '/accounts/show')
.add('/accounts/data/:address', '/accounts/data/index');

module.exports = routes;