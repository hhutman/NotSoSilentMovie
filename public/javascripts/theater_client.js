"use strict";
var socket = io.connect();

jwplayer.key = "hKr0It8yDiMnKte/Cy3p9KDJ74XfRooWYAiO8A==";

function myResize() {
    if (playerInstance) {
        playerInstance.resize(window.innerWidth, window.innerHeight);
    }
}
myResize();

window.onresize = myResize;

var w = window.innerWidth;
var h = window.innerHeight;

var playerInstance = jwplayer("contentfeed");
playerInstance.setup({
    playlist: [{
        file: "/content/videos/movieloop_ipearl.mp4"
    }],
    primary: "html5",
    controls: false,
    autostart: true,
    autoplay: true,
    width: w,
    height: h,
    mute: true
});

playerInstance.on('playlistComplete', function() {
    var newPlaylist = [];
    newPlaylist.push({
        file: '/content/videos/movieloop_ipearl.mp4',
    });
    playerInstance.load(newPlaylist);
    playerInstance.play();
});





socket.on('theater-playProject', function(project) {
    console.log('projectReceived');
    selectButtonClick(project);
});


function selectButtonClick(project){
    var newPlaylist = [];
    newPlaylist.push({
        file: '../content/videos/countdown.mp4',
    });
    for( var i = 0; i < project.length; i++){
        newPlaylist.push({
            file: '../uploaded/' + project[i] + '.mp4',
        })
    }
    newPlaylist.push({
        file: '../content/videos/the-end-slate.mp4',
    });
    playerInstance.load(newPlaylist);
    playerInstance.play();
}
