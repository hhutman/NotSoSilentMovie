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

socket.on('odyssey_theater_append-clip', function(target) {
    console.log(target);
});

