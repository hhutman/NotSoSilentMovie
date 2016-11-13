var videoQueue = [];

module.exports.getQueue = function() {
    if(checkArrayEmpty()) {
        return [];
    }
    return videoQueue;
};

module.exports.shiftQueue = function( target ) {
    if(checkArrayEmpty()){
        return;
    }

    if(videoQueue[0] == target){
        videoQueue.shift();
    }
};

module.exports.appendQueue = function( target ) {
    videoQueue.push(target);
};

function checkArrayEmpty(){
    return !videoQueue.length;
}

module.exports.emptyQueue = function() {
    videoQueue = [];
};
module.exports.contains = function(target) {
    return (videoQueue.indexOf(target) > -1);
};