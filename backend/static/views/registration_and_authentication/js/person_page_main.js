
const HEADER_USERNAME_LINK_ID = "header-username";
const BODY_USER_EDIT_LINK_ID = "body-user-edit-link";
const MAIN_PLAYER_ID = "main-player";

const TEST_URL = "audio/test.mp3"


const USER_ABOUT_USERNAME_LINK_ID = "body-user-about-username";
const USER_ABOUT_NAME_SURNAME_LINK_ID = "body-user-about-roles";
const USER_ABOUT_BIOGRAPHY_LINK_ID = "body-user-about-biography";
const USER_ABOUT_DATE_LINK_ID = "body-user-about-date";
const USER_ABOUT_NATIONALITY_LINK_ID = "body-user-about-nationality";
const USER_ABOUT_LANGUAGES_LINK_ID = "body-user-about-languages";

const TRACK_URL_DATA_NAME = "data-trackURL";
const TRACK_IS_LAST_DATA_NAME = "data-isLast";
const TRACK_NEXT_TRACK_DATA_NAME = "data-nextTrackId";

const POST_USERNAME_AUTHOR_ID_DATA_NAME = "data-authorId";

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



function onPersonPageLoad(afterWhichDivId, userQuickButtonsBlockId) {

	var urlParams = new URLSearchParams(window.location.search);
	var personId = urlParams.get('person_id');

	var currUserToken = getCookie("userToken");
	if (personId === undefined || personId == null || personId == "") {
		window.location.href = '/view/user';
	}

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
				changeVisibility(userQuickButtonsBlockId, "block");
				fillPersonAboutBlock(personId);

				var userIdForPosts = resultUser.id;

				onPersonGroups('group-main-block');
				onPersonAlbums('album-main-block');
				onPersonSingles('single-main-block');
				//loadAllUserPosts(userIdForPosts, afterWhichDivId);
			}				
			else
			{
				alert(resultUser.message);
			}
		})
		.catch(error => console.log('error', error));
}


function fillPersonAboutBlock(personId) {
	
	var currUserToken = getCookie("userToken");	

	var requestOptions = {
		method: 'GET',
		headers: {
			'Authorization':`Bearer ${currUserToken}`
		},
		redirect: 'follow'
	};

	fetch("http://localhost:3000/api/person" + `?person_id=${personId}`, requestOptions)
		.then(async response => {
			var resultPerson = await response.json();
			if (response.ok)
			{	

				resultPerson = resultPerson[0];
				var personSurname = resultPerson.surname;
				if (personSurname == null){
					personSurname = "";
				}

				if(resultPerson.nickname != null){
					document.getElementById(USER_ABOUT_USERNAME_LINK_ID).innerHTML =
						resultPerson.name + " <" + resultPerson.nickname + "> "  + personSurname;
				}
				else{
					document.getElementById(USER_ABOUT_USERNAME_LINK_ID).innerHTML =
						resultPerson.name + " " + personSurname;
				}

				document.getElementById(BODY_USER_EDIT_LINK_ID).setAttribute("hidden", "hidden");

//nationality
				fetch("http://localhost:3000/api/countrie" + `?id=${resultPerson.countrie_id}`, requestOptions)
					.then(async response => {
						var resultCountrie = await response.json();
						if (response.ok)
						{
							//document.getElementById(USER_ABOUT_NAME_SURNAME_LINK_ID).innerHTML =resultRole[0];
							document.getElementById(USER_ABOUT_NATIONALITY_LINK_ID).innerHTML +=
								resultCountrie[0].title + ".";

						}
						else
						{
							alert(resultPerson.message);
						}
					})
					.catch(error => console.log('error', error));

				//languages
				fetch("http://localhost:3000/api/person/languages/" + `${personId}`, requestOptions)
					.then(async response => {
						var resultLanguages = await response.json();
						if (response.ok)
						{


							resultLanguages.forEach(personLanguage =>{


								fetch("http://localhost:3000/api/language" + `?id=${personLanguage.languages_id}`, requestOptions)
									.then(async response => {
										var resultLanguage = await response.json();
										if (response.ok)
										{
											//document.getElementById(USER_ABOUT_NAME_SURNAME_LINK_ID).innerHTML =resultRole[0];
											document.getElementById(USER_ABOUT_LANGUAGES_LINK_ID).innerHTML +=
												" "+resultLanguage[0].title+" |";

										}
										else
										{
											alert(resultPerson.message);
										}
									})
									.catch(error => console.log('error', error));

							});

						}
						else
						{
							alert(resultPerson.message);
						}
					})
					.catch(error => console.log('error', error));

//roles
				fetch("http://localhost:3000/api/person/roles/" + `${personId}`, requestOptions)
					.then(async response => {
						var resultRoles = await response.json();
						if (response.ok)
						{


							resultRoles.forEach(personRole =>{


								fetch("http://localhost:3000/api/person/role" + `?id=${personRole.person_roles_id}`, requestOptions)
									.then(async response => {
										var resultRole = await response.json();
										if (response.ok)
										{
											//document.getElementById(USER_ABOUT_NAME_SURNAME_LINK_ID).innerHTML =resultRole[0];
											document.getElementById(USER_ABOUT_NAME_SURNAME_LINK_ID).innerHTML +=
												" "+resultRole[0].title+" |";

										}
										else
										{
											alert(resultPerson.message);
										}
									})
									.catch(error => console.log('error', error));

							});

						}
						else
						{
							alert(resultPerson.message);
						}
					})
					.catch(error => console.log('error', error));

				var birthDate = new Date(resultPerson.birth_date);
				document.getElementById(USER_ABOUT_DATE_LINK_ID).innerHTML +=
					"Birth date: "+ birthDate.getDate()+"."+ birthDate.getMonth()+"."
					+ birthDate.getFullYear()+".<br>";

				if(resultPerson.die_date != null){
					var dieDate = new Date(resultPerson.die_date);
					document.getElementById(USER_ABOUT_DATE_LINK_ID).innerHTML +=
						"Date of death: "+ dieDate.getDate()+"."+ dieDate.getMonth()+"."
						+ dieDate.getFullYear()+".<br>";
				}
				document.getElementById(USER_ABOUT_BIOGRAPHY_LINK_ID).innerHTML = "   "+
					resultPerson.biography+"<br>";
			}				
			else
			{
				alert(resultPerson.message);
			}
		})
		.catch(error => console.log('error', error));
}

