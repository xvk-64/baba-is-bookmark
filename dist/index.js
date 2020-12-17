"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const path = require("path");
const express = require("express");
const APP_PORT = Number(process.env.PORT) || 5000;
const app = express();
console.log(`Setting port to ${APP_PORT}`);
app.set('port', APP_PORT);
app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, 'public/index.html'));
});
const server = http.createServer(app);
server.listen(APP_PORT);
