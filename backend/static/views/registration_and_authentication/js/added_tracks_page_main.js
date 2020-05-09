
const TEST_URL = "audio/test.mp3"

const TRACK_URL_DATA_NAME = "data-trackURL";
const TRACK_IS_LAST_DATA_NAME = "data-isLast";
const TRACK_NEXT_TRACK_DATA_NAME = "data-nextTrackId";
const MAIN_PLAYER_ID = "main-player";

const TRACK_TITLE_SEPARATOR = " - ";

function onAddedTracksPageLoad(afterWhichDivId) {
	
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
			if (response.ok)
			{
				var audioElement = document.createElement('audio');
				var postCount = 1;
				
				for (let trackCount = 0; trackCount < result.length; trackCount++) {
					console.log(result[trackCount]);
					
					var currTrackTitle = result[trackCount].title;
					var currTrackURL = result[trackCount].music_url;
					var currTrackDuration = 290;
					/* var currTrackDuration = result[trackCount].duration; */
					
					var arrayOfStrings = currTrackTitle.split(TRACK_TITLE_SEPARATOR);
					
					var currTrackAuthor = arrayOfStrings[0];
					var currTrackName = arrayOfStrings[1];
					
					var minutes =  Math.trunc(currTrackDuration / 60);
					var second = currTrackDuration - minutes * 60;
					
					var currDivTrackBlockId = "post" + postCount.toString() + "-" + "track" + (trackCount + 1).toString() + "-" + "block";
					
					var div_track_block = document.createElement('div');
					div_track_block.id = currDivTrackBlockId;
					div_track_block.className = "body-playlist-single-track-block";
					
					
						var div_track_btn_block = document.createElement('div');
						div_track_btn_block.className = "body-playlist-single-track-btn";
						
							var a_btn_link = document.createElement('a');
							
							var newTrackId = "post" + postCount.toString() + "-" + "track" + (trackCount + 1).toString();
							var nextTrackId = "post" + postCount.toString() + "-" + "track" + (trackCount + 2).toString();
							
							a_btn_link.id = newTrackId;
							a_btn_link.className = "btn-link";
							a_btn_link.setAttribute(TRACK_URL_DATA_NAME, TEST_URL);
							
							var data_isLast = false;
							
							if (trackCount == result.length - 1) {
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
					
									var i_btn_link = document.createElement('span');
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


					document.getElementById(afterWhichDivId).insertAdjacentElement('beforeend', div_track_block);

				}
			}
			else
			{
				alert(result.message);
			}
		})
		.catch(error => console.log('error', error));		
}