function onPersonSingles(postDivId) {
	var urlParams = new URLSearchParams(window.location.search);
	var personId = urlParams.get('person_id');

	let afterWhichDivId = "singles-block";
	document.getElementById(afterWhichDivId).remove();
	let trackBlock = document.createElement("div");
	trackBlock.id = afterWhichDivId ;
	trackBlock.class = afterWhichDivId ;
	document.getElementById(postDivId).insertAdjacentElement('beforeend', trackBlock);

	var currUserToken = getCookie("userToken");


	var requestOptions = {
		method: 'GET',
		headers: {
			'Authorization':`Bearer ${currUserToken}`
		},
		redirect: 'follow'
	};

	fetch("http://localhost:3000/api/person/singles/"+personId, requestOptions)
		.then(async response => {
			var result = await response.json();
			if (response.ok)
			{

				result.forEach(personGroupe =>{

					//document.getElementById(USER_ABOUT_NAME_SURNAME_LINK_ID).innerHTML =personGroupe.singles_id;
					fetch("http://localhost:3000/api/single" + `?single_id=${personGroupe.singles_id}`, requestOptions)
						.then(async response => {
							var result = await response.json();
							if (response.ok)
							{
								//document.getElementById(USER_ABOUT_NAME_SURNAME_LINK_ID).innerHTML =result[0];
								//document.getElementById(USER_ABOUT_NAME_SURNAME_LINK_ID).innerHTML +=
								//	" "+resultRole[0].title+" |";


								var currGroupId = result[0].id;
								var currGroupTitle = result[0].title;
								var currGroupBirth = new Date(result[0].release_date);
								var currGroupDie = new Date(result[0].die_date);
								if (!currGroupDie) {
									currGroupDie="";
								}

								var currDivGroupBlockId = "single" + (currGroupId).toString() + "-" + "block";

								var div_user_block = document.createElement('div');
								div_user_block.id = currDivGroupBlockId;
								div_user_block.className = "body-post-block";

								var a_single_title = document.createElement('a');
								a_single_title.className = "body-users-search-username-link";
								a_single_title.href = "/view/single?single_id=" + currGroupId;
								a_single_title.innerHTML = `<b>${currGroupTitle}</b>`;
								a_single_title.setAttribute("style", "padding-left: 2%;");

								var hr_body_first = document.createElement('hr');
								hr_body_first.className = "hr-body";

								var p_single_birth = document.createElement('pre');
								p_single_birth.innerHTML = "Creations date: " + `${currGroupBirth.getDay()}`
									+`.${currGroupBirth.getMonth()}`+`.${currGroupBirth.getFullYear()}`;
								p_single_birth.setAttribute("style", "margin-top: 1%; margin-left: 1%");

								var p_single_die = document.createElement('pre');
								p_single_die.innerHTML = "Death date: " + `${currGroupDie.getDay()}`
									+`.${currGroupDie.getMonth()}`+`.${currGroupDie.getFullYear()}`;
								p_single_die.setAttribute("style", "margin-left: 1%");

								var hr_post_block_end = document.createElement('hr');
								hr_post_block_end.className = "hr-body-end";

								var hr_post_block_start = document.createElement('hr');
								hr_post_block_start.className = "hr-body-start";

								div_user_block.insertAdjacentElement('beforeend', hr_post_block_start);
								div_user_block.insertAdjacentElement('beforeend', a_single_title);
								div_user_block.insertAdjacentElement('beforeend', hr_body_first);
								div_user_block.insertAdjacentElement('beforeend', p_single_birth);

								if (result[0].die_date) {
									div_user_block.insertAdjacentElement('beforeend', p_single_die);
								}

								//div_user_block.insertAdjacentElement('beforeend', hr_post_block_end);


								document.getElementById(afterWhichDivId).insertAdjacentElement('beforeend', div_user_block);



							}
							else
							{
								alert(resultPerson.message);
							}
						})
						.catch(error => console.log('error', error));

				});



			}
			else
			{
				alert(result.message);
			}
		})
		.catch(error => console.log('error', error));
}


