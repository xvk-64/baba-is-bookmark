import http = require('http')
import path = require('path')
import express = require('express')

const APP_PORT : Number = Number(process.env.PORT) || 5000

const app = express()

console.log(`Setting port to ${APP_PORT}`)
app.set('port', APP_PORT)

app.use("/", express.static(path.join(__dirname, "public")))

const server = http.createServer(app)
server.listen(APP_PORT)

app.get('/', (request, response) => {
	response.sendFile(path.join(__dirname, 'public/index.html'))
})