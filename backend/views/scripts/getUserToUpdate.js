function getUserToUpdate (form, id){

    $.get("/api/users/get/"+id+"",
        function (data)
        {

            if (data.status)
            {
                var formData = '';
                $.each(data.db_data, function (key, value) {

                    formData += '<input type="hidden" name="id" value="'+value.id+'" />';
                    formData += '<label>Nickname</label><br>';
                    formData += '<input name="nickname" value="'+value.nickname+' " class="field" /><br><br>';
                    formData += '<label>Login</label><br>';
                    formData += '<input name="login" type="email" value="'+value.login+'"  class="field" /><br><br>';
                    formData +=  '<label>Password</label><br>';
                    formData += '<input name="password" type="password" value="'+value.password+'"  class="field" /><br><br>';
                })
                $('#'+form+'').append(formData);
            }
            else{
                alert(data.dbresp);}
        }
    );
}