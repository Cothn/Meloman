
const selectPlaylistTracksIdName = "choose-playlist-tracks-list";

const TEST_URL = "audio/test.mp3"

const OPTION_TRACK_URL_DATA_NAME = "data-trackURL";
const OPTION_TRACK_DURATION_DATA_NAME = "data-trackDuration";

const TRACK_URL_DATA_NAME = "data-trackURL";
const TRACK_IS_LAST_DATA_NAME = "data-isLast";
const TRACK_NEXT_TRACK_DATA_NAME = "data-nextTrackId";
const MAIN_PLAYER_ID = "main-player";

const TRACK_TITLE_SEPARATOR = " - ";

var trackCounterId;


function onCreatePlaylistPageLoad(afterWhichElementId) {
	
	var currUserToken = getCookie("userToken");
	
	var requestOptions = {
		method: 'GET',
		headers: {
			'Authorization':`Bearer ${currUserToken}`
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
					   newOption.setAttribute(OPTION_TRACK_URL_DATA_NAME, item.music_url);
					   newOption.setAttribute(OPTION_TRACK_DURATION_DATA_NAME, item.duration);

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

    for (var i = 0, iLen = options.length; i < iLen; i++) {
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


function onCreateResultPlaylistLookOut(afterWhichDivId, currPlaylistTitleElementId) {
	
	var existedTestPlaylistElement = document.getElementById("test-playlist");
	
	if (existedTestPlaylistElement !== undefined && existedTestPlaylistElement != null) {
		existedTestPlaylistElement.remove();
	}
	
	trackCounterId = 1;
	
	makePlaylistBlock(afterWhichDivId, 1, currPlaylistTitleElementId); 
}


function makePlaylistBlock(afterWhichDivId, postNumber, currPlaylistTitleElementId) {

	var div_post_block = document.createElement('div');
	div_post_block.id = "test-playlist";
	div_post_block.className = "body-post-block test-playlist";

		var hr_post_block_start = document.createElement('hr');
		hr_post_block_start.className = "hr-body-start";
		
		
		var div_post_content_block = document.createElement('div');
		div_post_content_block.className = "body-post-content-block";
		
			var div_v1_first = document.createElement('div');
			div_v1_first.className = "v1-body";
			div_v1_first.setAttribute("style", "flex-grow:1;");
			
			
			var div_post_content_main_block = document.createElement('div');
			div_post_content_main_block.className = "body-post-content-main-block";
			
				var div_playlist_block = document.createElement('div');
				div_playlist_block.className = "body-playlist-block";
				div_playlist_block.setAttribute("style", "flex-grow:3;");
				
					var a_playlist_name_link = document.createElement('a');
					a_playlist_name_link.className = "body-playlist-name-link";
					a_playlist_name_link.innerHTML = document.getElementById(currPlaylistTitleElementId).value;
					
				div_playlist_block.insertAdjacentElement('beforeend', a_playlist_name_link);	
					
					var selectTracksListId = selectPlaylistTracksIdName;
					
					var selectTrackList = document.getElementById(selectTracksListId);
					var selectedTracksId = [];
					var options = selectTrackList && selectTrackList.options;
					var opt;

					for (var i = 0, iLen = options.length; i < iLen; i++) {
						opt = options[i];

						if (opt.selected) {
							selectedTracksId.push({title: opt.innerHTML, music_url: opt.getAttribute(OPTION_TRACK_URL_DATA_NAME), duration: opt.getAttribute(OPTION_TRACK_DURATION_DATA_NAME)});
						}
					}						
					console.log(selectedTracksId);
					for (let trackCount = 0; trackCount < selectedTracksId.length; trackCount++) {
					
						fillTrackBlock(div_playlist_block, postNumber, selectedTracksId.length, selectedTracksId[trackCount]);
					}
					
			div_post_content_main_block.insertAdjacentElement('beforeend', div_playlist_block);	
		
		div_post_content_block.insertAdjacentElement('beforeend', div_v1_first);										
		div_post_content_block.insertAdjacentElement('beforeend', div_post_content_main_block);	

		
		var hr_post_block_end = document.createElement('hr');
		hr_post_block_end.className = "hr-body-end";

	div_post_block.insertAdjacentElement('beforeend', hr_post_block_start);	
	div_post_block.insertAdjacentElement('beforeend', div_post_content_block);	
	div_post_block.insertAdjacentElement('beforeend', hr_post_block_end);	

	document.getElementById(afterWhichDivId).insertAdjacentElement('beforeend', div_post_block);		
	
}



function fillTrackBlock(currPlaylistElement, postNumber, tracksAmount, resultTrackInfo) {

				var currTrackTitle = resultTrackInfo.title;
				var currTrackURL = resultTrackInfo.music_url;
				var currTrackDuration = parseInt(resultTrackInfo.duration);
				
				var arrayOfStrings = currTrackTitle.split(TRACK_TITLE_SEPARATOR);
				
				var currTrackAuthor = arrayOfStrings[0];
				var currTrackName = arrayOfStrings[1];
				
				var minutes =  Math.trunc(currTrackDuration / 60);
				var second = currTrackDuration - minutes * 60;
				
				var currDivTrackBlockId = "post" + (postNumber + 1).toString() + "-" + "track" + trackCounterId.toString() + "-" + "block";
				
				var div_track_block = document.createElement('div');
				div_track_block.id = currDivTrackBlockId;
				div_track_block.className = "body-playlist-single-track-block";
				
				
					var div_track_btn_block = document.createElement('div');
					div_track_btn_block.className = "body-playlist-single-track-btn";
					
						var a_btn_link = document.createElement('a');
						
						var newTrackId = "post" + (postNumber + 1).toString() + "-" + "track" + trackCounterId.toString();
						var nextTrackId = "post" + (postNumber + 1).toString() + "-" + "track" + (trackCounterId + 1).toString();
						
						a_btn_link.id = newTrackId;
						a_btn_link.className = "btn-link";
						a_btn_link.setAttribute(TRACK_URL_DATA_NAME, currTrackURL);
						
						var data_isLast = false;
						
						if (trackCounterId == tracksAmount) {
							data_isLast = true;
							nextTrackId = "";
						}
						
						a_btn_link.setAttribute(TRACK_IS_LAST_DATA_NAME, data_isLast.toString());
						a_btn_link.setAttribute(TRACK_NEXT_TRACK_DATA_NAME, nextTrackId);
						
						a_btn_link.onclick = function() {
							playMusic(this.id, TRACK_URL_DATA_NAME, TRACK_IS_LAST_DATA_NAME, MAIN_PLAYER_ID, this.getAttribute(TRACK_NEXT_TRACK_DATA_NAME))
						}							
						
							var span_btn_link = document.createElement('span');
							span_btn_link.className = "btn action";
				
								var i_btn_link = document.createElement('i');
								i_btn_link.className = "icon track-play-img";
								
							span_btn_link.insertAdjacentElement('beforeend', i_btn_link);	

						a_btn_link.insertAdjacentElement('beforeend', span_btn_link);
						
					div_track_btn_block.insertAdjacentElement('beforeend', a_btn_link);
					
					
					var div_track_title_block = document.createElement('div');
					div_track_title_block.className = "body-playlist-single-track-name-block";

						var p_track_author = document.createElement('p');
						p_track_author.innerHTML = `<b>${currTrackAuthor}</b>`;
						
						var p_track_name = document.createElement('p');
						p_track_name.innerHTML = `${currTrackName}`;							

					div_track_title_block.insertAdjacentElement('beforeend', p_track_author);
					div_track_title_block.insertAdjacentElement('beforeend', p_track_name);


					var div_track_duration_block = document.createElement('div');
					div_track_duration_block.className = "body-playlist-single-track-duration-block";
					
						var p_track_duration = document.createElement('p');
						p_track_duration.innerHTML = `${minutes}:${second}`;	

					div_track_duration_block.insertAdjacentElement('beforeend', p_track_duration);


				div_track_block.insertAdjacentElement('beforeend', div_track_btn_block);
				div_track_block.insertAdjacentElement('beforeend', div_track_title_block);
				div_track_block.insertAdjacentElement('beforeend', div_track_duration_block);


				currPlaylistElement.insertAdjacentElement('beforeend', div_track_block);	

				trackCounterId++;				
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


function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
