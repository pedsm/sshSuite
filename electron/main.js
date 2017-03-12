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

setInterval(()=>{sshExec('cat /proc/meminfo',cutMem)},10000)
setInterval(()=>{sshExec('ps -eo pcpu',cpuAvg)},1000)

memFree = 1
memUsed = 1
function cutMem(input)
{
    var res = input.split("\n", 3)
    res.map((ob)=>parseInt(ob))
    newRes = []
    res.forEach((line,index)=>
        {
            newRes[index] = line.split(" ")
        })
    var memTotal = newRes[0][9];
    memFree = newRes[1][11];
    memUsed = memTotal - memFree;
    console.log("Memory used is " + memUsed);
    console.log("Memory free is " + memFree);
}

function cpuAvg(input)
{
    var counter = 0;
    var res = input.split("\n")
    res[0] = 0;

    for (var x = 0; x < res.length-1; x++) {
        res[x] = parseFloat(res[x]);
        counter = counter + res[x];
    }
    console.log(counter)
}

function toggle()
{
    if(toggleGraphs)
    {
        document.getElementById("footer").style.bottom = "-230px"
        // document.getElementById("iframe").style.height = "74vh"
        document.getElementById("arrow").style.transform = "rotate(0deg)"
    }
    else
    {
        document.getElementById("footer").style.bottom = "0px"
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
        return getPath()
    }
    else
    {
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
                // console.log(res.split("\n")[i].split(" ")[res.split("\n")[i].split(" ").length -1])
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
function makeMemChart(array){
    var ctx = document.getElementById("doughnut").getContext('2d');
    var doughnut = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ["Used Memory", "Available Memory"],
            datasets: [{
                backgroundColor: [
                    "#3498db",
                    "#cc0000",
                ],
                data: array
            }]
        }
    });
    return doughnut;
}

function makeCpuChart(array){
    var ctx = document.getElementById("lineGraph").getContext('2d');
    var lineChart = new Chart(ctx, {
        type: 'line',
        data: {datasets:[{data:array}]}
    });
    return lineChart;
}
function plsWork(){ 
    myArray = [50,60,10,90,4]
    var ctx = document.getElementById("lineGraph").getContext('2d');
    var line = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [1,2,3,4,5],
            datasets: [{
                backgroundColor: [
                    "#3498db",
                ],
                data: myArray
            }]
        }
    });
    return line;
}
startLs();

module.exports = {drawLs,getPath,changeDir}
