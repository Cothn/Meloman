
(function ($) {
    "use strict";


    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit',function(){
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }
		
		var userNickname = $.trim($('#username').val());
		var userEmail = $.trim($('#email').val());
		var userPassword = $.trim($('#password').val());
	
 		var user = {"nickname": userNickname,"email": userEmail,"password": userPassword}
		var raw = `{\"nickname\": \"${userNickname}\",\"email\": \"${userEmail}\",\"password\": \"${userPassword}\"}`


		if (!check) {
			alert("Wrong input")
			return check
 		}
 		 
/* 		alert("We're passed") 
		alert(raw); */
	
        var requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:3000/api/user/register", requestOptions)
            .then(async response => {
                var result = await response.json();
                if (response.ok)
                {
                    alert(result.insert_id);
                    window.location.href = '/view/user';
                }
                else
                {
                    alert(result.message);
                }
            })
            .catch(error => console.log('error', error));
	
/* --------------------------------------------------------------------------
below works */


/* 		var requestOptions = {
		  method: 'POST',
		  headers: { 'Content-Type': 'application/json;charset=utf-8' },
		  body: raw,
		  redirect: 'follow'
		};

		var errorFlag = false;

        fetch("http://localhost:3000/api/user/register", requestOptions)
            .then(response => {
                if(response.ok){
                    response.json();}
                else{
                    throw new Error(response.json());
                }
            })
            .then(result => {
                alert("Success register!");
                window.location.href = '/view/user';
            })
            .catch(error => alert("Shit")); */
		  
/* ------------------------------------------------------------------------- */
		  
		  
/* 		alert(errorFlag);  
		  
		if (errorFlag) {
			alert("User with such info already exist")
		} */
/* 		else {
			alert("Before redirect")
			window.location.href = "/view/user";
		}	 */		
		  
/* 		alert(errorFlag)   */
		
		
		/* 		$.ajax({
        url:     "/api/user/register", //url страницы
        type:     "POST", //метод отправки
        //dataType: "json", //формат данных
        data: $(user).serialize(),  // Сеарилизуем объект
        success: function(data, status) { //Данные отправлены успешно
            //result = data;
            //alert(status);
            window.location.href = "/view/user";

        },
        error: function(xhr) { // Данные не отправлены
            alert($.parseJSON(xhr.responseText).message);
        }

		});  */

		/*  		let response = await fetch('/api/user/register', { method: 'POST', headers: { 'Content-Type': 'application/json;charset=utf-8' }, body: JSON.stringify(user) });  */  
		  
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