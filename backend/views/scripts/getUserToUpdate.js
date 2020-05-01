function getUserToUpdate (form, id){
    $.ajax({
        url:     "/api/user/"+id+"", //url страницы
        type:     "GET", //метод отправки
        dataType: "json", //формат данных
        success: function (data)
        {
            var formData = '';
            $.each(data, function (key, value) {

                formData += '<input type="hidden" name="id" value="'+value.id+'" />';
                formData += '<label>Nickname</label><br>';
                formData += '<input name="nickname" value="'+value.nickname+' " class="field" /><br><br>';
                formData += '<label>Login</label><br>';
                formData += '<input name="login" type="email" value="'+value.login+'"  class="field" /><br><br>';
                formData +=  '<label>Password</label><br>';
                formData += '<input name="password" type="password" value="'+value.password+'"  class="field" /><br><br>';
            })
            $('#'+form+'').append(formData);

        },
        error: function(xhr) { // Данные не отправлены
            alert($.parseJSON(xhr.responseText).message);
        }
    });
}