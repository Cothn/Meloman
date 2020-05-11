
const TEST_URL = "audio/test.mp3"

const TRACK_URL_DATA_NAME = "data-trackURL";
const TRACK_IS_LAST_DATA_NAME = "data-isLast";
const TRACK_NEXT_TRACK_DATA_NAME = "data-nextTrackId";

const MAIN_PLAYER_ID = "main-player";
const MAIN_BODY_FOR_ADDING_TRACK_BLOCK = "main-body-playlists-for-adding-track-block";

const TRACK_TITLE_SEPARATOR = " - ";


const SELECT_GENRE_ID_NAME = "choose-track-genre-list";

const SELECT_PLAYLIST_FOR_ADDING_TRACKS_ID_NAME = "choose-playlist-for-adding-track-list";
const IN_WHICH_SELECT_PLAYLISTS_FOR_ADDING_TRACKS_DIV_ID_NAME = "choose-playlist-for-adding-track-block"

const CHOSEN_PLAYLIST_TITLE_LABEL_ID_NAME = "chosen-playlist-title-label";
const CHOSEN_PLAYLIST_TITLE_TEXT_ID_NAME = "chosen-playlist-title-text";

const CHOSEN_TRACK_TITLE_LABEL_ID_NAME = "chosen-track-title-label";
const CHOSEN_TRACK_TITLE_TEXT_ID_NAME = "chosen-track-title-text";

const ADD_TRACK_BTN_TRACK_ID_DATA_NAME = "data-trackId";
const ADD_TRACK_BTN_TRACK_TITLE_DATA_NAME = "data-trackTitle"; 

const CHOSEN_TRACK_TITLE_TEXT_TRACK_ID_DATA_NAME = "data-trackId";
const CHOSEN_TRACK_TITLE_TEXT_TRACK_TITLE_DATA_NAME = "data-trackTitle";

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
				
				fillPlaylistForAddingTracksBlock();
			}
			else
			{
				alert(result.message);
			}
		})
		.catch(error => console.log('error', error));
}


function fillPlaylistForAddingTracksBlock() {
	
	var currUserToken = getCookie("userToken");
	
	var requestOptions = {
		method: 'GET',
		headers: {
			'Authorization':`Bearer ${currUserToken}`
		},
		redirect: 'follow'
	};

	fetch("http://localhost:3000/api/playlist/my", requestOptions)
		.then(async response => {
			var result = await response.json();
			if (response.ok) {
				
				let select_choose_playlist_for_adding_track_list = document.createElement('select');
				select_choose_playlist_for_adding_track_list.id = SELECT_PLAYLIST_FOR_ADDING_TRACKS_ID_NAME;
				select_choose_playlist_for_adding_track_list.className = SELECT_PLAYLIST_FOR_ADDING_TRACKS_ID_NAME;
				select_choose_playlist_for_adding_track_list.setAttribute("size", "28");
				
				select_choose_playlist_for_adding_track_list.onchange = function () {
					onChosenPlaylistForAddingTrack(this.id);
				}
				
					for (let item of result)
					{
					   var newOption = document.createElement("option");
					   newOption.value = item.id;
					   newOption.innerHTML = item.title;

					   select_choose_playlist_for_adding_track_list.insertAdjacentElement('beforeend', newOption);
					}
					
				document.getElementById(IN_WHICH_SELECT_PLAYLISTS_FOR_ADDING_TRACKS_DIV_ID_NAME).insertAdjacentElement('beforeend', select_choose_playlist_for_adding_track_list);
			}
			else
			{
				alert(result.message);
			}
		})
		.catch(error => console.log('error', error));	
}

function onChosenPlaylistForAddingTrack(selectId) {
	
	let select_choose_playlist_for_adding_track_list = document.getElementById(selectId);
	let chosenPlaylistTitle = select_choose_playlist_for_adding_track_list.options[select_choose_playlist_for_adding_track_list.selectedIndex].innerHTML;	
	
	document.getElementById(CHOSEN_PLAYLIST_TITLE_TEXT_ID_NAME).innerHTML = chosenPlaylistTitle;	

}




