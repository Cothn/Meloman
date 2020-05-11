
const HEADER_USERNAME_LINK_ID = "header-username";
const BODY_USER_EDIT_LINK_ID = "body-user-edit-link";
const MAIN_PLAYER_ID = "main-player";

const TEST_URL = "audio/test.mp3"


const USER_ABOUT_USERNAME_LINK_ID = "body-user-about-username";
const USER_ABOUT_NAME_SURNAME_LINK_ID = "body-user-about-name-surname";
const USER_MAIN_TRACK_INFO_BLOCK_ID = "body-user-main-track-info";

const TRACK_URL_DATA_NAME = "data-trackURL";
const TRACK_IS_LAST_DATA_NAME = "data-isLast";
const TRACK_NEXT_TRACK_DATA_NAME = "data-nextTrackId";

const POST_USERNAME_AUTHOR_ID_DATA_NAME = "data-authorId"

const POST_PLAYLIST_TITLE_PLAYLIST_ID_DATA_NAME = "data-playlistId";

const POST_LIKE_BTN_POST_ID_DATA_NAME = "data-postId";
const POST_LIKE_BTN_DID_LIKE_DATA_NAME = "data-didLike";

const POST_FAVORITES_BTN_PLAYLIST_ID_DATA_NAME = "data-playlistId";
const POST_FAVORITES_BTN_DID_FAVORITE_DATA_NAME = "data-didFavorite";

const POST_COMMENT_BTN_POST_ID_DATA_NAME = "data-postId";

const COMMENT_AUTHOR_ID_DATA_NAME = "data-authorId";

const POST_ID_PREFIX = "post";
const PLAYLIST_ID_PREFIX = "playlist";
const TRACK_ID_PREFIX = "track";
const COMMENT_ID_PREFIX = "comment";

const LIKE_HOT_BUTTON_ID_POSTFIX = "-like-btn"; // post1-like-btn
const LIKES_AMOUNT_I_ID_POSTFIX = "-likes-amount";
const FAVORITES_HOT_BUTTON_ID_POSTFIX = "-favorites-btn"; // post1-favorites-btn
const COMMENT_HOT_BUTTON_ID_POSTFIX = "-comment-btn"; // post1-comment-btn

const WRITE_COMMENT_BLOCK_ID_POSTFIX = "-write-comment-block"; //post1-write-comment-block
const WRITE_COMMENT_TEXT_ID_POSTFIX = "-write-comment-text"; // post1-write-comment-text
const WRITE_COMMENT_BTN_ID_POSTFIX = "-write-comment-btn"; // post1-write-comment-btn

const POST_USERNAME_AUTHOR_ID_POSTFIX = "-author"; // post1-author
const POST_PLAYLIST_TITLE_PLAYLIST_ID_POSTFIX = "-playlist"; // post1-playlist
const COMMENTS_BLOCK_POSTFIX = "-comments-block"; // post1-comments-block
const COMMENT_AUTHOR_ID_POSTFIX = "-author"; // post1-comment1-author

const NOT_LIKED_ICON_CLASSNAME_ADD = "post-not-liked-btn";
const LIKED_ICON_CLASSNAME_ADD = "post-liked-btn";
const NOT_FAVORITES_ICON_CLASSNAME_ADD = "post-not-favorites-btn";
const FAVORITES_ICON_CLASSNAME_ADD = "post-favorites-btn";

const ALL_ID_NAMES_SEPARATOR = "-";
const TRACK_TITLE_SEPARATOR = " - ";

var allPostsInfo;



function onUserPageLoad(afterWhichDivId, userPlayerId, userQuickButtonsBlockId) {

	var urlParams = new URLSearchParams(window.location.search);
	var compareUserId = urlParams.get('user_id');	

	var currUserToken = getCookie("userToken");	

	var requestOptions = {
		method: 'GET',
		headers: {
			'Authorization':`Bearer ${currUserToken}`
		},
		redirect: 'follow'
	};

	fetch("http://localhost:3000/api/user/me", requestOptions)
		.then(async response => {
			var resultUser = await response.json();
			if (response.ok)
			{
				var userIdForPosts = compareUserId;
				
				if (resultUser.id == compareUserId || compareUserId == null || compareUserId == "") {
					
					userIdForPosts = resultUser.id;
					
					changeVisibility(userQuickButtonsBlockId, "block");
					
					document.getElementById(USER_ABOUT_USERNAME_LINK_ID).innerHTML = resultUser.nickname;
					
					var userName;
					var userSurname;
					
					if (resultUser.name == null) {
						userName = "";
					}
					else {
						userName = resultUser.name;
					}
					
					if (resultUser.surname == null) {
						userSurname = "";
					}
					else {
						userSurname = resultUser.surname;
					}				
					
					document.getElementById(USER_ABOUT_NAME_SURNAME_LINK_ID).innerHTML = userName + " " + userSurname;
					
					if (resultUser.music_avatar_id != null) {
						fillUserMainTrackBlock(userPlayerId, resultUser.music_avatar_id, USER_MAIN_TRACK_INFO_BLOCK_ID);
					}					
				}
				else {
					fillUserAboutBlock(compareUserId, userPlayerId);
				}
				
				loadAllUserPosts(userIdForPosts, afterWhichDivId);
			}				
			else
			{
				alert(resultUser.message);
			}
		})
		.catch(error => console.log('error', error));
}


