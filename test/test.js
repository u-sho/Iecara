//'use strict';
console.log({Peer});
let localStream = null;
let peer = null;
//let existingCall = null;
let friendsNumber = 1;

navigator.mediaDevices.getUserMedia({video: true, audio: true})
    .then(function (stream) {
        // Success
        $('#my-video').get(0).srcObject = stream;
        localStream = stream;
    }).catch(function (error) {
    // Error
    console.error('mediaDevice.getUserMedia() error:', error);
    return;
});

peer = new Peer({
    key: '3f8bc27b-ef1e-404c-b949-7bdfe89b9eb1',
    debug: 3
});

peer.on('open', function(){
    console.log("myId:" + peer.id);
});

peer.on('error', function(err){
    alert(err.message);
});

peer.on('close', function(){
});

peer.on('disconnected', function(){
    console.log(arguments);
    alert("disconnected!\ncheck your internet access.")
});

$(document).ready(function() {
    $('#make-room').on('click', function(){
        //event.preventDefault();
        //console.log('beforJoin');
        const room = peer.joinRoom($('#room-id').val(), {
            mode: 'sfu',
            stream: localStream,
        });
        console.log("successed to make a room");
        //setupRoomEventHandlers(room);
    });

    $('#join-room').on('click', function(){
        
    })

    $('#remove-room').on('click', function(){
        room.close();
    });


});


function setupRoomEventHandlers(room){
    //if (existingCall) {
    //    existingCall.close();
    //};

    //existingCall = call;

    room.on('stream', function(stream){
        addVideo(room,stream);
    });

    room.on('close', function(){
        removeVideo(room.remoteId);
        setupMakeCallUI();
    });
}

function addVideo(room, stream){
    const tags='<video id="' + $('#their-id') + '" autoplay></video>';
    console.log(tags);
    $('#my-video').before(tags)
    $('$("#their-id")').get(0).srcObject = stream;
    //$("#friend"+friendsNumber).get(0).srcObject = stream;
}

function removeVideo(peerId){
    room.close();
}

function setupMakeCallUI(){
    $('#make-call').show();
    $('#end-call').hide();
}

function setupEndCallUI() {
    $('#make-call').hide();
    $('#end-call').show();
}
