//This is our entry point
const gritty = require('gritty/legacy'),
<<<<<<< HEAD
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
 
=======
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

>>>>>>> e399e74a91857663b4be1a818a146c4a92673eb4
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

setInterval(()=>{sshExec('cat /proc/meminfo',cutMem)},1000)
function cutMem(input)
{
    var res = input.split("\n", 3)
    newRes = []
    res.forEach((line,index)=>
        {
            newRes[index] = line.split(" ")
        })
    var memTotal = newRes[0][9];
    var memFree = newRes[1][11];
    var memUsed = memTotal - memFree;
    console.log("Memory used is " + memUsed);
    console.log("Memory free is " + memFree);

}
