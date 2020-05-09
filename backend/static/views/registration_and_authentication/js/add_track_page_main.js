
const selectGenreIdName = "choose-track-genre-list";

function onAddTrackPageLoad(afterWhichElementId) {
	
	var currUserToken = getCookie("userToken");	
	
	var requestOptions = {
		method: 'GET',
		headers: {
			'Authorization':`Bearer ${currUserToken}`
		},
		redirect: 'follow'
	};

	fetch("http://localhost:3000/api/genre", requestOptions)
		.then(async response => {
			var result = await response.json();
			if (response.ok)
			{
				let select_choose_track_genre_list = document.createElement('select');
				select_choose_track_genre_list.id = selectGenreIdName;
				select_choose_track_genre_list.className = "choose-track-genre-list"
				select_choose_track_genre_list.setAttribute("required", "required");
				select_choose_track_genre_list.setAttribute("size", "1");
				
					for(let item of result)
					{
					   var newOption = document.createElement("option");
					   newOption.value = item.id;
					   newOption.innerHTML = item.title;

					   select_choose_track_genre_list.insertAdjacentElement('beforeend', newOption);
					}
					

				document.getElementById(afterWhichElementId).insertAdjacentElement('afterend', select_choose_track_genre_list);
			}
			else
			{
				alert(result.message);
			}
		})
		.catch(error => console.log('error', error));		
}


function onAddTrackClick(inputAuthorId, inputNameId, inputFileId, playerId) {
	
	if (validateData(inputAuthorId, inputNameId, inputFileId) === false) {
		return;
	}
	
	let targetFile = document.getElementById(inputFileId).files[0];	
	
	const formData = new FormData();	
	formData.append('file_data', targetFile);

	var currUserToken = getCookie("userToken");

	fetch("http://localhost:3000/api/music",  {
	method: 'POST',
	headers: {
		'Authorization':`Bearer ${currUserToken}`
	},
	body: formData})
	.then(async response => {
		var result = await response.json();
		if (response.ok)
		{
			console.log('Успех:', JSON.stringify(result));
			

			var bufAudio = document.createElement('audio');

			// Define the URL of the MP3 audio file
			bufAudio.src = result.file_path;

			// Once the metadata has been loaded, display the duration in the console
			bufAudio.addEventListener('loadedmetadata', function(){

				let selectGenreElement = document.getElementById(selectGenreIdName);

				let trackAuthor = document.getElementById(inputAuthorId).value;
				let trackName = document.getElementById(inputNameId).value;
				let trackGenreId = selectGenreElement.options[selectGenreElement.selectedIndex].value;
				let trackUrl = result.file_path;
				let trackDuration = Math.trunc(bufAudio.duration);
				
				let trackTitle = trackAuthor + " - " + trackName;
				
				var raw = `{\"title\": \"${trackTitle}\",\"genre_id\": ${trackGenreId},\"music_url\": \"${trackUrl}\",\"duration\": \"${trackDuration}\"}`;
				
				var requestOptions = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json;charset=utf-8',
						'Authorization':`Bearer ${currUserToken}`
					},
					body: raw,
					redirect: 'follow'
				};

				fetch("http://localhost:3000/api/track", requestOptions)
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

			},false);			
		}
		else
		{
			alert(result.message);
		}
	})
	.catch(error => console.log('error', error));

}


function validateData(inputAuthorId, inputNameId, inputFileId) {
	let targetAuthor = document.getElementById(inputAuthorId).value;
	
	if (targetAuthor === undefined || targetAuthor === "") {
		console.log("Author input is empty");
		alert("You need to write track author!");
		return false;
	}	
	
	let targetName = document.getElementById(inputNameId).value;
	
	if (targetName === undefined || targetName === "") {
		console.log("Name input is empty");
		alert("You need to write track name!");
		return false;
	}
	
	let targetFile = document.getElementById(inputFileId).files[0];
	
	if (targetFile === undefined) {
		console.log("File didnt choose");
		alert("You need to choose a file!");
		return false;
	}
	
	return true;
}



function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}