var socket = io.connect();

jwplayer.key = "hKr0It8yDiMnKte/Cy3p9KDJ74XfRooWYAiO8A==";

var playlist = [];
var nextTitle = 'Waiting...';

var movieCount = Math.floor(Math.random() * 100);

var w = '100%';
var h = '100%';

var playerInstance = jwplayer("contentfeed");
var playerInstance2 = jwplayer("contentfeed2");

var activePlayer = 0;

playerInstance.setup({
    file: "/content/videos/countdown.mp4",//movieloop_ipearl
    image: "/content/images/playbutton.jpg",
    primary: "html5",
    controls: false,
    width: w,
    height: h,
    mute: true
});
playerInstance2.setup({
    file: "/content/videos/countdown.mp4",//movieloop_ipearl
    image: "/content/images/playbutton.jpg",
    primary: "html5",
    controls: false,
    width: w,
    height: h,
    mute: true
});

playerInstance.on('complete', function () {
    activePlayer = 1;
    playerInstance2.play();
    document.getElementById("contentfeed").style.display = "none";
    document.getElementById("contentfeed2").style.display = "block";
    document.getElementById("movieTitle").innerHTML = nextTitle;
    loadNextVideo(playerInstance);
});
playerInstance2.on('complete', function () {
    activePlayer = 0;
    playerInstance.play();
    document.getElementById("contentfeed2").style.display = "none";
    document.getElementById("contentfeed").style.display = "block";
    document.getElementById("movieTitle").innerHTML = nextTitle;
    loadNextVideo(playerInstance2);
});

function loadNextVideo( player ){
    if(playlist.length <= 0){
        socket.emit('theater-request-list', movieCount);
        movieCount++;
        return;
    }
    var next = playlist.shift();
    var video = next.clip;
    nextTitle = "<div>" + next.text + "</div><div>By " + next.creator + "</div>";
    player.load([{
        file: video
    }]);
}

window.onload = function () {
    playerInstance.play();
};

loadNextVideo(playerInstance2);

socket.on('theater-receive-list', function(movie) {
    console.log('Theater List Received');
    playlist.push( {
        clip: "/content/videos/countdown.mp4",
        text: movie.name,
        creator: movie.creator
    });
    for(var i = 0; i < movie.content.length; i++){
        playlist.push({
            clip: '../uploaded/' +movie.content[i].target + '.mp4',
            text: movie.name,
            creator: movie.creator
        });
    }
    playlist.push( {
        clip: "/content/videos/the-end-slate.mp4",
        text: movie.name,
        creator: movie.creator
    });
    loadNextVideo(getInactivePlayer());
});

function getInactivePlayer () {
    if(activePlayer){
        return playerInstance;
    } else {
        return playerInstance2;
    }
}
function getActivePlayer () {
    if(activePlayer){
        return playerInstance2;
    } else {
        return playerInstance;
    }
}



function theaterScreenClick (event) {
    var activePlayer = getActivePlayer();
    if(activePlayer.getState() != "playing"){
        activePlayer.play();
    }
    document.getElementsByClassName('theater-text')[0].style.display = 'none';
}
