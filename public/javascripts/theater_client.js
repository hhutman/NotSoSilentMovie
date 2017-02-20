var socket = io.connect();

var playlist = [];

var movieCount = Math.floor(Math.random() * 100);

var w = '100%';
var h = '100%';

var videoPlayer = document.getElementById('video');
var videoSource = document.createElement('source');

videoPlayer.addEventListener('ended',loadNextVideo,false);


videoSource.setAttribute('src', '/content/videos/countdown.mp4');

videoPlayer.appendChild(videoSource);

window.onload = function () {
    videoPlayer.play();
};

socket.emit('theater-request-list', movieCount);

function loadNextVideo( player ) {
    var next = playlist.shift();
    if (next.callback){
        next.callback();
    }

    videoSource.setAttribute('src', next.clip);

    videoPlayer.load();
    videoPlayer.play();

    if (playlist.length <= 0) {
        socket.emit('theater-request-list', movieCount);
        movieCount++;
    }
}

function loadNextTitle (movieTitle, creator){
    document.getElementById("movieTitle").innerHTML = "<div>" + movieTitle + "</div><div>By " + creator + "</div>";
}



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
});




function theaterScreenClick (e) {
    if(!videoPlayer.paused){
        videoPlayer.play();
    }
}