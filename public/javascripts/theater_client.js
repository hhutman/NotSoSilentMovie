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
        file: "/content/timeout.mp4"
    }],
    controls: false,
    autostart: true,
    autoplay: true,
    repeat: true,
    width: w,
    height: h,
    mute: true
});

socket.on('theater-playProject', function(project) {
    console.log('projectReceived');
    selectButtonClick(project);
});


function selectButtonClick(project){
    let newPlaylist = [];
    for(let video of project){
        newPlaylist.push({
            file: '/uploaded/' + video + '.mp4',
        })
    }

    playerInstance.load(newPlaylist);
    playerInstance.play();
}
