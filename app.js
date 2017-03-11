//This is our entry point
const gritty = require('gritty/legacy');
const http = require('http');
const express = require('express');
const io = require('socket.io');
 
const app = express();
const server = http.createServer(app);
const socket = io.listen(server);
 
const port = 3000;
const ip = '0.0.0.0';
 
app.use(gritty())
app.use(express.static('static'))
app.use(express.static(__dirname));
 
gritty.listen(socket);
server.listen(port, ip);
console.log('Server running on port ' + port);
