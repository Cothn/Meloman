
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
	
		var raw = `{\"nickname\": \"${userNickname}\",\"email\": \"${userEmail}\",\"password\": \"${userPassword}\"}`

		if (!check) {
			alert("Wrong input")
			return check
 		}
 		
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
                    window.location.href = '/view/user';
                }
                else
                {
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