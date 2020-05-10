
function changeVisibility(elementId, showContext) {

	var currElement = document.getElementById(elementId);
	
	if (currElement.style.display === "none") {
		document.getElementById(elementId).style.display = showContext;
	}
	else {
		document.getElementById(elementId).style.display = "none";
	}
}