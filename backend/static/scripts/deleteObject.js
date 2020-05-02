function deleteObj (url, id) {
    $.ajax({
        url:     "/api/"+url+"/"+id+"", //url страницы
        type:     "DELETE", //метод отправки
        success: function(data, status) { //Данные отправлены успешно
            window.location.href = "/view/"+url;

        },
        error: function(xhr) { // Данные не отправлены
            alert($.parseJSON(xhr.responseText).message);
        }

    });
}