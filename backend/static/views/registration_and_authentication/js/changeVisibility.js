
function changeVisibility(elementId) {

	var currElement = document.getElementById(elementId);
	
	console.log(currElement);
	
	if (currElement.style.display === "none") {
		document.getElementById(elementId).style.display = "block";
	}
	else {
		document.getElementById(elementId).style.display = "none";
	}
}