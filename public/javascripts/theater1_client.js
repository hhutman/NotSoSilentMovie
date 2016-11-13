"use strict";
var socket = io.connect();
var videoArray = [];
var standingBy = true;

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
    file: "/content/timeout.mp4",
    controls: false,
    autostart: true,
    autoplay: true,
    width: w,
    height: h,
    mute: true
});

socket.on('odyssey_all_append-clip', function(target) {
    appendNewClip(target);
    if(standingBy){
        standingBy = false;
        playNextClip();
    }
});

jwplayer().onComplete(playNextClip);

function playNextClip () {
    jwplayer().load({file:getNextClip()});
    jwplayer().play()
}

function getNextClip() {
    if(  typeof videoArray == "undefined"
        || videoArray == null
        || videoArray.length == null
        || videoArray.length < 1){
            standingBy = true;
            console.log("Playlist empty, reverting to default clip");
            return getDefaultClip();
    }
    return "/uploaded/" + videoArray.shift() + ".mp4";
}

function getDefaultClip () {
    return "/content/timeout.mp4";
}

function appendNewClip ( target ) {
    videoArray.push(target);
    console.log("Current Array: " + videoArray.toString());
}

