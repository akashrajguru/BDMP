const routes = require('next-routes')();

routes
.add('/accounts/new', '/accounts/new')
.add('/accounts/:address', '/accounts/show')
.add('/campaigns/:address/requests', '/campaigns/requests/index')
.add('/campaigns/:address/requests/new', '/campaigns/requests/new');

module.exports = routes;