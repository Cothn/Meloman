function sendAjaxForm(form, url, redirect_url, type) {
    $.ajax({
        url:     url, //url страницы
        type:     type, //метод отправки
        //dataType: "json", //формат данных
        data: $("#"+form).serialize(),  // Сеарилизуем объект
        success: function(data, status) { //Данные отправлены успешно
            //result = data;
            //alert(status);
            window.location.href = redirect_url;

        },
        error: function(xhr) { // Данные не отправлены
            alert($.parseJSON(xhr.responseText).message);
        }

    });
}