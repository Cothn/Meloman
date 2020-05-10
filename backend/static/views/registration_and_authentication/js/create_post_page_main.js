
const selectPostPlaylistIdName = "choose-post-playlist-list";

function onCreatePostPageLoad(afterWhichElementId) {
	
	var currUserToken = getCookie("userToken");
	
	var requestOptions = {
		method: 'GET',
		headers: {
			'Authorization':`Bearer ${currUserToken}`
		},
		redirect: 'follow'
	};

	fetch("http://localhost:3000/api/playlist", requestOptions)
		.then(async response => {
			var result = await response.json();
			if (response.ok) {
				
				let select_choose_post_playlist_list = document.createElement('select');
				select_choose_post_playlist_list.id = selectPostPlaylistIdName;
				select_choose_post_playlist_list.className = "choose-post-playlist-list"
				select_choose_post_playlist_list.setAttribute("required", "required");
				select_choose_post_playlist_list.setAttribute("size", "8");
				
					for (let item of result)
					{
					   var newOption = document.createElement("option");
					   newOption.value = item.id;
					   newOption.innerHTML = item.title;

					   select_choose_post_playlist_list.insertAdjacentElement('beforeend', newOption);
					}
					
				document.getElementById(afterWhichElementId).insertAdjacentElement('afterend', select_choose_post_playlist_list);
			}
			else
			{
				alert(result.message);
			}
		})
		.catch(error => console.log('error', error));
}


function onCreatePostClick(inputPostTextId) {

	if (validateData(inputPostTextId) === false) {
		return;
	}
	
	let postText = document.getElementById(inputPostTextId).value;
	
	let selectPlaylistElement = document.getElementById(selectPostPlaylistIdName);
	let chosenPostPlaylistId = selectPlaylistElement.options[selectPlaylistElement.selectedIndex].value;	
	
	var raw = `{\"playlist_id\": ${chosenPostPlaylistId},\"text\": \"${postText}\"}`;
			
	var currUserToken = getCookie("userToken");		
			
	var requestOptions = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
			'Authorization':`Bearer ${currUserToken}`
		},
		body: raw,
		redirect: 'follow'
	};

	fetch("http://localhost:3000/api/post", requestOptions)
		.then(async response => {
			var result = await response.json();
			if (response.ok)
			{
				alert("Success");
			}
			else
			{
				alert(result.message);
			}
		})
		.catch(error => console.log('error', error));	

}



function validateData(inputPostTextId) {
	let postText = document.getElementById(inputPostTextId).value;
	
	if (postText === undefined || postText === "") {
		console.log("Post text input is empty");
		alert("You need to write post text!");
		return false;
	}	
	
	let selectPlaylistElement = document.getElementById(selectPostPlaylistIdName);
	
	if (selectPlaylistElement.selectedIndex == "-1") {
		console.log("No chosen playlist for post");
		alert("You need to choose playlist for post!");
		return false;		
	}

	let chosenPostPlaylistId = selectPlaylistElement.options[selectPlaylistElement.selectedIndex].value;		

	if (chosenPostPlaylistId === undefined || chosenPostPlaylistId === null) {
		console.log("No chosen playlist for post");
		alert("You need to choose playlist for post!");
		return false;
	}		
	
	return true;
}


function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
