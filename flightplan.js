var plan = require('flightplan');

var appName = 'movies-app';
var username = 'movies';
var startFile = 'server.bundle.js';
var tmpDir = appName + '-' + new Date().getTime();

plan.target('production', [
    {
        host: '85.214.223.229',
        username: username,
        agent: process.env.SSH_AUTH_SOCK,
        agentForward: true
    }
]);

// run commands on localhost
plan.local(function (local) {
    // uncomment these if you need to run a build on your machine first

    local.log('Copy files to remote hosts');
    var filesToCopy = local.find('build -type f', {silent: true}).stdout.split('\n');
    filesToCopy = filesToCopy.concat(['package.json', 'README.md']);
    // rsync files to all the destination's hosts
    local.transfer(filesToCopy, '/tmp/' + tmpDir);
});

// run commands on remote hosts (destinations)
plan.remote(function (remote) {

    remote.log('Move folder to root');
    remote.exec('cp -R /tmp/' + tmpDir + ' ~', {user: username});
    remote.rm('-rf /tmp/' + tmpDir);

    remote.log('Install dependencies');
    remote.exec('npm --production --prefix ~/' + tmpDir + ' install ~/' + tmpDir, {user: username});

    remote.exec('mkdir ~/' + tmpDir + '/config');
    remote.exec('cp /private-backup/movies/config/production.json ~/' + tmpDir + '/config/');

    remote.log('Reload application');
    remote.exec('ln -snf ~/' + tmpDir + ' ~/' + appName, {user: username});
    remote.exec('cd ~/' + appName + '/');
    remote.exec('forever stop ~/' + appName + '/build/' + startFile, {failsafe: true});
    remote.exec("APP_PROFILE='production' APP_PATH='/' forever start ~/" + appName + '/build/' + startFile);
});