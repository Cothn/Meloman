
const MAIN_PLAYER_ID = "main-player";

const TEST_URL = "audio/test.mp3"

const TRACK_URL_DATA_NAME = "data-trackURL";
const TRACK_IS_LAST_DATA_NAME = "data-isLast";
const TRACK_NEXT_TRACK_DATA_NAME = "data-nextTrackId";

const COMMENT_AUTHOR_ID_DATA_NAME = "data-authorId";

const POST_ID_PREFIX = "post";
const PLAYLIST_ID_PREFIX = "playlist";
const TRACK_ID_PREFIX = "track";
const COMMENT_ID_PREFIX = "comment";

const LIKE_HOT_BUTTON_ID_POSTFIX = "-like-btn"; // post1-like-btn
const FAVORITES_HOT_BUTTON_ID_POSTFIX = "-favorites-btn"; // post1-favorites-btn
const COMMENT_HOT_BUTTON_ID_POSTFIX = "-comment-btn"; // post1-comment-btn

const WRITE_COMMENT_TEXT_ID_POSTFIX = "-write-comment-text"; // post1-write-comment-text
const WRITE_COMMENT_BTN_ID_POSTFIX = "-write-comment-btn"; // post1-write-comment-btn

const COMMENT_AUTHOR_ID_POSTFIX = "-author"; // post1-comment1-author

const TRACK_TITLE_SEPARATOR = " - ";

var allPostsInfo;


