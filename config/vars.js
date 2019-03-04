const path = require('path');

// import .env variables
require('dotenv-safe').load({
  path: path.join(__dirname, './.env'),
  sample: path.join(__dirname, './.env.example'),
});

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  jsonRpc: process.env.JSON_RPC_URL,
  logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
};
