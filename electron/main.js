// You can also require other files to run in this process
//require('./renderer.js')
const gritty = require('gritty'),
      http = require('http'),
      express = require('express'),
      io = require('socket.io'),
      exec = require('child_process').exec,
      termApp = express(),
      server = http.createServer(termApp),
      socket = io.listen(server),
      port = 3000,
      ip = '0.0.0.0',
      config = require('./config.json')
var toggleGraphs = false;

termApp.use(gritty())
termApp.use(express.static('static'))
termApp.use(express.static(__dirname));

gritty.listen(socket);
server.listen(port, ip);

function toggle()
{
    if(toggleGraphs)
    {
        document.getElementById("footer").style.bottom = "-26vh"
        // document.getElementById("iframe").style.height = "74vh"
        document.getElementById("arrow").style.transform = "rotate(0deg)"
    }
    else
    {
        document.getElementById("footer").style.bottom = "0vh"
        // document.getElementById("iframe").style.height = "96vh"
        document.getElementById("arrow").style.transform = "rotate(180deg)"
    }
    toggleGraphs = !toggleGraphs
}

function sshExec(command, callback)
{
    exec('ssh root@ratemysesh.me ' + command, (err,out)=>
        {
            if (err)
                throw err
            //console.log('calling at '+out)
            callback(out)
        })
}
function getPath()
{
    if(document.getElementById('iframe').contentWindow.emulator.terminal.title.split(":")[1] == undefined)
    {
        console.log('recurse')
        return getPath()
    }
    else
    {
        console.log( document.getElementById('iframe').contentWindow.emulator.terminal.title.split(":")[1] )
        return document.getElementById('iframe').contentWindow.emulator.terminal.title.split(":")[1]
    }
}
function changeDir(path,mode)
{
    if(mode == 'dir')
    {
        document.getElementById('browser').innerHTML = "<center><i class='material-icons spin'>autorenew</i></center>"
        document.getElementById('iframe').contentWindow.emulator.terminal.send('cd ' +path + "\r")
    }
    else
    {
        document.getElementById('iframe').contentWindow.emulator.terminal.send(config.editor+ " " +path + "\r")
    }
}
function drawLs(path)
{
    //path = document.getElementById('iframe').contentWindow.emulator.terminal.title.split(":")[1]
    //console.log(path)
    sshExec('ls -g ' + '\''+path+'\'',(res)=>
        {
            var length  = res.split("\n").length;
            document.getElementById('browser').innerHTML = "";
            var html = '<div class="item" onclick="changeDir(\'..\',\'dir\')">';
            html += '<i class="material-icons">folder</i>';
            html += '<span>..</span>';
            html += '</div>'
            for(var i = 1; i < length-1;i++)
            {
                if ( res.split("\n")[i].charAt(0) == 'd')
                {
                    html += '<div onclick="changeDir(\''+res.split("\n")[i].split(" ")[res.split("\n")[i].split(" ").length -1]+'\',\'dir\')" class="item">';
                    html += '<i class="material-icons">folder</i>';
                } else {
                    html += '<div onclick="changeDir(\''+res.split("\n")[i].split(" ")[res.split("\n")[i].split(" ").length -1]+'\',\'edit\')" class="item">';
                    html += '<i class="material-icons">insert_drive_file</i>';
                }
                console.log(res.split("\n")[i].split(" ")[res.split("\n")[i].split(" ").length -1])
                html += '<span>'+ res.split("\n")[i].split(" ")[res.split("\n")[i].split(" ").length -1] + '</span>';
                html += '</div>'
            }
            document.getElementById('browser').innerHTML = html;

        })
}
function startLs()
{
    drawLs('')
}
startLs();

module.exports = {drawLs,getPath,changeDir}
