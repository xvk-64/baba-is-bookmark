import http = require('http');

const APP_PORT : Number = Number(process.env.PORT) || 5000;

import app = require('./app')

const server = http.createServer(app(APP_PORT));
server.listen(APP_PORT);
