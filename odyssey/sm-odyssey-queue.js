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
    return !!(typeof videoArray == "undefined"
    || videoArray == null
    || videoArray.length == null
    || videoArray.length < 1);
}