function onUserPageLoad(afterWhichDivId) {
	
	var currUserToken = getCookie("userToken");	

	var requestOptions = {
		method: 'GET',
		headers: {
			'Authorization':`Bearer ${currUserToken}`
		},
		redirect: 'follow'
	};

	fetch("http://localhost:3000/api/post", requestOptions)
		.then(async response => {
			var resultPosts = await response.json();
			if (response.ok)
			{
				allPostsInfo = {postsElements: [], postTracksCounters: [], postsAmount: resultPosts.length};
				
				for (var i = 0; i < resultPosts.length; i++) {
					var newPostElement = document.createElement('div');
					newPostElement.id = POST_ID_PREFIX + `${i + 1}`;
					newPostElement.className = "limiter body-main";
					
					document.getElementById(afterWhichDivId).insertAdjacentElement('beforebegin', newPostElement);	
					
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
				
						fillUsernameBlock(div_post_username_block, currPlaylist.author_id);
					
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
								a_playlist_name_link.className = "body-playlist-name-link";
								a_playlist_name_link.innerHTML = currPlaylist.title;
								
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
					
						fillPostButtonsBlock(div_post_buttons_block, currPost.id);
					
					var hr_post_block_body_third = document.createElement('hr');
					hr_post_block_body_third.className = "hr-body";					
					
					var div_post_comments_block = document.createElement('div');
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



function fillUsernameBlock(currUsernameElement, userId) {

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
				a_post_username_link.id = resultUserInfo.id;
				a_post_username_link.className = "body-post-username-link";
				a_post_username_link.innerHTML = resultUserInfo.nickname;
	
				currUsernameElement.insertAdjacentElement('beforeend', a_post_username_link);				
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
				
				var currDivTrackBlockId = POST_ID_PREFIX + (postNumber + 1).toString() + "-" + "track" + allPostsInfo.postTracksCounters[postNumber].toString() + "-" + "block";
				
				var div_track_block = document.createElement('div');
				div_track_block.id = currDivTrackBlockId;
				div_track_block.className = "body-playlist-single-track-block";
				
				
					var div_track_btn_block = document.createElement('div');
					div_track_btn_block.className = "body-playlist-single-track-btn";
					
						var a_btn_link = document.createElement('a');
						
						var newTrackId = POST_ID_PREFIX + (postNumber + 1).toString() + "-" + "track" + allPostsInfo.postTracksCounters[postNumber].toString();
						var nextTrackId = POST_ID_PREFIX + (postNumber + 1).toString() + "-" + "track" + (allPostsInfo.postTracksCounters[postNumber] + 1).toString();
						
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



function fillPostButtonsBlock(currPostButtonsElement, currPostId) {
	
	var currUserToken = getCookie("userToken");		

	var requestOptions = {
		method: 'GET',
		headers: {
			'Authorization':`Bearer ${currUserToken}`
		},
		redirect: 'follow'
	};
console.log("Likes try to get");
	fetch("http://localhost:3000/api/like_in_post" + `/${currPostId}`, requestOptions)
		.then(async response => {
			var resultLikesInfo = await response.json();
			if (response.ok)
			{	
		console.log("Likes getted");
		console.log(resultLikesInfo);
				let div_post_hot_button_like_block = document.createElement('div');
				div_post_hot_button_like_block.className = "body-post-hot-button-block";
		
					let a_post_hot_button_like_btn = document.createElement('a');
					a_post_hot_button_like_btn.id = POST_ID_PREFIX + `${currPostId}` + LIKE_HOT_BUTTON_ID_POSTFIX;

						let span_like_btn = document.createElement('span');
						span_like_btn.className = "btn action";
					
							let icon_like_btn = document.createElement('i');
							icon_like_btn.className = "icon post-like-btn";
							
						span_like_btn.insertAdjacentElement('beforeend', icon_like_btn);
						
					a_post_hot_button_like_btn.insertAdjacentElement('beforeend', span_like_btn);
					
				div_post_hot_button_like_block.insertAdjacentElement('beforeend', a_post_hot_button_like_btn);
	
				
				let div_post_hot_button_likes_amount_block = document.createElement('div');
				div_post_hot_button_likes_amount_block.className = "body-post-likes-amount-block";
				
					let i_likes_amount = document.createElement('i');
					i_likes_amount.innerHTML = `${resultLikesInfo.length}`;				
		
				div_post_hot_button_likes_amount_block.insertAdjacentElement('beforeend', i_likes_amount);
		
		
				let div_post_hot_button_favorites_block = document.createElement('div');
				div_post_hot_button_favorites_block.className = "body-post-hot-button-block";
		
					let a_post_hot_button_favorites_btn = document.createElement('a');
					a_post_hot_button_favorites_btn.id = POST_ID_PREFIX + `${currPostId}` + FAVORITES_HOT_BUTTON_ID_POSTFIX;

						let span_favorites_btn = document.createElement('span');
						span_favorites_btn.className = "btn action";
					
							let icon_favorites_btn = document.createElement('i');
							icon_favorites_btn.className = "icon post-favorites-btn";
							
						span_favorites_btn.insertAdjacentElement('beforeend', icon_favorites_btn);
						
					a_post_hot_button_favorites_btn.insertAdjacentElement('beforeend', span_favorites_btn);
					
				div_post_hot_button_favorites_block.insertAdjacentElement('beforeend', a_post_hot_button_favorites_btn);		
		
		
				let div_post_hot_button_comment_block = document.createElement('div');
				div_post_hot_button_comment_block.className = "body-post-hot-button-block";
		
					let a_post_hot_button_comment_btn = document.createElement('a');
					a_post_hot_button_comment_btn.id = POST_ID_PREFIX + `${currPostId}` + COMMENT_HOT_BUTTON_ID_POSTFIX;

						let span_comment_btn = document.createElement('span');
						span_comment_btn.className = "btn action";
					
							let icon_comment_btn = document.createElement('i');
							icon_comment_btn.className = "icon post-comment-btn";
							
						span_comment_btn.insertAdjacentElement('beforeend', icon_comment_btn);
						
					a_post_hot_button_comment_btn.insertAdjacentElement('beforeend', span_comment_btn);
					
				div_post_hot_button_comment_block.insertAdjacentElement('beforeend', a_post_hot_button_comment_btn);		
		
		
				let div_post_write_comment_block = document.createElement('div');
				div_post_write_comment_block.className = "body-post-write-comment-block";
				
					let div_post_write_comment_text_block = document.createElement('div');
					div_post_write_comment_text_block.className = "body-post-write-comment-text-block";
					
						let textarea_write_comment_text = document.createElement('textarea');
						textarea_write_comment_text.id = POST_ID_PREFIX + `${currPostId}` + WRITE_COMMENT_TEXT_ID_POSTFIX;
						textarea_write_comment_text.className = "body-post-write-comment-text";
						
					div_post_write_comment_text_block.insertAdjacentElement('beforeend', textarea_write_comment_text);
					
					
					let div_post_write_comment_btn_block = document.createElement('div');
					div_post_write_comment_btn_block.className = "body-post-write-comment-btn-block";
					
						let button_write_comment_btn = document.createElement('button');
						button_write_comment_btn.id = POST_ID_PREFIX + `${currPostId}` + WRITE_COMMENT_BTN_ID_POSTFIX;
						button_write_comment_btn.className = "login100-form-btn write-comment-button";
						button_write_comment_btn.innerHTML = "Comment";
	
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



function fillPostCommentsBlock(currPostCommentsElement, currPostId) {
	
	var currUserToken = getCookie("userToken");		
console.log("fillPostCommentAuthorLink start");
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
console.log("fillPostCommentAuthorLink enter");	
console.log(resultCommentsInfo);			
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
console.log("fillPostCommentAuthorLink start");
console.log(currPostCommentAuthorLinkElement);
console.log(currAuthorId);
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
		console.log("fillPostCommentAuthorLink enter");
		console.log(resultUserInfo);
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



function getCookie(name) {
	
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
