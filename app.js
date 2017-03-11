//This is our entry point
const gritty = require('gritty/legacy'),
      http = require('http'),
      express = require('express'),
      io = require('socket.io'),
      exec = require('child_process').exec,
      termApp = express(),
      server = http.createServer(termApp),
      socket = io.listen(server),
      port = 3000,
      ip = '0.0.0.0'
 
termApp.use(gritty())
termApp.use(express.static('static'))
termApp.use(express.static(__dirname));
 
gritty.listen(socket);
server.listen(port, ip);
console.log('Server running on port ' + port);


function sshExec(command, callback)
{
    exec('ssh root@ratemysesh.me ' + command, (err,out)=>
    {
        if (err)
            throw err
        callback(out)
    })
}

sshExec('cd rmSesh;ls',console.log)
