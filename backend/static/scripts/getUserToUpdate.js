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
                formData += '<label>Name</label><br>';
                formData += '<input name="name" value="'+value.name+'" class="field" /><br><br>';
                formData += '<label>Surname</label><br>';
                formData += '<input name="surname" value="'+value.surname+'" class="field" /><br><br>';
                formData += '<label>Nickname</label><br>';
                formData += '<input name="nickname" value="'+value.nickname+'" class="field" /><br><br>';
                formData += '<label>Email</label><br>';
                formData += '<input name="email" type="email" value="'+value.email+'"  class="field" /><br><br>';
                formData += '<label>Password</label><br>';
                formData += '<input name="password" type="password" value=""  class="field" /><br><br>';
            })
            $('#'+form+'').append(formData);

        },
        error: function(xhr) { // Данные не отправлены
            alert($.parseJSON(xhr.responseText).message);
        }
    });
}