function fillUserAboutBlock(userId, userPlayerId) {
	
	var currUserToken = getCookie("userToken");	

	var requestOptions = {
		method: 'GET',
		headers: {
			'Authorization':`Bearer ${currUserToken}`
		},
		redirect: 'follow'
	};

	fetch("http://localhost:3000/api/user" + `?user_id=${userId}`, requestOptions)
		.then(async response => {
			var resultUser = await response.json();
			if (response.ok)
			{	

				resultUser = resultUser[0];

				document.getElementById(USER_ABOUT_USERNAME_LINK_ID).innerHTML = resultUser.nickname;
				document.getElementById(BODY_USER_EDIT_LINK_ID).setAttribute("hidden", "hidden");
		
				var userName;
				var userSurname;
				
				if (resultUser.name == null) {
					userName = "";
				}
				else {
					userName = resultUser.name;
				}
				
				if (resultUser.surname == null) {
					userSurname = "";
				}
				else {
					userSurname = resultUser.surname;
				}				
				
				document.getElementById(USER_ABOUT_NAME_SURNAME_LINK_ID).innerHTML = userName + " " + userSurname;	

				if (resultUser.music_avatar_id != null) {
					fillUserMainTrackBlock(userPlayerId, resultUser.music_avatar_id, USER_MAIN_TRACK_INFO_BLOCK_ID);
				}		
			}				
			else
			{
				alert(resultUser.message);
			}
		})
		.catch(error => console.log('error', error));		
}



function fillUserMainTrackBlock(userPlayerElementId, currTrackId, userMainTrackInfoBlockElementId) {
	
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
				
				document.getElementById(userPlayerElementId).src = resultTrackInfo.music_url;
				document.getElementById(userPlayerElementId).play();
				
				var currTrackTitle = resultTrackInfo.title;
				
				var arrayOfStrings = currTrackTitle.split(TRACK_TITLE_SEPARATOR);
				
				var currTrackAuthor = arrayOfStrings[0];
				var currTrackName = arrayOfStrings[1];
				
				let p_main_track_info_author = document.createElement('p');
				p_main_track_info_author.setAttribute("style", "display: flex; flex-direction: row;");
				
					let b_main_track_info_author = document.createElement('b');
					b_main_track_info_author.innerHTML = currTrackAuthor;
					
					let pre_main_track_info_author = document.createElement('pre');
					pre_main_track_info_author.innerHTML = " - ";
					
				p_main_track_info_author.insertAdjacentElement('beforeend', b_main_track_info_author);	
				p_main_track_info_author.insertAdjacentElement('beforeend', pre_main_track_info_author);	
				
				
				let p_main_track_info_name = document.createElement('p');
				p_main_track_info_name.innerHTML = currTrackName;
				
				
				document.getElementById(userMainTrackInfoBlockElementId).insertAdjacentElement('beforeend', p_main_track_info_author);
				document.getElementById(userMainTrackInfoBlockElementId).insertAdjacentElement('beforeend', p_main_track_info_name);				
			}
			else
			{
				alert(resultTrackInfo.message);
			}
		})
		.catch(error => console.log('error', error));			
}



function loadAllUserPosts(userId, afterWhichDivId) {
	
	var currUserToken = getCookie("userToken");	

	var requestOptions = {
		method: 'GET',
		headers: {
			'Authorization':`Bearer ${currUserToken}`
		},
		redirect: 'follow'
	};

	fetch("http://localhost:3000/api/post" + `?author_id=${userId}`, requestOptions)
		.then(async response => {
			var resultPosts = await response.json();
			if (response.ok)
			{
				allPostsInfo = {postsElements: [], postTracksCounters: [], postsAmount: resultPosts.length};
				
				for (var i = 0; i < resultPosts.length; i++) {
					var newPostElement = document.createElement('div');
					newPostElement.id = POST_ID_PREFIX + `${i + 1}`;
					newPostElement.className = "limiter body-main";
					
					document.getElementById(afterWhichDivId).insertAdjacentElement('afterend', newPostElement);	
					
					allPostsInfo.postsElements.push(newPostElement);
					
					allPostsInfo.postTracksCounters.push(1);
				}
				
				for (var postCount = 0; postCount < resultPosts.length; postCount++) {
					makePostBlock(postCount, resultPosts[postCount]);
				}
			}
			else
			{
				alert(resultPosts.message);
			}
		})
		.catch(error => console.log('error', error));		
}


