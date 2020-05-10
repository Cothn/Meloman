
function changeVisibility(elementId, showContext) {

	var currElement = document.getElementById(elementId);
	
	console.log(currElement);
	
	if (currElement.style.display === "none") {
		document.getElementById(elementId).style.display = showContext;
	}
	else {
		document.getElementById(elementId).style.display = "none";
	}
}