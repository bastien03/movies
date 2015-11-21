var plan = require('flightplan');

var appName = 'movies-app';
var username = 'deploy';
var startFile = 'server.js';
var properties = require('./data/deployment.json');
var tmpDir = appName + '-' + new Date().getTime();

// configuration

console.log(properties, process.env.SSH_AUTH_SOCK);

plan.target('production', [
    {
        host: '85.214.223.229',
        username: properties.username,
        password: properties.password,
        agent: process.env.SSH_AUTH_SOCK
    }
]);

// run commands on localhost
plan.local(function (local) {
    // uncomment these if you need to run a build on your machine first

    local.log('Copy files to remote hosts');
    var filesToCopy = local.exec('git ls-files', {silent: true});
    // rsync files to all the destination's hosts
    local.transfer(filesToCopy, '/tmp/' + tmpDir);
});

// run commands on remote hosts (destinations)
plan.remote(function (remote) {
    remote.log('Move folder to root');
    remote.sudo('cp -R /tmp/' + tmpDir + ' ~', {user: username});
    remote.rm('-rf /tmp/' + tmpDir);

    remote.log('Install dependencies');
    remote.sudo('npm --production --prefix ~/' + tmpDir + ' install ~/' + tmpDir, {user: username});

    remote.exec('mkdir ~/' + tmpDir + '/data');
    remote.exec('cp /private-backup/movies/users.json ~/' + tmpDir + '/data/');
    remote.exec('cp /private-backup/movies/db.json ~/' + tmpDir + '/');
    remote.exec('cp /private-backup/movies/usersDb.json ~/' + tmpDir + '/');

    remote.log('Reload application');
    remote.sudo('ln -snf ~/' + tmpDir + ' ~/' + appName, {user: username});
    remote.exec('cd ~/' + appName + '/');
    remote.exec('forever stop ~/' + appName + '/' + startFile, {failsafe: true});
    remote.exec("APP_PATH='/movies/' forever start ~/" + appName + '/' + startFile);
});