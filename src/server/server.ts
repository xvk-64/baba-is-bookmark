import * as http from "http";
import path = require('path')
import express = require('express')
import cors = require('cors')


import APIRouter from './routes/API'

const APP_PORT : Number = Number(process.env.PORT) || 5000

const app = express()

console.log(`Setting port to ${APP_PORT}`)
app.set('port', APP_PORT)

if (process.env.IS_PRODUCTION)
	console.log("Starting in production environment")
else
	console.log("Starting in development environment")

app.use(cors())

app.use("/", express.static(path.join(__dirname, "public")))

app.use("/api", APIRouter);

const server = http.createServer(app)
server.listen(APP_PORT)

app.get('/', (request, response) => {
	response.sendFile(path.join(__dirname, 'public/index.html'))
})

app.get('*', (request, response) => {
	response.sendStatus(404);
	response.redirect("/#/404")
})