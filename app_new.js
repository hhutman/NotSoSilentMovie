// Standard requirements
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
// --
// New requirements
var child_process = require('child_process');
var fluent_ffmpeg = require('fluent-ffmpeg');
var fs = require('fs');
var OBSRemote = require('obs-remote');
// --

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);


app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});



module.exports = app;



var server = require('http').Server(app);
var io = require('socket.io')(server);

var obs = new OBSRemote();
var streamRunning = false;
var streamRunningPhilly = false;
var streamRunningsilentmovie = false;
var votes = {};
var ejs = require('ejs');

var paused = false;
var usernames = {};

function addToLog(data) {
    var text = fs.readFileSync('./public/text/chatLog.txt', 'utf-8');
    console.log(text);
    if (text == '') {
        console.log('empty case');
    } else {
        text += "\n";
    }
    text += data;
    fs.writeFileSync('./public/text/chatLog.txt', text, 'utf-8');
    console.log('write complete');
}

io.sockets.on('connection', function (socket) {

    socket.on('sendchat', function (data) {
        if(socket.username) {
            console.log("sending chat " + data);
            // io.sockets.emit('updatechat', data);
            var chatObject = {};
            chatObject.username = socket.username;
            chatObject.message = data;
            io.sockets.emit('updatechat', chatObject);
            //socket.broadcast.emit('updatechat', socket.username, data);
            // chatLogs.push(data);
            addToLog(socket.username + ": " + data);
        }
    });

    socket.on('adduser', function(username){
        socket.username = username;
        usernames[username] = username;
        console.log("add user to user list: " + usernames);
        //socket.emit('updatechat', 'TWITCH ODYSSEY', 'you have connected');
        //socket.broadcast.emit('updatechat', 'TWITCH ODYSSEY', username + ' has connected');
        io.sockets.emit('updateusers', usernames);
        //socket.emit('updateusers', usernames);
    });

    socket.on('disconnect', function(){
        console.log(socket.username + " disconnected");
        delete usernames[socket.username];
        io.sockets.emit('updateusers', usernames);
        //console.log(usernames);
        //socket.broadcast.emit('updatechat', 'TWITCH ODYSSEY', socket.username + ' has disconnected');
    });
});


/*
 //chatroom
 var numUsers = 0;
 */

// socket logic
io.on('connection', function (socket) {
    socket.on('thumbClick', function (data) {
        socket.broadcast.emit('jwplayerVideo', data);
        console.log('clicked : ' + data);
    });

    socket.on('email', function (data) {
        console.log('email : ' + data);
        var emails = fs.readFileSync('./public/text/emails.txt', 'utf-8');
        console.log(emails);
        if (emails == '') {
            console.log('empty case');
        } else {
            emails += ",\n";
        }
        emails += data;
        fs.writeFileSync('./public/text/emails.txt', emails, 'utf-8');
        console.log('write complete');
    });

    socket.on('createThumb', function (data) {
        name = data.substring(0, data.length - 4);
        console.log('create thumb : ' + name);
        fluent_ffmpeg(__dirname + '/public/uploaded/files/' + data).screenshots({
            timestamps: [30.5, '50%', '01:10.123'],
            filename: name + '.png',
            folder: './public/thumbnails',
            size: '320x240'
        });
    });

    socket.on('controlOn', function (data) {
        console.log('control : ' + data, obs._connected);
        if (obs._connected) {
            obs.setCurrentScene('Scene 2');
        } else {
            console.log('need to connect');
            obs.connect('45.79.70.119', 'admin');
        }
        socket.broadcast.emit('pause', 'pause');
        paused = true;
    });

    socket.on('controlOff', function (data) {
        console.log('control : ' + data);
        if (obs._connected) {
            obs.setCurrentScene('Scene 1');
        } else {
            console.log('need to connect');
            obs.connect('45.79.70.119', 'admin');
        }
        socket.broadcast.emit('unpause', 'unpause');
        paused = false;
    });

    socket.on('changeStream', function(data) {
        console.log('stream ' + data);
        // streamRunning = data;
        if (data == 'start') {
            socket.broadcast.emit('changeStream', data);
            streamRunning = true;
        } else if (data == 'stop') {
            socket.broadcast.emit('changeStream', data);
            streamRunning = false;
        }
        else if (data == 'startphilly') {
            socket.broadcast.emit('changeStreamPhilly', data);
            streamRunningPhilly = true;
        }
        else if (data == 'stopphilly') {
            socket.broadcast.emit('changeStreamPhilly', data);
            streamRunningPhilly = false;
        }
        else if (data == 'startsilentmovie') {
            socket.broadcast.emit('changeStreamsilentmovie', data);
            streamRunningsilentmovie = true;
        }
        else if (data == 'stopsilentmovie') {
            socket.broadcast.emit('changeStreamsilentmovie', data);
            streamRunningsilentmovie = false;
        }
    });

    // socket.on('getStreaming', function(data) {
    //   console.log('get streaming ' + streamRunning);
    //   io.sockets.emit('changeStream', streamRunning);
    // });

    socket.on('streamStatus', function(data) {
        console.log('stream status ' + streamRunning + ' + ' + paused);
        var status = {streamRunning: streamRunning, paused: paused, streamRunningPhilly: streamRunningPhilly};
        io.sockets.emit('streamStatus', status);
    });
    socket.on('streamStatus', function(data) {
        console.log('stream status ' + streamRunning + ' + ' + paused);
        var status = {streamRunning: streamRunning, paused: paused, streamRunningsilentmovie: streamRunningsilentmovie};
        io.sockets.emit('streamStatus', status);
    });

    socket.on('recieveVote', function(data) {
        console.log('vote recieved for ' + data);
        if (votes[data]) {
            votes[data]++;
        } else {
            votes[data] = 1;
        }
        io.sockets.emit('choiceReady', '');
    });

    socket.on('playNext', function(data) {
        console.log('play next');
        var winner = 'repeat';
        winnerVotes = -1;
        for (vote in votes) {
            if (winnerVotes == -1 || votes[vote] > winnerVotes) {
                winner = vote;
                winnerVotes = votes[vote];
            }
        }
        console.log('winner is ' + winner);
        socket.broadcast.emit('nextPlaying', winner);
        //socket.broadcast.emit('contentChange', winner);
        io.sockets.emit('contentChange', winner);
        votes = {};
    });

    socket.on('requestLog', function(data) {
        var text = fs.readFileSync('./public/text/chatLog.txt', 'utf-8');
        socket.emit('pumpLogs', text);
    });
});