function makePostBlock(postCount, currPostItem) {
	
	var currUserToken = getCookie("userToken");	

	var requestOptions = {
		method: 'GET',
		headers: {
			'Authorization':`Bearer ${currUserToken}`
		},
		redirect: 'follow'
	};

	fetch("http://localhost:3000/api/playlist" + `?id=${currPostItem.playlist_id}`, requestOptions)
		.then(async response => {
			var resultPlaylist = await response.json();
			if (response.ok)
			{
				makePlaylistBlock(postCount, currPostItem, resultPlaylist[0]);
			}
			else
			{
				alert(resultPlaylist.message);
			}
		})
		.catch(error => console.log('error', error));		
}



function makePlaylistBlock(postNumber, currPost, currPlaylist) {
	
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
		
		
					var div_post_username_block = document.createElement('div');
					div_post_username_block.className = "body-post-username-block";

						fillUsernameBlock(div_post_username_block, currPost.author_id, postNumber);
					
					var hr_post_block_body_first = document.createElement('hr');
					hr_post_block_body_first.className = "hr-body";							
					
					
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
								a_playlist_name_link.id = POST_ID_PREFIX + (postNumber + 1).toString() + POST_PLAYLIST_TITLE_PLAYLIST_ID_POSTFIX; 
								a_playlist_name_link.className = "body-playlist-name-link";
								a_playlist_name_link.setAttribute("href", `/view/playlist/info?playlist_id=${currPlaylist.id}`);
								a_playlist_name_link.setAttribute(POST_PLAYLIST_TITLE_PLAYLIST_ID_DATA_NAME, currPlaylist.id);
								
									fillPlaylistTitleBlock(a_playlist_name_link, currPlaylist.title, currPlaylist.author_id);
								
							div_playlist_block.insertAdjacentElement('beforeend', a_playlist_name_link);	
								
								for (let trackCount = 0; trackCount < resultTracks.length; trackCount++) {
								
									fillTrackBlock(div_playlist_block, postNumber, resultTracks.length, resultTracks[trackCount].track_id);
								}
								
							var div_v1_second = document.createElement('div');
							div_v1_second.className = "v1-body";
							div_v1_second.setAttribute("style", "flex-grow:0.05;");
								
								
							var div_post_text_block = document.createElement('div');
							div_post_text_block.className = "body-post-text-block";
							div_post_text_block.setAttribute("style", "flex-grow:1;");
							
								fillPostTextBlock(div_post_text_block, currPost.text);
								
						div_post_content_main_block.insertAdjacentElement('beforeend', div_playlist_block);	
						div_post_content_main_block.insertAdjacentElement('beforeend', div_v1_second);	
						div_post_content_main_block.insertAdjacentElement('beforeend', div_post_text_block);	
					
					div_post_content_block.insertAdjacentElement('beforeend', div_v1_first);										
					div_post_content_block.insertAdjacentElement('beforeend', div_post_content_main_block);	


					var hr_post_block_body_second = document.createElement('hr');
					hr_post_block_body_second.className = "hr-body";	
					
					
					var div_post_buttons_block = document.createElement('div');
					div_post_buttons_block.className = "body-post-buttons-block";
					
						fillPostButtonsBlock(div_post_buttons_block, postNumber, currPost.id, currPlaylist.id);
					
					var hr_post_block_body_third = document.createElement('hr');
					hr_post_block_body_third.className = "hr-body";					
					
					var div_post_comments_block = document.createElement('div');
					div_post_comments_block.id = POST_ID_PREFIX + (postNumber + 1).toString() + COMMENTS_BLOCK_POSTFIX;
					div_post_comments_block.className = "body-post-comments-block";
					
						fillPostCommentsBlock(div_post_comments_block, currPost.id)
					
					var hr_post_block_end = document.createElement('hr');
					hr_post_block_end.className = "hr-body-end";

				div_post_block.insertAdjacentElement('beforeend', hr_post_block_start);	
				div_post_block.insertAdjacentElement('beforeend', div_post_username_block);
				div_post_block.insertAdjacentElement('beforeend', hr_post_block_body_first);				
				div_post_block.insertAdjacentElement('beforeend', div_post_content_block);
				div_post_block.insertAdjacentElement('beforeend', hr_post_block_body_second);
				div_post_block.insertAdjacentElement('beforeend', div_post_buttons_block);
				div_post_block.insertAdjacentElement('beforeend', hr_post_block_body_third);
				div_post_block.insertAdjacentElement('beforeend', div_post_comments_block);				
				div_post_block.insertAdjacentElement('beforeend', hr_post_block_end);	

				allPostsInfo.postsElements[postNumber].insertAdjacentElement('beforeend', div_post_block);	
			}
			else
			{
				alert(resultTracks.message);
			}
		})
		.catch(error => console.log('error', error));	
}



