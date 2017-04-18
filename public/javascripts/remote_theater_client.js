var playlist = [];
for(var i = 0; i < contentList.length; i++){
    playlist.push(contentList[i]);
    console.log(contentList[i]);
}
playlist.push('/content/videos/the-end-slate.mp4');
playlist.push('/content/videos/countdown.mp4');

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

function loadNextVideo( player ) {
    var next = playlist.shift();

    videoSource.setAttribute('src', next);

    videoPlayer.load();
    videoPlayer.play();

    playlist.push(next);

}



function theaterScreenClick (e) {
    if(!videoPlayer.paused){
        videoPlayer.play();
    }
}
