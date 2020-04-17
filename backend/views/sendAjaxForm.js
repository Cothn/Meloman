function sendAjaxForm(form, url, redirect_url) {
    $.ajax({
        url:     url, //url страницы
        type:     "POST", //метод отправки
        dataType: "html", //формат данных
        data: $("#"+form).serialize(),  // Сеарилизуем объект
        success: function(response) { //Данные отправлены успешно
            result = $.parseJSON(response);
            //alert(result.status)
            if (result.status){

                window.location.href = redirect_url;
            }
            else{
                alert(result.dbresp);}

        },
        error: function(response) { // Данные не отправлены
            alert('Ошибка. Данные не отправлены.');
        }
    });
}