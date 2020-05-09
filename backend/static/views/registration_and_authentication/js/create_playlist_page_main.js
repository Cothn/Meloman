
const selectPlaylistTracksIdName = "choose-playlist-tracks-list";

function onCreatePlaylistPageLoad(afterWhichElementId) {
	
	var requestOptions = {
		method: 'GET',
		headers: {
			'Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ1c2VyX3JvbGUiOjEsImlhdCI6MTU4ODY1OTg3MywiZXhwIjoxNTg5MDE5ODczfQ.zr7LN1D11BnCoQx5FTcwwm0vBT7DSZ88Y9HUEUKCDvM'
		},
		redirect: 'follow'
	};

	fetch("http://localhost:3000/api/track", requestOptions)
		.then(async response => {
			var result = await response.json();
			if (response.ok) {
				
				let select_choose_playlist_tracks_list = document.createElement('select');
				select_choose_playlist_tracks_list.id = selectPlaylistTracksIdName;
				select_choose_playlist_tracks_list.className = "choose-playlist-tracks-list"
				select_choose_playlist_tracks_list.setAttribute("required", "required");
				select_choose_playlist_tracks_list.setAttribute("multiple", "multiple");
				select_choose_playlist_tracks_list.setAttribute("size", "25");
				
					for (let item of result)
					{
					   var newOption = document.createElement("option");
					   newOption.value = item.id;
					   newOption.innerHTML = item.title;

					   select_choose_playlist_tracks_list.insertAdjacentElement('beforeend', newOption);
					}
					
				document.getElementById(afterWhichElementId).insertAdjacentElement('afterend', select_choose_playlist_tracks_list);
			}
			else
			{
				alert(result.message);
			}
		})
		.catch(error => console.log('error', error));
}


function onCreatePlaylistClick(inputPlaylistNameId) {
	
	var selectTracksListId = selectPlaylistTracksIdName;
	
	if (validateData(inputPlaylistNameId) === false) {
		return;
	}
	
	var playlistName = document.getElementById(inputPlaylistNameId).value;
	
	var selectTrackList = document.getElementById(selectTracksListId);
    var selectedTracksId = [];
    var options = selectTrackList && selectTrackList.options;
    var opt;

    for (var i=0, iLen=options.length; i<iLen; i++) {
		opt = options[i];

		if (opt.selected) {
			selectedTracksId.push(opt.value);
		}
    }	
	
	if (selectedTracksId.length == 0) {
		alert("You need to choose at least one track for playlist!");
		return;
	}
	
	var raw = `{\"title\": \"${playlistName}\",\"tracks\": [${selectedTracksId}]}`;
	
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

	fetch("http://localhost:3000/api/playlist", requestOptions)
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



function validateData(inputPlaylistNameId) {
	let playlistName = document.getElementById(inputPlaylistNameId).value;
	
	if (playlistName === undefined || playlistName === "") {
		console.log("Playlist name input is empty");
		alert("You need to write playlist name!");
		return false;
	}	
	
	return true;
}