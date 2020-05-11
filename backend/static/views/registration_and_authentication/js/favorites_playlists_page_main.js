
const TEST_URL = "audio/test.mp3"

const TRACK_URL_DATA_NAME = "data-trackURL";
const TRACK_IS_LAST_DATA_NAME = "data-isLast";
const TRACK_NEXT_TRACK_DATA_NAME = "data-nextTrackId";
const MAIN_PLAYER_ID = "main-player";

const TRACK_TITLE_SEPARATOR = " - ";

const POST_ID_PREFIX = "post";
const PLAYLIST_ID_PREFIX = "playlist";
const TRACK_ID_PREFIX = "track";
const COMMENT_ID_PREFIX = "comment";

const POST_FAVORITES_BTN_PLAYLIST_ID_DATA_NAME = "data-playlistId";
const POST_FAVORITES_BTN_DID_FAVORITE_DATA_NAME = "data-didFavorite";

const FAVORITES_HOT_BUTTON_ID_POSTFIX = "-favorites-btn"; // post1-favorites-btn

const NOT_FAVORITES_ICON_CLASSNAME_ADD = "post-not-favorites-btn";
const FAVORITES_ICON_CLASSNAME_ADD = "post-favorites-btn";


var trackCounterId = [];

function onFavoritesPlaylistsLoad(afterWhichDivId) {
	
	var currUserToken = getCookie("userToken");	

	var requestOptions = {
		method: 'GET',
		headers: {
			'Authorization':`Bearer ${currUserToken}`
		},
		redirect: 'follow'
	};

	fetch("http://localhost:3000/api/playlist/favorite/my", requestOptions)
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
							
								var div_playlist_header_block = document.createElement('div');
								div_playlist_header_block.setAttribute("style", "display: flex; flex-direction: row;");							
							
									var a_playlist_name_link = document.createElement('a');
									a_playlist_name_link.className = "body-playlist-name-link";
									a_playlist_name_link.innerHTML = currPlaylist.title;
								

									let div_post_hot_button_favorites_block = document.createElement('div');
									div_post_hot_button_favorites_block.className = "body-post-hot-button-block";
									div_post_hot_button_favorites_block.setAttribute("style", "margin-left: 2%;");
							
										let a_post_hot_button_favorites_btn = document.createElement('a');
										a_post_hot_button_favorites_btn.id = POST_ID_PREFIX + (postNumber + 1).toString() + FAVORITES_HOT_BUTTON_ID_POSTFIX;
										a_post_hot_button_favorites_btn.setAttribute(POST_FAVORITES_BTN_PLAYLIST_ID_DATA_NAME, currPlaylist.id);

										a_post_hot_button_favorites_btn.onclick = function() {
											onFavoritesBtnClick(this.id, this.getAttribute(POST_FAVORITES_BTN_PLAYLIST_ID_DATA_NAME), this.getAttribute(POST_FAVORITES_BTN_DID_FAVORITE_DATA_NAME));		
										}

											let span_favorites_btn = document.createElement('span');
											span_favorites_btn.className = "btn action";
										
												let icon_favorites_btn = document.createElement('i');
												
													changeFavoritesButtonIcon(icon_favorites_btn, currPlaylist.id, a_post_hot_button_favorites_btn);
												
											span_favorites_btn.insertAdjacentElement('beforeend', icon_favorites_btn);
											
										a_post_hot_button_favorites_btn.insertAdjacentElement('beforeend', span_favorites_btn);
										
									div_post_hot_button_favorites_block.insertAdjacentElement('beforeend', a_post_hot_button_favorites_btn);
								
								div_playlist_header_block.insertAdjacentElement('beforeend', a_playlist_name_link);	
								div_playlist_header_block.insertAdjacentElement('beforeend', div_post_hot_button_favorites_block);								
/* adsasdasdasdasdasdasdsad */
							div_playlist_block.insertAdjacentElement('beforeend', div_playlist_header_block);	
								
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

				trackCounterId[postNumber]++;				
			}
			else
			{
				alert(resultTrackInfo.message);
			}
		})
		.catch(error => console.log('error', error));
}