function fillUsernameBlock(currUsernameElement, userId, postNumber) {

	var currUserToken = getCookie("userToken");		

	var requestOptions = {
		method: 'GET',
		headers: {
			'Authorization':`Bearer ${currUserToken}`
		},
		redirect: 'follow'
	};

	fetch("http://localhost:3000/api/user" + `?user_id=${userId}`, requestOptions)
		.then(async response => {
			var resultUserInfo = await response.json();
			if (response.ok)
			{			
				resultUserInfo = resultUserInfo[0];

				let	a_post_username_link = document.createElement('a');
				a_post_username_link.id = POST_ID_PREFIX + (postNumber + 1).toString() + POST_USERNAME_AUTHOR_ID_POSTFIX;
				a_post_username_link.className = "body-post-username-link";
				a_post_username_link.innerHTML = resultUserInfo.nickname;
/* 				a_post_username_link.setAttribute("href", `/view/user?user_id=${resultUserInfo.id}`); */
				a_post_username_link.setAttribute(POST_USERNAME_AUTHOR_ID_DATA_NAME, resultUserInfo.id);
	
				currUsernameElement.insertAdjacentElement('beforeend', a_post_username_link);				
			}
			else
			{
				alert(resultUserInfo.message);
			}
		})
		.catch(error => console.log('error', error));	
}




