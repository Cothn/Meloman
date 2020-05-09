
function onMusicEnded(targetElementId) {
	let event = new Event("click");
	document.getElementById(targetElementId).dispatchEvent(event);
}
