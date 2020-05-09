
const DEFAULT_TRACK_ICON_CLASSNAME_ADD = "track-play-img";
const PLAYING_TRACK_ICON_CLASSNAME_ADD = "track-playing-img";
const PAUSED_TRACK_ICON_CLASSNAME_ADD = "track-paused-img";

const PREVIOUS_TRACK_ID_DATA_NAME = "currentTrackId";
const IS_AUDIO_PAUSE_DATA_NAME = "isPause";

function playMusic(srcElementId, srcDataAttributeName, srcIsLastAttributeName, playerElementId, nextTargetId) {
	var prevElementChildrens;
	var prevChildrenChildrens;	
	
	var previousTrackId = document.getElementById(playerElementId).getAttribute(PREVIOUS_TRACK_ID_DATA_NAME);
	var isPause = document.getElementById(playerElementId).getAttribute(IS_AUDIO_PAUSE_DATA_NAME);	
	
	if (previousTrackId != null) {
		
		if (previousTrackId == srcElementId) {
			if (isPause != null) {
				console.log("isPause exist");
				console.log(isPause);
				
				if (isPause == "false") {
					console.log("isPause = false");
					musicIconPause(previousTrackId);

					document.getElementById(playerElementId).pause();
					document.getElementById(playerElementId).setAttribute(IS_AUDIO_PAUSE_DATA_NAME, "true");			
					return;
				}
				else if (isPause == "true"){
					console.log("isPause = true");
					musicIconPlay(previousTrackId);

					document.getElementById(playerElementId).play();
					document.getElementById(playerElementId).setAttribute(IS_AUDIO_PAUSE_DATA_NAME, "false");			
					return;			
				}
			}	
		}		
		else {
			musicIconDefault(previousTrackId);
		}
	}

	document.getElementById(playerElementId).src = document.getElementById(srcElementId).getAttribute(srcDataAttributeName);
	document.getElementById(playerElementId).autoplay = "autoplay";	
	document.getElementById(playerElementId).setAttribute(IS_AUDIO_PAUSE_DATA_NAME, "false");
	document.getElementById(playerElementId).setAttribute(PREVIOUS_TRACK_ID_DATA_NAME, srcElementId);
	
	musicIconPlay(srcElementId);	
	
	var isLast = document.getElementById(srcElementId).getAttribute(srcIsLastAttributeName);
	
	if (isLast == "false") {
		console.log("not Last");
		console.log(nextTargetId);
		document.getElementById(playerElementId).onended = function() {
			console.log("not Last ended");
			musicIconDefault(srcElementId);	
			
			onMusicEnded(nextTargetId);
		}		
	}
	else {
		console.log("is Last");
		console.log(nextTargetId);
		document.getElementById(playerElementId).onended = function() {
			console.log("is Last ended");
			musicIconDefault(srcElementId);		
		}
    }
}



function onAudioPlay(playerElementId) {
	var previousTrackId = document.getElementById(playerElementId).getAttribute(PREVIOUS_TRACK_ID_DATA_NAME);

	if (previousTrackId == null) {
		return;
	}

	musicIconPlay(previousTrackId);	
}


function onAudioPause(playerElementId) {
	var previousTrackId = document.getElementById(playerElementId).getAttribute(PREVIOUS_TRACK_ID_DATA_NAME);

	if (previousTrackId == null) {
		return;
	}

	musicIconPause(previousTrackId);		
}



function musicIconDefault(trackId) {
	musicIconAction(trackId, DEFAULT_TRACK_ICON_CLASSNAME_ADD, PLAYING_TRACK_ICON_CLASSNAME_ADD, PAUSED_TRACK_ICON_CLASSNAME_ADD);	
}

function musicIconPlay(trackId) {
	musicIconAction(trackId, PLAYING_TRACK_ICON_CLASSNAME_ADD, DEFAULT_TRACK_ICON_CLASSNAME_ADD, PAUSED_TRACK_ICON_CLASSNAME_ADD);
}

function musicIconPause(trackId) {
	musicIconAction(trackId, PAUSED_TRACK_ICON_CLASSNAME_ADD, PLAYING_TRACK_ICON_CLASSNAME_ADD, DEFAULT_TRACK_ICON_CLASSNAME_ADD);
}

function musicIconAction(trackId, addAction, removeActionFirst, removeActionSecond) {
	var elementChildrens = document.getElementById(trackId).children;
	var childrenChildrens = elementChildrens[0].children;
	childrenChildrens[0].classList.add(addAction);	
	childrenChildrens[0].classList.remove(removeActionFirst);	
	childrenChildrens[0].classList.remove(removeActionSecond);		
}