function changeFavoritesButtonIcon(currFavoritesIconElement, currPlaylistId, currFavoritesBtnElement) {

	var currUserToken = getCookie("userToken");		

	var requestOptions = {
		method: 'GET',
		headers: {
			'Authorization':`Bearer ${currUserToken}`
		},
		redirect: 'follow'
	};

	fetch("http://localhost:3000/api/playlist/favorite" + "/my", requestOptions)
		.then(async response => {
			var resultFavoritesInfo = await response.json();
			if (response.ok)
			{		
				let doesItFavorite = false;
				
				for (let i = 0; i < resultFavoritesInfo.length; i++) {
					if (resultFavoritesInfo[i].id == currPlaylistId) {
						doesItFavorite = true;
					}
				}
				
				if (!doesItFavorite){
					currFavoritesIconElement.className = "icon " + NOT_FAVORITES_ICON_CLASSNAME_ADD;
					
					currFavoritesBtnElement.setAttribute(POST_FAVORITES_BTN_DID_FAVORITE_DATA_NAME, false);
				}
				else {
					currFavoritesIconElement.className = "icon " + FAVORITES_ICON_CLASSNAME_ADD;		

					currFavoritesBtnElement.setAttribute(POST_FAVORITES_BTN_DID_FAVORITE_DATA_NAME, true);					
				}
			}
			else
			{
				alert(resultFavoritesInfo.message);
			}
		})
		.catch(error => console.log('error', error));	
}



function onFavoritesBtnClick(btnId, currPlaylistId, didFavorite) {

	if (didFavorite == "false") {
		addUserFavoritesToPlaylist(btnId, currPlaylistId);
	}
	else if (didFavorite == "true") {
		deleteUserFavoritesFromPlaylist(btnId, currPlaylistId);
	}
}


function addUserFavoritesToPlaylist(currBtnId, currPlaylistId) {

	currPlaylistId = parseInt(currPlaylistId);
console.log("addUserFavoritesToPlaylist start");
console.log(currPlaylistId);
	var currUserToken = getCookie("userToken");	

	var raw = `{\"playlist_id\": ${currPlaylistId}}`;

	var requestOptions = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
			'Authorization':`Bearer ${currUserToken}`
		},
		body: raw,
		redirect: 'follow'
	};

	fetch("http://localhost:3000/api/playlist/favorite", requestOptions)
		.then(async response => {
			if (response.ok)
			{		
		console.log("SUccessful favorite adding");		
				var currBtnElementChildrens = document.getElementById(currBtnId).children;
				var childrenChildrens = currBtnElementChildrens[0].children;
				childrenChildrens[0].classList.add(FAVORITES_ICON_CLASSNAME_ADD);
				childrenChildrens[0].classList.remove(NOT_FAVORITES_ICON_CLASSNAME_ADD);
				
				document.getElementById(currBtnId).setAttribute(POST_FAVORITES_BTN_DID_FAVORITE_DATA_NAME, true);
			}
			else
			{
				var resultFavoriteAdd = await response.json();				
				alert(resultFavoriteAdd.message);
			}
		})
		.catch(error => console.log('error', error));	
}


function deleteUserFavoritesFromPlaylist(currBtnId, currPlaylistId) {

	currPlaylistId = parseInt(currPlaylistId);
console.log(currPlaylistId);
	var currUserToken = getCookie("userToken");	

	var requestOptions = {
		method: 'DELETE',
		headers: {
			'Authorization':`Bearer ${currUserToken}`
		},
		redirect: 'follow'
	};

	fetch("http://localhost:3000/api/playlist/favorite" + `/${currPlaylistId}`, requestOptions)
		.then(async response => {
			if (response.ok)
			{		
		console.log("SUccessful favorite delete");
				var currBtnElementChildrens = document.getElementById(currBtnId).children;
				var childrenChildrens = currBtnElementChildrens[0].children;
				childrenChildrens[0].classList.add(NOT_FAVORITES_ICON_CLASSNAME_ADD);
				childrenChildrens[0].classList.remove(FAVORITES_ICON_CLASSNAME_ADD);
				
				document.getElementById(currBtnId).setAttribute(POST_FAVORITES_BTN_DID_FAVORITE_DATA_NAME, false);
			}
			else
			{
				var resultFavoriteDelete = await response.json();				
				alert(resultFavoriteDelete.message);
			}
		})
		.catch(error => console.log('error', error));	
}




function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
