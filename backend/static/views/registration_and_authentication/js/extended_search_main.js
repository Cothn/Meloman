
const TEST_URL = "audio/test.mp3"

const TRACK_URL_DATA_NAME = "data-trackURL";
const TRACK_IS_LAST_DATA_NAME = "data-isLast";
const TRACK_NEXT_TRACK_DATA_NAME = "data-nextTrackId";
const MAIN_PLAYER_ID = "main-player";

const TRACK_TITLE_SEPARATOR = " - ";


const SELECT_GENRE_ID_NAME = "choose-track-genre-list";

function onSearchPageLoad(afterWhichElementId) {

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
				console.log('ok');
				let select_choose_track_genre_list = document.createElement('select');
				select_choose_track_genre_list.id = SELECT_GENRE_ID_NAME;
				select_choose_track_genre_list.className = "choose-extended-search-type-list";
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


function onTracksSearch(postDivId, param) {

	let afterWhichDivId = "body-playlist-tracks-block";
	document.getElementById(afterWhichDivId).remove();
	let trackBlock = document.createElement("div");
	trackBlock.id = afterWhichDivId ;
	trackBlock.class = afterWhichDivId ;
	document.getElementById(postDivId).insertAdjacentElement('afterbegin', trackBlock);

	var currUserToken = getCookie("userToken");
	var raw ="?";
	if(param.title != "")
	{
		raw += `title=${param.title}&`;
	}

	if(param.genre){
		let selectGenreElement = document.getElementById(SELECT_GENRE_ID_NAME);
		let trackGenreId = selectGenreElement.options[selectGenreElement.selectedIndex].value;
		raw += `genre_id=${trackGenreId}`;
	}

	var requestOptions = {
		method: 'GET',
		headers: {
			'Authorization':`Bearer ${currUserToken}`
		},
		redirect: 'follow'
	};

	fetch("http://localhost:3000/api/track"+raw, requestOptions)
		.then(async response => {
			var result = await response.json();
			if (response.ok)
			{
				var postCount = 1;
				
				for (let trackCount = 0; trackCount < result.length; trackCount++) {
					//console.log(result[trackCount]);
					
					var currTrackTitle = result[trackCount].title;
					var currTrackURL = result[trackCount].music_url;
					var currTrackDuration = parseInt(result[trackCount].duration);
					
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
							a_btn_link.setAttribute(TRACK_URL_DATA_NAME, currTrackURL);
							
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


function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