function onPersonAlbums(postDivId) {
	var urlParams = new URLSearchParams(window.location.search);
	var personId = urlParams.get('person_id');

	let afterWhichDivId = "albums-block";
	document.getElementById(afterWhichDivId).remove();
	let trackBlock = document.createElement("div");
	trackBlock.id = afterWhichDivId ;
	trackBlock.class = afterWhichDivId ;
	document.getElementById(postDivId).insertAdjacentElement('beforeend', trackBlock);

	var currUserToken = getCookie("userToken");


	var requestOptions = {
		method: 'GET',
		headers: {
			'Authorization':`Bearer ${currUserToken}`
		},
		redirect: 'follow'
	};

	fetch("http://localhost:3000/api/person/albums/"+personId, requestOptions)
		.then(async response => {
			var result = await response.json();
			if (response.ok)
			{

				result.forEach(personGroupe =>{

					//document.getElementById(USER_ABOUT_NAME_SURNAME_LINK_ID).innerHTML =personGroupe.albums_id;
					fetch("http://localhost:3000/api/album" + `?album_id=${personGroupe.albums_id}`, requestOptions)
						.then(async response => {
							var result = await response.json();
							if (response.ok)
							{
								//document.getElementById(USER_ABOUT_NAME_SURNAME_LINK_ID).innerHTML =result[0];
								//document.getElementById(USER_ABOUT_NAME_SURNAME_LINK_ID).innerHTML +=
								//	" "+resultRole[0].title+" |";


								var currGroupId = result[0].id;
								var currGroupTitle = result[0].title;
								var currGroupBirth = new Date(result[0].release_date);
								var currGroupDie = new Date(result[0].die_date);
								if (!currGroupDie) {
									currGroupDie="";
								}

								var currDivGroupBlockId = "album" + (currGroupId).toString() + "-" + "block";

								var div_user_block = document.createElement('div');
								div_user_block.id = currDivGroupBlockId;
								div_user_block.className = "body-post-block";

								var a_album_title = document.createElement('a');
								a_album_title.className = "body-users-search-username-link";
								a_album_title.href = "/view/album?album_id=" + currGroupId;
								a_album_title.innerHTML = `<b>${currGroupTitle}</b>`;
								a_album_title.setAttribute("style", "padding-left: 2%;");

								var hr_body_first = document.createElement('hr');
								hr_body_first.className = "hr-body";

								var p_album_birth = document.createElement('pre');
								p_album_birth.innerHTML = "Creations date: " + `${currGroupBirth.getDay()}`
									+`.${currGroupBirth.getMonth()}`+`.${currGroupBirth.getFullYear()}`;
								p_album_birth.setAttribute("style", "margin-top: 1%; margin-left: 1%");

								var p_album_die = document.createElement('pre');
								p_album_die.innerHTML = "Death date: " + `${currGroupDie.getDay()}`
									+`.${currGroupDie.getMonth()}`+`.${currGroupDie.getFullYear()}`;
								p_album_die.setAttribute("style", "margin-left: 1%");

								var hr_post_block_end = document.createElement('hr');
								hr_post_block_end.className = "hr-body-end";

								var hr_post_block_start = document.createElement('hr');
								hr_post_block_start.className = "hr-body-start";

								div_user_block.insertAdjacentElement('beforeend', hr_post_block_start);
								div_user_block.insertAdjacentElement('beforeend', a_album_title);
								div_user_block.insertAdjacentElement('beforeend', hr_body_first);
								div_user_block.insertAdjacentElement('beforeend', p_album_birth);

								if (result[0].die_date) {
									div_user_block.insertAdjacentElement('beforeend', p_album_die);
								}

								//div_user_block.insertAdjacentElement('beforeend', hr_post_block_end);


								document.getElementById(afterWhichDivId).insertAdjacentElement('beforeend', div_user_block);



							}
							else
							{
								alert(resultPerson.message);
							}
						})
						.catch(error => console.log('error', error));

				});



			}
			else
			{
				alert(result.message);
			}
		})
		.catch(error => console.log('error', error));
}