function fillPlaylistTitleBlock(currPlaylistElement, title, userId) {

	var currUserToken = getCookie("userToken");		
	
	var requestOptions = {
		method: 'GET',
		headers: {
			'Authorization':`Bearer ${currUserToken}`
		},
		redirect: 'follow'
	};

	fetch("http://localhost:3000/api/user" + `?user_id=${userId}`, requestOptions)
		.then(async response => {
			var resultUserInfo = await response.json();
			if (response.ok)
			{			
				resultUserInfo = resultUserInfo[0];

				currPlaylistElement.innerHTML = title + " (" + resultUserInfo.nickname + ")";			
			}
			else
			{
				alert(resultUserInfo.message);
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
				
				var currDivTrackBlockId = POST_ID_PREFIX + (postNumber + 1).toString() + "-" + TRACK_ID_PREFIX + allPostsInfo.postTracksCounters[postNumber].toString() + "-" + "block";
				
				var div_track_block = document.createElement('div');
				div_track_block.id = currDivTrackBlockId;
				div_track_block.className = "body-playlist-single-track-block";
				
				
					var div_track_btn_block = document.createElement('div');
					div_track_btn_block.className = "body-playlist-single-track-btn";
					
						var a_btn_link = document.createElement('a');
						
						var newTrackId = POST_ID_PREFIX + (postNumber + 1).toString() + "-" + TRACK_ID_PREFIX + allPostsInfo.postTracksCounters[postNumber].toString();
						var nextTrackId = POST_ID_PREFIX + (postNumber + 1).toString() + "-" + TRACK_ID_PREFIX + (allPostsInfo.postTracksCounters[postNumber] + 1).toString();
						
						a_btn_link.id = newTrackId;
						a_btn_link.className = "btn-link";
						a_btn_link.setAttribute(TRACK_URL_DATA_NAME, currTrackURL);
						
						var data_isLast = false;
						
						if (allPostsInfo.postTracksCounters[postNumber] == tracksAmount) {
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

				allPostsInfo.postTracksCounters[postNumber]++;				
			}
			else
			{
				alert(resultTrackInfo.message);
			}
		})
		.catch(error => console.log('error', error));
}



function fillPostTextBlock(currPostTextElement, postText) {
	
	var a_post_text_header = document.createElement('div');
	a_post_text_header.className = "body-post-text-header";
	a_post_text_header.innerHTML = "Post text:";

	var textarea_post_text = document.createElement('textarea');
	textarea_post_text.className = "body-post-textarea";	
	textarea_post_text.setAttribute("disabled", "disabled");
	textarea_post_text.innerHTML = `${postText}`;
	
	currPostTextElement.insertAdjacentElement('beforeend', a_post_text_header);	
	currPostTextElement.insertAdjacentElement('beforeend', textarea_post_text);
}



function fillPostButtonsBlock(currPostButtonsElement, postNumber, currPostId, currPlaylistId) {
	
	var currUserToken = getCookie("userToken");		

	var requestOptions = {
		method: 'GET',
		headers: {
			'Authorization':`Bearer ${currUserToken}`
		},
		redirect: 'follow'
	};

	fetch("http://localhost:3000/api/like_in_post" + `/${currPostId}`, requestOptions)
		.then(async response => {
			var resultLikesInfo = await response.json();
			if (response.ok)
			{	
				let div_post_hot_button_like_block = document.createElement('div');
				div_post_hot_button_like_block.className = "body-post-hot-button-block";
		
					let a_post_hot_button_like_btn = document.createElement('a');
					a_post_hot_button_like_btn.id = POST_ID_PREFIX + (postNumber + 1).toString() + LIKE_HOT_BUTTON_ID_POSTFIX;
					a_post_hot_button_like_btn.setAttribute(POST_LIKE_BTN_POST_ID_DATA_NAME, currPostId);

					a_post_hot_button_like_btn.onclick = function() {
						onLikeBtnClick(this.id, this.getAttribute(POST_LIKE_BTN_POST_ID_DATA_NAME), this.getAttribute(POST_LIKE_BTN_DID_LIKE_DATA_NAME));		
					}

						let span_like_btn = document.createElement('span');
						span_like_btn.className = "btn action";
					
							let icon_like_btn = document.createElement('i');

								changeLikeButtonIcon(icon_like_btn, currPostId, a_post_hot_button_like_btn);
							
						span_like_btn.insertAdjacentElement('beforeend', icon_like_btn);
						
					a_post_hot_button_like_btn.insertAdjacentElement('beforeend', span_like_btn);
					
				div_post_hot_button_like_block.insertAdjacentElement('beforeend', a_post_hot_button_like_btn);
	
				
				let div_post_hot_button_likes_amount_block = document.createElement('div');
				div_post_hot_button_likes_amount_block.className = "body-post-likes-amount-block";
				
					let i_likes_amount = document.createElement('i');
					i_likes_amount.id = POST_ID_PREFIX + (postNumber + 1).toString() + LIKES_AMOUNT_I_ID_POSTFIX;
					i_likes_amount.innerHTML = `${resultLikesInfo.length}`;				
		
				div_post_hot_button_likes_amount_block.insertAdjacentElement('beforeend', i_likes_amount);
		
		
				let div_post_hot_button_favorites_block = document.createElement('div');
				div_post_hot_button_favorites_block.className = "body-post-hot-button-block";
		
					let a_post_hot_button_favorites_btn = document.createElement('a');
					a_post_hot_button_favorites_btn.id = POST_ID_PREFIX + (postNumber + 1).toString() + FAVORITES_HOT_BUTTON_ID_POSTFIX;
					a_post_hot_button_favorites_btn.setAttribute(POST_FAVORITES_BTN_PLAYLIST_ID_DATA_NAME, currPlaylistId);

					a_post_hot_button_favorites_btn.onclick = function() {
						onFavoritesBtnClick(this.id, this.getAttribute(POST_FAVORITES_BTN_PLAYLIST_ID_DATA_NAME), this.getAttribute(POST_FAVORITES_BTN_DID_FAVORITE_DATA_NAME));		
					}

						let span_favorites_btn = document.createElement('span');
						span_favorites_btn.className = "btn action";
					
							let icon_favorites_btn = document.createElement('i');
							
								changeFavoritesButtonIcon(icon_favorites_btn, currPlaylistId, a_post_hot_button_favorites_btn);
							
						span_favorites_btn.insertAdjacentElement('beforeend', icon_favorites_btn);
						
					a_post_hot_button_favorites_btn.insertAdjacentElement('beforeend', span_favorites_btn);
					
				div_post_hot_button_favorites_block.insertAdjacentElement('beforeend', a_post_hot_button_favorites_btn);		
		
		
				let div_post_hot_button_comment_block = document.createElement('div');
				div_post_hot_button_comment_block.className = "body-post-hot-button-block";
		
					let a_post_hot_button_comment_btn = document.createElement('a');
					a_post_hot_button_comment_btn.id = POST_ID_PREFIX + (postNumber + 1).toString() + COMMENT_HOT_BUTTON_ID_POSTFIX;

					a_post_hot_button_comment_btn.onclick = function() {
						onCommentBtnClick(this.id);		
					}

						let span_comment_btn = document.createElement('span');
						span_comment_btn.className = "btn action";
					
							let icon_comment_btn = document.createElement('i');
							icon_comment_btn.className = "icon post-comment-btn";
							
						span_comment_btn.insertAdjacentElement('beforeend', icon_comment_btn);
						
					a_post_hot_button_comment_btn.insertAdjacentElement('beforeend', span_comment_btn);
					
				div_post_hot_button_comment_block.insertAdjacentElement('beforeend', a_post_hot_button_comment_btn);		
		
		
				let div_post_write_comment_block = document.createElement('div');
				div_post_write_comment_block.id = POST_ID_PREFIX + (postNumber + 1).toString() + WRITE_COMMENT_BLOCK_ID_POSTFIX;
				div_post_write_comment_block.className = "body-post-write-comment-block";
				div_post_write_comment_block.style.display = "none";
				
					let div_post_write_comment_text_block = document.createElement('div');
					div_post_write_comment_text_block.className = "body-post-write-comment-text-block";
					
						let textarea_write_comment_text = document.createElement('textarea');
						textarea_write_comment_text.id = POST_ID_PREFIX + (postNumber + 1).toString() + WRITE_COMMENT_TEXT_ID_POSTFIX;
						textarea_write_comment_text.className = "body-post-write-comment-text";
						
					div_post_write_comment_text_block.insertAdjacentElement('beforeend', textarea_write_comment_text);
					
					
					let div_post_write_comment_btn_block = document.createElement('div');
					div_post_write_comment_btn_block.className = "body-post-write-comment-btn-block";
					
						let button_write_comment_btn = document.createElement('button');
						button_write_comment_btn.id = POST_ID_PREFIX + (postNumber + 1).toString() + WRITE_COMMENT_BTN_ID_POSTFIX;
						button_write_comment_btn.className = "login100-form-btn write-comment-button";
						button_write_comment_btn.setAttribute(POST_COMMENT_BTN_POST_ID_DATA_NAME, currPostId);
						button_write_comment_btn.innerHTML = "Comment";
	
						button_write_comment_btn.onclick = function() {
							onWriteCommentBtnClick(this.id, this.getAttribute(POST_COMMENT_BTN_POST_ID_DATA_NAME));		
						}
	
					div_post_write_comment_btn_block.insertAdjacentElement('beforeend', button_write_comment_btn);
					
				div_post_write_comment_block.insertAdjacentElement('beforeend', div_post_write_comment_text_block);
				div_post_write_comment_block.insertAdjacentElement('beforeend', div_post_write_comment_btn_block);
					
				currPostButtonsElement.insertAdjacentElement('beforeend', div_post_hot_button_like_block);
				currPostButtonsElement.insertAdjacentElement('beforeend', div_post_hot_button_likes_amount_block);
				currPostButtonsElement.insertAdjacentElement('beforeend', div_post_hot_button_favorites_block);
				currPostButtonsElement.insertAdjacentElement('beforeend', div_post_hot_button_comment_block);
				currPostButtonsElement.insertAdjacentElement('beforeend', div_post_write_comment_block);
			}
			else
			{
				alert(resultLikesInfo.message);
			}
		})
		.catch(error => console.log('error', error));		
}



function changeLikeButtonIcon(currLikeIconElement, currPostId, currLikeBtnElement) {

	var currUserToken = getCookie("userToken");		

	var requestOptions = {
		method: 'GET',
		headers: {
			'Authorization':`Bearer ${currUserToken}`
		},
		redirect: 'follow'
	};
	fetch("http://localhost:3000/api/like_in_post" + `/${currPostId}` + "/my", requestOptions)
		.then(async response => {
			var resultLikesInfo = await response.json();
			if (response.ok)
			{		
				if (resultLikesInfo.length == 0 ){
					currLikeIconElement.className = "icon " + NOT_LIKED_ICON_CLASSNAME_ADD;
					
					currLikeBtnElement.setAttribute(POST_LIKE_BTN_DID_LIKE_DATA_NAME, false);
				}
				else {
					currLikeIconElement.className = "icon " + LIKED_ICON_CLASSNAME_ADD;

					currLikeBtnElement.setAttribute(POST_LIKE_BTN_DID_LIKE_DATA_NAME, true);					
				}
			}
			else
			{
				alert(resultLikesInfo.message);
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




function fillPostCommentsBlock(currPostCommentsElement, currPostId) {
	
	var currUserToken = getCookie("userToken");		

	var requestOptions = {
		method: 'GET',
		headers: {
			'Authorization':`Bearer ${currUserToken}`
		},
		redirect: 'follow'
	};
	fetch("http://localhost:3000/api/comment" + `?post_id=${currPostId}`, requestOptions)
		.then(async response => {
			var resultCommentsInfo = await response.json();
			if (response.ok)
			{		
				let a_post_comments_header = document.createElement('a');
				a_post_comments_header.className = "body-post-comments-header";
				a_post_comments_header.innerHTML = "Comments:";
				
				currPostCommentsElement.insertAdjacentElement('beforeend', a_post_comments_header);
				
				
				let div_post_single_comment;
				let p_post_single_comment_author;
				let a_post_single_comment_author;
				let textarea_post_single_comment_text;
				
				for (let commentCount = 0; commentCount < resultCommentsInfo.length; commentCount++) {
				console.log("iteration" + (commentCount + 1).toString())
					div_post_single_comment = document.createElement('div');
					div_post_single_comment.className = "body-post-single-comment-block";
					
						p_post_single_comment_author = document.createElement('p');
						
							a_post_single_comment_author = document.createElement('div');
							a_post_single_comment_author.id = POST_ID_PREFIX + `${currPostId}` + "-" + COMMENT_ID_PREFIX + `${commentCount + 1}` + COMMENT_AUTHOR_ID_POSTFIX; 
							a_post_single_comment_author.className = "body-post-single-comment-username";
							a_post_single_comment_author.setAttribute(COMMENT_AUTHOR_ID_DATA_NAME, resultCommentsInfo[commentCount].author_id);
							
								fillPostCommentAuthorLink(a_post_single_comment_author, resultCommentsInfo[commentCount].author_id);
							
						p_post_single_comment_author.insertAdjacentElement('beforeend', a_post_single_comment_author);
						
						
						textarea_post_single_comment_text = document.createElement('textarea');
						textarea_post_single_comment_text.className = "body-post-single-comment-textarea";
						textarea_post_single_comment_text.setAttribute("disabled", "disabled");
						textarea_post_single_comment_text.innerHTML = resultCommentsInfo[commentCount].text;
						
					div_post_single_comment.insertAdjacentElement('beforeend', p_post_single_comment_author);
					div_post_single_comment.insertAdjacentElement('beforeend', textarea_post_single_comment_text);
					
					
					currPostCommentsElement.insertAdjacentElement('beforeend', div_post_single_comment);
				}
			}
			else
			{
				alert(resultCommentsInfo.message);
			}
		})
		.catch(error => console.log('error', error));
}



function fillPostCommentAuthorLink(currPostCommentAuthorLinkElement, currAuthorId) {

	var currUserToken = getCookie("userToken");		

	var requestOptions = {
		method: 'GET',
		headers: {
			'Authorization':`Bearer ${currUserToken}`
		},
		redirect: 'follow'
	};

	fetch("http://localhost:3000/api/user" + `?user_id=${currAuthorId}`, requestOptions)
		.then(async response => {
			var resultUserInfo = await response.json();
			if (response.ok)
			{	
				resultUserInfo = resultUserInfo[0];

				currPostCommentAuthorLinkElement.innerHTML = resultUserInfo.nickname + ":";			
			}
			else
			{
				alert(resultUserInfo.message);
			}
		})
		.catch(error => console.log('error', error));	
}	



function onLikeBtnClick(btnId, currPostId, didLike) {

	if (didLike == "false") {
		addUserLikeToPost(btnId, currPostId);
	}
	else if (didLike == "true") {
		deleteUserLikeFromPost(btnId, currPostId);
	}
}


function addUserLikeToPost(currBtnId, currPostId) {

	currPostId = parseInt(currPostId);

	var currUserToken = getCookie("userToken");	

	var raw = `{\"post_id\": ${currPostId}}`;

	var requestOptions = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
			'Authorization':`Bearer ${currUserToken}`
		},
		body: raw,
		redirect: 'follow'
	};

	fetch("http://localhost:3000/api/like_in_post", requestOptions)
		.then(async response => {
			if (response.ok)
			{		

				var currBtnElementChildrens = document.getElementById(currBtnId).children;
				var childrenChildrens = currBtnElementChildrens[0].children;
				childrenChildrens[0].classList.add(LIKED_ICON_CLASSNAME_ADD);
				childrenChildrens[0].classList.remove(NOT_LIKED_ICON_CLASSNAME_ADD);
				
				changeLikesAmount(POST_ID_PREFIX + getPostId(currBtnId) + LIKES_AMOUNT_I_ID_POSTFIX, 1);
				document.getElementById(currBtnId).setAttribute(POST_LIKE_BTN_DID_LIKE_DATA_NAME, true);
			}
			else
			{
				var resultLikeAdd = await response.json();				
				alert(resultLikeAdd.message);
			}
		})
		.catch(error => console.log('error', error));	
}


function deleteUserLikeFromPost(currBtnId, currPostId) {

	currPostId = parseInt(currPostId);

	var currUserToken = getCookie("userToken");	

	var requestOptions = {
		method: 'DELETE',
		headers: {
			'Authorization':`Bearer ${currUserToken}`
		},
		redirect: 'follow'
	};

	fetch("http://localhost:3000/api/like_in_post" + `/${currPostId}`, requestOptions)
		.then(async response => {
			if (response.ok)
			{		

				var currBtnElementChildrens = document.getElementById(currBtnId).children;
				var childrenChildrens = currBtnElementChildrens[0].children;
				childrenChildrens[0].classList.add(NOT_LIKED_ICON_CLASSNAME_ADD);
				childrenChildrens[0].classList.remove(LIKED_ICON_CLASSNAME_ADD);
				
				changeLikesAmount(POST_ID_PREFIX + getPostId(currBtnId) + LIKES_AMOUNT_I_ID_POSTFIX, -1);
				document.getElementById(currBtnId).setAttribute(POST_LIKE_BTN_DID_LIKE_DATA_NAME, false);
			}
			else
			{
				var resultLikeDelete = await response.json();				
				alert(resultLikeDelete.message);
			}
		})
		.catch(error => console.log('error', error));	
}


function changeLikesAmount(elementId, changeValue) {
	document.getElementById(elementId).innerText = parseInt(document.getElementById(elementId).innerText) + changeValue;
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



function onCommentBtnClick(btnId) {

	var currWriteCommentBlockId = POST_ID_PREFIX + getPostId(btnId) + WRITE_COMMENT_BLOCK_ID_POSTFIX;
	changeVisibility(currWriteCommentBlockId, "flex");
}



function onWriteCommentBtnClick(btnId, currPostId) {
	
	var currPostIdNumber = getPostId(btnId);
	
	var commentTextareaElementId = POST_ID_PREFIX + currPostIdNumber.toString() + WRITE_COMMENT_TEXT_ID_POSTFIX;
	var commentText = document.getElementById(commentTextareaElementId).value;
	
	if (commentText === undefined || commentText == "") {
		alert("You need to write comment text before comment it!");
		return;
	}

	var currUserToken = getCookie("userToken");		

	var raw = `{\"post_id\": ${currPostId},\"text\": \"${commentText}\"}`;

	var requestOptions = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
			'Authorization':`Bearer ${currUserToken}`
		},
		body: raw,
		redirect: 'follow'
	};

	fetch("http://localhost:3000/api/comment", requestOptions)
		.then(async response => {
			var resultCommentAdd = await response.json();
			if (response.ok)
			{		
				onWriteCommentAddSuccess(currPostIdNumber, commentText);				
			}
			else
			{
				alert(resultCommentAdd.message);
			}
		})
		.catch(error => console.log('error', error));		
}



function onWriteCommentAddSuccess(currPostIdNumber, newCommentText) {
	
	var currPostCommentsBlockId = POST_ID_PREFIX + currPostIdNumber.toString() + COMMENTS_BLOCK_POSTFIX;
	
	div_post_single_comment = document.createElement('div');
	div_post_single_comment.className = "body-post-single-comment-block";
	
		p_post_single_comment_author = document.createElement('p');
		
			a_post_single_comment_author = document.createElement('div');
			a_post_single_comment_author.className = "body-post-single-comment-username";
			a_post_single_comment_author.innerHTML = document.getElementById(USER_ABOUT_USERNAME_LINK_ID).innerHTML;
			
		p_post_single_comment_author.insertAdjacentElement('beforeend', a_post_single_comment_author);
		
		textarea_post_single_comment_text = document.createElement('textarea');
		textarea_post_single_comment_text.className = "body-post-single-comment-textarea";
		textarea_post_single_comment_text.setAttribute("disabled", "disabled");
		textarea_post_single_comment_text.innerHTML = newCommentText;
		
	div_post_single_comment.insertAdjacentElement('beforeend', p_post_single_comment_author);
	div_post_single_comment.insertAdjacentElement('beforeend', textarea_post_single_comment_text); 
	
	document.getElementById(currPostCommentsBlockId).insertAdjacentElement('beforeend', div_post_single_comment);
}


function getPostId(elementId) {
	
	var arrayOfStrings = elementId.split(ALL_ID_NAMES_SEPARATOR);
	var postId = arrayOfStrings[0].slice(POST_ID_PREFIX.length);
	
	return postId;
}


function getCookie(name) {
	
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
