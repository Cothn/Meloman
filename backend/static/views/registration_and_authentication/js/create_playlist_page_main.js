
function addTrackSpace() {
	var testPost = document.getElementsByClassName('test');
	
	if (testPost.style.display === "none") {
		document.getElementById("test-post").style.display = "block";
	}
	else {
		document.getElementById("test-post").style.display = "none";
	}
}