function onTracksSearch(postDivId, param) {

	let afterWhichDivId = "body-playlist-tracks-block";
	document.getElementById(afterWhichDivId).remove();
	let trackBlock = document.createElement("div");
	trackBlock.id = afterWhichDivId ;
	trackBlock.class = afterWhichDivId ;
	document.getElementById(postDivId).insertAdjacentElement('afterbegin', trackBlock);

	var currUserToken = getCookie("userToken");
	let raw ="?";
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
					
					var currTrackId = result[trackCount].id
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


						var div_track_add_block = document.createElement('div');
						div_track_add_block.className = "body-playlist-single-track-btn track-add-block";
						div_track_add_block.setAttribute("style", "margin-right: 3%;")
						
							var a_track_add_link = document.createElement('a');
							a_track_add_link.className = "btn-link";
							a_track_add_link.setAttribute(ADD_TRACK_BTN_TRACK_ID_DATA_NAME, currTrackId);
							a_track_add_link.setAttribute(ADD_TRACK_BTN_TRACK_TITLE_DATA_NAME, currTrackTitle);
							
							a_track_add_link.onclick = function() {
								onTrackAddBtnClick(this.getAttribute(ADD_TRACK_BTN_TRACK_ID_DATA_NAME), this.getAttribute(ADD_TRACK_BTN_TRACK_TITLE_DATA_NAME));
							}
							
								var span_track_add_btn = document.createElement('span');
								span_track_add_btn.className = "btn action";
								
									var icon_track_add_btn = document.createElement('i');
									icon_track_add_btn.className = "icon track-add-img";

								span_track_add_btn.insertAdjacentElement('beforeend', icon_track_add_btn);
								
							a_track_add_link.insertAdjacentElement('beforeend', span_track_add_btn);
							
						div_track_add_block.insertAdjacentElement('beforeend', a_track_add_link);


						var div_track_duration_block = document.createElement('div');
						div_track_duration_block.className = "body-playlist-single-track-duration-block";
						
							var p_track_duration = document.createElement('p');
							p_track_duration.innerHTML = `${minutes}:${second}`;	

						div_track_duration_block.insertAdjacentElement('beforeend', p_track_duration);


					div_track_block.insertAdjacentElement('beforeend', div_track_btn_block);
					div_track_block.insertAdjacentElement('beforeend', div_track_title_block);
					div_track_block.insertAdjacentElement('beforeend', div_track_add_block);
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





var trackCounterId = [];

function onPlaylistSearch(containerId, param) {

	let afterWhichDivId = "palylists-block";
	document.getElementById(afterWhichDivId).remove();
	let trackBlock = document.createElement("div");
	trackBlock.id = afterWhichDivId ;
	trackBlock.class = afterWhichDivId ;
	document.getElementById(containerId).insertAdjacentElement('beforeend', trackBlock);




	var currUserToken = getCookie("userToken");

	let raw ="";
	if(param.title != "")
	{
		raw += `?title=${param.title}`;
	}

	var requestOptions = {
		method: 'GET',
		headers: {
			'Authorization':`Bearer ${currUserToken}`
		},
		redirect: 'follow'
	};

	fetch("http://localhost:3000/api/playlist"+raw, requestOptions)
		.then(async response => {
			var resultPlaylist = await response.json();
			if (response.ok)
			{
				for (var i = 0; i < resultPlaylist.length; i++) {
					trackCounterId.push(1);
				}

				for (var postCount = 0; postCount < resultPlaylist.length; postCount++) {
					makePlaylistBlock(postCount, resultPlaylist[postCount], afterWhichDivId);
				}
			}
			else
			{
				alert(resultPlaylist.message);
			}
		})
		.catch(error => console.log('error', error));
}



function makePlaylistBlock(postNumber, currPlaylist, afterWhichDivId) {




	var currUserToken = getCookie("userToken");

	var requestOptions = {
		method: 'GET',
		headers: {
			'Authorization':`Bearer ${currUserToken}`
		},
		redirect: 'follow'
	};

	fetch("http://localhost:3000/api/playlist" + `/tracks/${currPlaylist.id}`, requestOptions)
		.then(async response => {
			var resultTracks = await response.json();
			if (response.ok)
			{
				var div_post_block = document.createElement('div');
				div_post_block.className = "body-post-block";

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
				a_playlist_name_link.innerHTML = currPlaylist.title;

				div_playlist_block.insertAdjacentElement('beforeend', a_playlist_name_link);

				for (let trackCount = 0; trackCount < resultTracks.length; trackCount++) {

					fillTrackBlock(div_playlist_block, postNumber, resultTracks.length, resultTracks[trackCount].track_id);
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
			else
			{
				alert(resultTracks.message);
			}
		})
		.catch(error => console.log('error', error));
}



function fillTrackBlock(currPlaylistElement, postNumber, tracksAmount, currTrackId) {




	var currUserToken = getCookie("userToken");

	var requestOptions = {
		method: 'GET',
		headers: {
			'Authorization':`Bearer ${currUserToken}`
		},
		redirect: 'follow'
	};

	fetch("http://localhost:3000/api/track" + `?id=${currTrackId}`, requestOptions)
		.then(async response => {
			var resultTrackInfo = await response.json();
			if (response.ok)
			{
				resultTrackInfo = resultTrackInfo[0];

				var currTrackId = resultTrackInfo.id;
				var currTrackTitle = resultTrackInfo.title;
				var currTrackURL = resultTrackInfo.music_url;
				var currTrackDuration = parseInt(resultTrackInfo.duration);

				var arrayOfStrings = currTrackTitle.split(TRACK_TITLE_SEPARATOR);

				var currTrackAuthor = arrayOfStrings[0];
				var currTrackName = arrayOfStrings[1];

				var minutes =  Math.trunc(currTrackDuration / 60);
				var second = currTrackDuration - minutes * 60;

				var currDivTrackBlockId = "post" + (postNumber + 1).toString() + "-" + "track" + trackCounterId[postNumber].toString() + "-" + "block";

				var div_track_block = document.createElement('div');
				div_track_block.id = currDivTrackBlockId;
				div_track_block.className = "body-playlist-single-track-block";


				var div_track_btn_block = document.createElement('div');
				div_track_btn_block.className = "body-playlist-single-track-btn";

				var a_btn_link = document.createElement('a');

				var newTrackId = "post" + (postNumber + 1).toString() + "-" + "track" + trackCounterId[postNumber].toString();
				var nextTrackId = "post" + (postNumber + 1).toString() + "-" + "track" + (trackCounterId[postNumber] + 1).toString();

				a_btn_link.id = newTrackId;
				a_btn_link.className = "btn-link";
				a_btn_link.setAttribute(TRACK_URL_DATA_NAME, currTrackURL);

				var data_isLast = false;

				if (trackCounterId[postNumber] == tracksAmount) {
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
				

				var div_track_add_block = document.createElement('div');
				div_track_add_block.className = "body-playlist-single-track-btn track-add-block";
				div_track_add_block.setAttribute("style", "margin-right: 3%;")
				
					var a_track_add_link = document.createElement('a');
					a_track_add_link.className = "btn-link";
					a_track_add_link.setAttribute(ADD_TRACK_BTN_TRACK_ID_DATA_NAME, currTrackId);
					a_track_add_link.setAttribute(ADD_TRACK_BTN_TRACK_TITLE_DATA_NAME, currTrackTitle);
					
					a_track_add_link.onclick = function() {
						onTrackAddBtnClick(this.getAttribute(ADD_TRACK_BTN_TRACK_ID_DATA_NAME), this.getAttribute(ADD_TRACK_BTN_TRACK_TITLE_DATA_NAME));
					}
					
						var span_track_add_btn = document.createElement('span');
						span_track_add_btn.className = "btn action";
						
							var icon_track_add_btn = document.createElement('i');
							icon_track_add_btn.className = "icon track-add-img";

						span_track_add_btn.insertAdjacentElement('beforeend', icon_track_add_btn);
						
					a_track_add_link.insertAdjacentElement('beforeend', span_track_add_btn);
					
				div_track_add_block.insertAdjacentElement('beforeend', a_track_add_link);


				var div_track_duration_block = document.createElement('div');
				div_track_duration_block.className = "body-playlist-single-track-duration-block";
				div_track_duration_block.setAttribute("style", "margin-left: 0px;");

				var p_track_duration = document.createElement('p');
				p_track_duration.innerHTML = `${minutes}:${second}`;

				div_track_duration_block.insertAdjacentElement('beforeend', p_track_duration);


				div_track_block.insertAdjacentElement('beforeend', div_track_btn_block);
				div_track_block.insertAdjacentElement('beforeend', div_track_title_block);
				div_track_block.insertAdjacentElement('beforeend', div_track_add_block);
				div_track_block.insertAdjacentElement('beforeend', div_track_duration_block);


				currPlaylistElement.insertAdjacentElement('beforeend', div_track_block);

				trackCounterId[postNumber]++;
			}
			else
			{
				alert(resultTrackInfo.message);
			}
		})
		.catch(error => console.log('error', error));
}



function onTrackAddBtnClick(trackId, trackTitle) {
	
	var chosenTrackElement = document.getElementById(CHOSEN_TRACK_TITLE_TEXT_ID_NAME);
	
	chosenTrackElement.setAttribute(CHOSEN_TRACK_TITLE_TEXT_TRACK_ID_DATA_NAME, trackId);
	chosenTrackElement.innerHTML = trackTitle;	
	
	document.getElementById(MAIN_BODY_FOR_ADDING_TRACK_BLOCK).style.display = "block";
}




function onAddingTrackBtnClick() {

	let select_choose_playlist_for_adding_track_list = document.getElementById(SELECT_PLAYLIST_FOR_ADDING_TRACKS_ID_NAME);
	let currPlaylistId = select_choose_playlist_for_adding_track_list.options[select_choose_playlist_for_adding_track_list.selectedIndex].value;	
	var currTrackId = document.getElementById(CHOSEN_TRACK_TITLE_TEXT_ID_NAME).getAttribute(CHOSEN_TRACK_TITLE_TEXT_TRACK_ID_DATA_NAME);

	var raw = `{\"tracks\": [${currTrackId}]}`;
			
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

	fetch("http://localhost:3000/api/playlist/tracks" + `/${currPlaylistId}`, requestOptions)
		.then(async response => {
			if (response.ok)
			{
				alert("Track added!");
			}
			else
			{
				var resultTrackAdding = await response.json();
				alert(resultTrackAdding.message);
			}
		})
		.catch(error => console.log('error', error));				
}



function onCancelAddingTrackBtnClick() {
	
	document.getElementById(MAIN_BODY_FOR_ADDING_TRACK_BLOCK).style.display = "none";
}


function onUsersSearch(postDivId, param) {

	let afterWhichDivId = "users-block";
	document.getElementById(afterWhichDivId).remove();
	let trackBlock = document.createElement("div");
	trackBlock.id = afterWhichDivId ;
	trackBlock.class = afterWhichDivId ;
	document.getElementById(postDivId).insertAdjacentElement('beforeend', trackBlock);

	var currUserToken = getCookie("userToken");
	let raw ="";
	if(param.nickname != "")
	{
		raw += `?nickname=${param.nickname}`;
	}


	var requestOptions = {
		method: 'GET',
		headers: {
			'Authorization':`Bearer ${currUserToken}`
		},
		redirect: 'follow'
	};

	fetch("http://localhost:3000/api/user"+raw, requestOptions)
		.then(async response => {
			var result = await response.json();
			if (response.ok)
			{

				for (let userCount = 0; userCount < result.length; userCount++) {
					//console.log(result[userCount]);

					var currUserId = result[userCount].id;
					var currUserNick = result[userCount].nickname;
					var currUserName = result[userCount].name;
					var currUserSurname = result[userCount].surname;
					var currUserEmail = result[userCount].email;
					if (!currUserName) {
						currUserName="";
					}
					if (!currUserSurname) {
						currUserSurname="";
					}

					var currDivUserBlockId = "user" + (userCount + 1).toString() + "-" + "block";

					var div_user_block = document.createElement('div');
					div_user_block.id = currDivUserBlockId;
					div_user_block.className = "body-post-block";

					var a_user_nickname = document.createElement('a');
					a_user_nickname.className = "body-users-search-username-link";
					a_user_nickname.href = "/view/user/user_page?user_id=" + currUserId;
					a_user_nickname.innerHTML = `<b>${currUserNick}</b>`;
					a_user_nickname.setAttribute("style", "padding-left: 2%;");

					var hr_body_first = document.createElement('hr');
					hr_body_first.className = "hr-body";

					var p_user_name = document.createElement('pre');
					p_user_name.innerHTML = "Name: " + `${currUserName}`;
					p_user_name.setAttribute("style", "margin-top: 1%; margin-left: 1%");

					var p_user_surname = document.createElement('pre');
					p_user_surname.innerHTML = "Surname: " + `${currUserSurname}`;
					p_user_surname.setAttribute("style", "margin-left: 1%");

					var p_user_email = document.createElement('p');
					p_user_email.innerHTML = "Email: " + `<b>${currUserEmail}</b>`;
					p_user_email.setAttribute("style", "margin-left: 1%; margin-bottom: 1%;");					


					var hr_post_block_end = document.createElement('hr');
					hr_post_block_end.className = "hr-body-end";

					var hr_post_block_start = document.createElement('hr');
					hr_post_block_start.className = "hr-body-start";

					div_user_block.insertAdjacentElement('beforeend', hr_post_block_start);
					div_user_block.insertAdjacentElement('beforeend', a_user_nickname);
					div_user_block.insertAdjacentElement('beforeend', hr_body_first);
					div_user_block.insertAdjacentElement('beforeend', p_user_name);


					div_user_block.insertAdjacentElement('beforeend', p_user_surname);
					div_user_block.insertAdjacentElement('beforeend', p_user_email);
					div_user_block.insertAdjacentElement('beforeend', hr_post_block_end);


					document.getElementById(afterWhichDivId).insertAdjacentElement('beforeend', div_user_block);

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
