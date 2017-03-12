//event Handlers
//waits for terminal to load
require('./main.js')
setTimeout(setHandlers,1000);
function setHandlers()
{
    document.getElementById('iframe').contentWindow.emulator.terminal.on('title', (title)=>
        {
            console.log(title);
            drawLs(getPath())
        })
}
