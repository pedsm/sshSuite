function sshExec(command, callback)
{
    exec('ssh root@ratemysesh.me ' + command, (err,out)=>
    {
        if (err)
            throw err
        callback(out)
    })
}

sshExec('ls -g',console.log)
