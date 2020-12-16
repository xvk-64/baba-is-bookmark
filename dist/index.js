"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const APP_PORT = Number(process.env.PORT) || 5000;
const app = require("./app");
const server = http.createServer(app(APP_PORT));
server.listen(APP_PORT);
