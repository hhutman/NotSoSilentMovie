var socket = io.connect();

jwplayer.key = "hKr0It8yDiMnKte/Cy3p9KDJ74XfRooWYAiO8A==";

var playlist = [];

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
    loadNextVideo(playerInstance2);
});

function loadNextVideo( player ) {
    if (playlist.length <= 0) {
        socket.emit('theater-request-list', movieCount);
        movieCount++;
        return;
    }
    var next = playlist.shift();
    var video = next.clip;
    if (next.callback){
        next.callback();
    }

    player.load([{
        file: video
    }]);
}

function loadNextTitle (movieTitle, creator){
    document.getElementById("movieTitle").innerHTML = "<div>" + movieTitle + "</div><div>By " + creator + "</div>";
}

window.onload = function () {
    playerInstance.play();
};

function removeComingUpNextChild(){
    var list = document.getElementById("theater-up_next-list");   // Get the <ul> element with id="myList"
    if(list.childNodes.length > 0){
        list.removeChild(list.childNodes[0]);
    }
}

function appendComingUpNext( title ){
    var newBlock = document.createElement("div");
    newBlock.innerHTML = title;
    document.getElementById("theater-up_next-list").appendChild(newBlock);
}

loadNextVideo(playerInstance2);

socket.on('theater-receive-list', function(movie) {
    console.log('Theater List Received');
    appendComingUpNext(movie.name);

    playlist.push( {
        clip: "/content/videos/countdown.mp4",
        callback: function (){
            removeComingUpNextChild();
            loadNextTitle(movie.name, movie.creator)
        }
    });
    for(var i = 0; i < movie.content.length; i++){
        playlist.push({
            clip: '../uploaded/' +movie.content[i].target + '.mp4'
        });
    }
    playlist.push( {
        clip: "/content/videos/the-end-slate.mp4"
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
