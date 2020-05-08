
function playMusic(srcElementId, srcDataAttributeName, srcIsLastAttributeName, playerElementId, nextTargetId) {
	document.getElementById(playerElementId).src = document.getElementById(srcElementId).getAttribute(srcDataAttributeName);
	document.getElementById(playerElementId).autoplay = "autoplay";
	document.getElementById(playerElementId).volume = 0.5;
	
	var isLast = document.getElementById(srcElementId).getAttribute(srcIsLastAttributeName);
	
	if (isLast == "false") {
		console.log("not Last");
		console.log(nextTargetId);
		document.getElementById(playerElementId).onended = function() {
			onMusicEnded(nextTargetId);
		}		
	}
	else {
		console.log("is Last");
		console.log(nextTargetId);
		document.getElementById(playerElementId).onended = function() {
        //ничего не делаем
		}
    }
}