function onPersonGroups(postDivId) {
	var urlParams = new URLSearchParams(window.location.search);
	var personId = urlParams.get('person_id');

	let afterWhichDivId = "groups-block";
	document.getElementById(afterWhichDivId).remove();
	let trackBlock = document.createElement("div");
	trackBlock.id = afterWhichDivId ;
	trackBlock.class = afterWhichDivId ;
	document.getElementById(postDivId).insertAdjacentElement('beforeend', trackBlock);

	var currUserToken = getCookie("userToken");


	var requestOptions = {
		method: 'GET',
		headers: {
			'Authorization':`Bearer ${currUserToken}`
		},
		redirect: 'follow'
	};

	fetch("http://localhost:3000/api/person/groups/"+personId, requestOptions)
		.then(async response => {
			var result = await response.json();
			if (response.ok)
			{

				result.forEach(personGroupe =>{

					//document.getElementById(USER_ABOUT_NAME_SURNAME_LINK_ID).innerHTML =personGroupe.groups_id;
					fetch("http://localhost:3000/api/group" + `?group_id=${personGroupe.groups_id}`, requestOptions)
						.then(async response => {
							var result = await response.json();
							if (response.ok)
							{
								//document.getElementById(USER_ABOUT_NAME_SURNAME_LINK_ID).innerHTML =result[0];
								//document.getElementById(USER_ABOUT_NAME_SURNAME_LINK_ID).innerHTML +=
								//	" "+resultRole[0].title+" |";


								var currGroupId = result[0].id;
								var currGroupTitle = result[0].title;
								var currGroupBirth = new Date(result[0].birth_date);
								var currGroupDie = new Date(result[0].die_date);
								if (!currGroupDie) {
									currGroupDie="";
								}

								var currDivGroupBlockId = "group" + (currGroupId).toString() + "-" + "block";

								var div_user_block = document.createElement('div');
								div_user_block.id = currDivGroupBlockId;
								div_user_block.className = "body-post-block";

								var a_group_title = document.createElement('a');
								a_group_title.className = "body-users-search-username-link";
								a_group_title.href = "/view/group?group_id=" + currGroupId;
								a_group_title.innerHTML = `<b>${currGroupTitle}</b>`;
								a_group_title.setAttribute("style", "padding-left: 2%;");

								var hr_body_first = document.createElement('hr');
								hr_body_first.className = "hr-body";

								var p_group_birth = document.createElement('pre');
								p_group_birth.innerHTML = "Creations date: " + `${currGroupBirth.getDay()}`
									+`.${currGroupBirth.getMonth()}`+`.${currGroupBirth.getFullYear()}`;
								p_group_birth.setAttribute("style", "margin-top: 1%; margin-left: 1%");

								var p_group_die = document.createElement('pre');
								p_group_die.innerHTML = "Death date: " + `${currGroupDie.getDay()}`
									+`.${currGroupDie.getMonth()}`+`.${currGroupDie.getFullYear()}`;
								p_group_die.setAttribute("style", "margin-left: 1%");
								
								var hr_post_block_end = document.createElement('hr');
								hr_post_block_end.className = "hr-body-end";

								var hr_post_block_start = document.createElement('hr');
								hr_post_block_start.className = "hr-body-start";

								div_user_block.insertAdjacentElement('beforeend', hr_post_block_start);
								div_user_block.insertAdjacentElement('beforeend', a_group_title);
								div_user_block.insertAdjacentElement('beforeend', hr_body_first);
								div_user_block.insertAdjacentElement('beforeend', p_group_birth);

								if (result[0].die_date) {
									div_user_block.insertAdjacentElement('beforeend', p_group_die);
								}

								//div_user_block.insertAdjacentElement('beforeend', hr_post_block_end);


								document.getElementById(afterWhichDivId).insertAdjacentElement('beforeend', div_user_block);



							}
							else
							{
								alert(resultPerson.message);
							}
						})
						.catch(error => console.log('error', error));

				});



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
