
const selectGenreIdName = "choose-track-genre-list";

function onAddTrackPageLoad(afterWhichLabelId) {
	
	let select_choose_track_genre_list = document.createElement('select');
	select_choose_track_genre_list.id = selectGenreIdName;
	select_choose_track_genre_list.className = "choose-track-genre-list"
	select_choose_track_genre_list.setAttribute("required", "required");
	select_choose_track_genre_list.setAttribute("size", "1");
	
		optionsTextArray = ["Pop", "Jazz"];
		index = 1;
		
		for(let item of optionsTextArray)
		{
		   var newOption = document.createElement("option");
		   newOption.value = index;
		   newOption.innerHTML = item;

		   select_choose_track_genre_list.insertAdjacentElement('beforeend', newOption);
		   index++;
		}
		

	document.getElementById(afterWhichLabelId).insertAdjacentElement('afterend', select_choose_track_genre_list);
}


function onAddTrackClick(inputAuthorId, inputNameId, inputFileId, playerId) {
	
	let targetFile = document.getElementById(inputFileId).files[0];
	
	if (targetFile === undefined) {
		console.log("File didnt choose");
		alert("You need to choose a file!");
		return;
	}
	
	const formData = new FormData();	
	formData.append('file_data', targetFile);

	fetch("http://localhost:3000/api/music",  {
	method: 'POST',
	headers: {
		'Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ1c2VyX3JvbGUiOjEsImlhdCI6MTU4ODY1OTg3MywiZXhwIjoxNTg5MDE5ODczfQ.zr7LN1D11BnCoQx5FTcwwm0vBT7DSZ88Y9HUEUKCDvM'
	},
	body: formData})
	.then(async response => {
		var result = await response.json();
		if (response.ok)
		{
			document.getElementById(playerId).src = result.file_path;
			console.log('Успех:', JSON.stringify(result));
			
			let selectGenreElement = document.getElementById(selectGenreIdName);

			let trackAuthor = document.getElementById(inputAuthorId).value;
			let trackName = document.getElementById(inputNameId).value;
			let trackGenreId = selectGenreElement.options[selectGenreElement.selectedIndex].value;
			let trackUrl = result.file_path;
			
			let trackTitle = trackAuthor + " - " + trackName;
			
			var raw = `{\"title\": \"${trackTitle}\",\"genre_id\": ${trackGenreId},\"music_url\": \"${trackUrl}\"}`;
			
			console.log(raw);
			
			var requestOptions = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json;charset=utf-8',
					'Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ1c2VyX3JvbGUiOjEsImlhdCI6MTU4ODY1OTg3MywiZXhwIjoxNTg5MDE5ODczfQ.zr7LN1D11BnCoQx5FTcwwm0vBT7DSZ88Y9HUEUKCDvM'
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
		}
		else
		{
			alert(result.message);
		}
	})
	.catch(error => console.log('error', error));

}