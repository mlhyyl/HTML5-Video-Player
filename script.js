var video = document.querySelector('.video');
var btn = document.getElementById('play-pause');
var dura = document.getElementById('duration');
var spd = document.getElementById('speed');
var spdList = document.getElementById('speedList');

var seeker = document.getElementById('custom-seekbar');
var timer = document.querySelector('#custom-seekbar span');

var totalTime = parseInt(video.duration);

function togglePlayPause() {
    if(video.paused){
        btn.className = 'pause';
        video.play();
    }
    else {
        btn.className = 'play';
        video.pause();
    }
}

function toggleSpeedList() {
    if(spdList.style.display === "block") {
        spdList.style.display = "none";
    } else {
        spdList.style.display = "block"
    }
}

function setSpeed(e) {
    video.playbackRate = e;
}

btn.onclick = function() {
    togglePlayPause();
}

spd.onclick = function() {
    toggleSpeedList();
}


video.addEventListener('timeupdate', function() {
    var timePos = video.currentTime / video.duration;
    timer.style.width = timePos * 100 + "%";
    if(video.ended) {
        btn.className = 'play';
    }

    if(parseInt(video.duration / 60) < 10) {
        if(parseInt(video.currentTime / 60) < 10) {
            dura.textContent = parseInt(video.currentTime / 60) + ":0" + parseInt(video.currentTime % 60) + " / " + parseInt(video.duration / 60) + ":0" + parseInt(video.duration % 60)    
        } else {
            dura.textContent = parseInt(video.currentTime / 60) + ":" + parseInt(video.currentTime % 60) + " / " + parseInt(video.duration / 60) + ":0" + parseInt(video.duration % 60)
        }
    }

    if(parseInt(video.duration / 60) > 10) {
        if(parseInt(video.currentTime % 60) < 10) {
            dura.textContent = parseInt(video.currentTime / 60) + ":0" + parseInt(video.currentTime % 60) + " / " + parseInt(video.duration / 60) + ":" + parseInt(video.duration % 60)    
        } else {
            dura.textContent = parseInt(video.currentTime / 60) + ":" + parseInt(video.currentTime % 60) + " / " + parseInt(video.duration / 60) + ":" + parseInt(video.duration % 60)
        }
    }
});

video.onloadeddata = function() {
    if(parseInt(video.duration / 60) < 10) {
        if(parseInt(video.currentTime / 60) < 10) {
            dura.textContent = parseInt(video.currentTime / 60) + ":0" + parseInt(video.currentTime % 60) + " / " + parseInt(video.duration / 60) + ":0" + parseInt(video.duration % 60)    
        } else {
            dura.textContent = parseInt(video.currentTime / 60) + ":" + parseInt(video.currentTime % 60) + " / " + parseInt(video.duration / 60) + ":0" + parseInt(video.duration % 60)
        }
    }

    if(parseInt(video.duration / 60) > 10) {
        if(parseInt(video.currentTime % 60) < 10) {
            dura.textContent = parseInt(video.currentTime / 60) + ":0" + parseInt(video.currentTime % 60) + " / " + parseInt(video.duration / 60) + ":" + parseInt(video.duration % 60)    
        } else {
            dura.textContent = parseInt(video.currentTime / 60) + ":" + parseInt(video.currentTime % 60) + " / " + parseInt(video.duration / 60) + ":" + parseInt(video.duration % 60)
        }
    }
};




/* start get video offset */

function getOffset(el) {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY
  };
}

var videoOffset = getOffset(video).left

/* end  get video offset */


function printMousePos(event) {
    var clickedPosition = event.clientX - videoOffset;
    var videoWidth = seeker.offsetWidth;

    var timePercent = clickedPosition / videoWidth;
    var newTime = parseInt(video.duration * timePercent);
    video.currentTime = newTime;

    timer.style.width = clickedPosition + "px"

};

seeker.addEventListener("click", printMousePos);



function toggleFullscreen(event) {
  var element = document.body;

	if (event instanceof HTMLElement) {
		element = event;
	}

	var isFullscreen = document.webkitIsFullScreen || document.mozFullScreen || false;

	element.requestFullScreen = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || function () { return false; };
	document.cancelFullScreen = document.cancelFullScreen || document.webkitCancelFullScreen || document.mozCancelFullScreen || function () { return false; };

    isFullscreen ? document.cancelFullScreen() : element.requestFullScreen();
   
};

var contextMenu =  document.getElementById('contextMenu');
window.onclick = hideContextMenu;

function showContextMenu(event) {
    contextMenu.style.display = 'block';
    contextMenu.style.left = event.clientX + 'px';
    contextMenu.style.top = event.clientY + 'px';
    return false;
};
function hideContextMenu() {
    contextMenu.style.display = 'none';
};

function getUrl() {    
    var text = location.protocol + '//' + location.host + location.pathname;
    navigator.clipboard.writeText(text).then(function() {
    console.log('Async: Copying to clipboard was successful!');
    }, function(err) {
    console.error('Async: Could not copy text: ', err);
    });
};

function getUrlCurrentTime() {    
    var text = location.protocol + '//' + location.host + location.pathname + "?t=" + parseInt(video.currentTime);
    navigator.clipboard.writeText(text).then(function() {
    console.log('Async: Copying to clipboard was successful!');
    }, function(err) {
    console.error('Async: Could not copy text: ', err);
    });
};

const urlParams = new URLSearchParams(window.location.search);
const timeUrl = urlParams.get('t');



window.addEventListener('load', function () {
  video.currentTime = timeUrl;
});


video.addEventListener("click", function(event) { 
	if (video.paused == true) {
	     video.play();
	     btn.className = 'pause';
	}
	else{
	     video.pause();
	     btn.className = 'play';
	}
});

var volumeValue = document.querySelector('#volume-bar');

volumeValue.addEventListener("click", changeVolume);

function changeVolume() {
    video.volume = volumeValue.value / 100;
}
