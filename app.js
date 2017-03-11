//This is our entry point
const gritty = require('gritty/legacy'),
      http = require('http'),
      express = require('express'),
      io = require('socket.io'),
      exec = require('child_process').exec,
      app = express(),
      server = http.createServer(app),
      socket = io.listen(server),
      port = 3000,
      ip = '0.0.0.0'
 
app.use(gritty())
app.use(express.static('static'))
app.use(express.static(__dirname));
 
gritty.listen(socket);
server.listen(port, ip);
console.log('Server running on port ' + port);


function sshExec(command, callback)
{
    exec('ssh root@rishi.doubletrouble.co ' + command, (err,out)=>
    {
        if (err)
            throw err
        callback(out)
    })
}

sshExec('ls',console.log)
