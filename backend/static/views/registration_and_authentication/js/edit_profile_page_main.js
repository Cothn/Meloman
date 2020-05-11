
const selectUserMainTrackIdName = "choose-user-main-track-list";
const selectUserMainTrackClassName = "choose-user-main-track-list";

const CHOOSE_PLAYLIST_TRACKS_OPTION_TRACK_URL_DATA_NAME = "data-trackUrl";

function onEditProfileLoad(afterWhichElementId, playerId) {

	var currUserToken = getCookie("userToken");
	
	var requestOptions = {
		method: 'GET',
		headers: {
			'Authorization':`Bearer ${currUserToken}`
		},
		redirect: 'follow'
	};

	fetch("http://localhost:3000/api/track/my", requestOptions)
		.then(async response => {
			var result = await response.json();
			if (response.ok) {
				
				let select_choose_user_main_track_tracks_list = document.createElement('select');
				select_choose_user_main_track_tracks_list.id = selectUserMainTrackIdName;
				select_choose_user_main_track_tracks_list.className = selectUserMainTrackClassName;
				select_choose_user_main_track_tracks_list.setAttribute("size", "10");
				
				select_choose_user_main_track_tracks_list.onchange = function() {
					startMusic(playerId);
				};				
				
					for (let item of result)
					{
					    var newOption = document.createElement("option");
					    newOption.value = item.id;
					    newOption.innerHTML = item.title;
						newOption.setAttribute(CHOOSE_PLAYLIST_TRACKS_OPTION_TRACK_URL_DATA_NAME, item.music_url);					   

					    select_choose_user_main_track_tracks_list.insertAdjacentElement('beforeend', newOption);
					}
					
				document.getElementById(afterWhichElementId).insertAdjacentElement('afterend', select_choose_user_main_track_tracks_list);
				
				fillInputs(playerId);
			}
			else
			{
				alert(result.message);
			}
		})
		.catch(error => console.log('error', error));
}


function fillInputs(playerId) {
	
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
				document.getElementById("username").value = resultUser.nickname;
				document.getElementById("email").value = resultUser.email;
				document.getElementById("first-name").value = resultUser.name;
				document.getElementById("last-name").value = resultUser.surname;
				
				if (resultUser.music_avatar_id !== undefined && resultUser.music_avatar_id != null) {
				
					let currSelectTracks = document.getElementById(selectUserMainTrackIdName);
					
					for (var item of currSelectTracks.children) {
						if (item.value == resultUser.music_avatar_id) {
							item.setAttribute("selected", "selected");

							document.getElementById(playerId).src = item.getAttribute(CHOOSE_PLAYLIST_TRACKS_OPTION_TRACK_URL_DATA_NAME);
							document.getElementById(playerId).play();
						}
					}
				}
			}
			else
			{
				alert(resultUser.message);
			}
		})
		.catch(error => console.log('error', error));		
}


function startMusic(playerId) {

	var playerElement = document.getElementById(playerId);
	
	var selectTrackElement = document.getElementById(selectUserMainTrackIdName);
	var newTrackUrl = selectTrackElement.options[selectTrackElement.selectedIndex].getAttribute(CHOOSE_PLAYLIST_TRACKS_OPTION_TRACK_URL_DATA_NAME);
	console.log(newTrackUrl);
	playerElement.src = newTrackUrl;
	playerElement.play();
}



(function ($) {
    "use strict";


    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

	$('#edit-profile-btn').on('click',function(){

        var check = true;
console.log(input);
        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }
		
		if (!check) {
/* 			alert("Wrong input"); */
			return check;
 		}
		
		var userNickname = $.trim($('#username').val());
		var userEmail = $.trim($('#email').val());
		var userName = $.trim($('#first-name').val());
		var userSurname = $.trim($('#last-name').val());
		var userPassword = $.trim($('#password').val());
		var userConfirmPassword = $.trim($('#confirm-password').val());
	
		if (!(userPassword === userConfirmPassword))
		{
			return check;
		}
	
		let selectUserMainTrackListElement = document.getElementById(selectUserMainTrackIdName);
		
		let trackId;
		console.log(selectUserMainTrackListElement.selectedIndex);
		if (selectUserMainTrackListElement.selectedIndex === undefined || selectUserMainTrackListElement.selectedIndex == null || selectUserMainTrackListElement.selectedIndex == -1) {
			trackId = null;
		}
		else {
			trackId = selectUserMainTrackListElement.options[selectUserMainTrackListElement.selectedIndex].value;
		}

		var raw = `{\"nickname\": \"${userNickname}\", \"email\": \"${userEmail}\", \"password\": \"${userPassword}\"`;
	
		if (userName !== undefined && userName != "") {
			raw += `,\"name\": \"${userName}\"`;
		}

		if (userSurname !== undefined && userSurname != "") {
			raw += `,\"surname\": \"${userSurname}\"`;
		}	
	
		if (trackId !== undefined && trackId != null) {
			raw += `,\"music_avatar_id\": ${trackId}`
		}		

		raw += "}";

		var currUserToken = getCookie("userToken");	

        var requestOptions = {
            method: 'PUT',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
				'Authorization':`Bearer ${currUserToken}`
			},
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:3000/api/user", requestOptions)
            .then(async response => {
                if (response.ok)
                {				
                    window.location.href = '/view/user';
                }
                else
                {
					var result = await response.json();					
                    alert(result.message);
                }
            })
            .catch(error => console.log('error', error));
		  
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    
    

})(jQuery);


function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
