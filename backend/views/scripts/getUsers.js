function getUsers (table){

    $.ajax({
        url:     "/api/user", //url страницы
        type:     "GET", //метод отправки
        dataType: "json", //формат данных
        success: function (data)
        {
            var tableRow = '';
            $.each(data, function (key, value) {
                tableRow += "<tr>";
                tableRow += "<td>"+value.id+"</td>";
                tableRow += "<td>"+value.nickname+"</td>";
                tableRow += "<td>"+value.login+"</td>";
                tableRow += "<td>"+value.password+"</td>";
                tableRow += "<td>"+'<a class="editLink" href="/view/user/edit/'+value.id+'">Edit</a>'+"</td>";
                tableRow += "<td>"+'<form action="" style="display:inline;">'
                tableRow +='<input type="button" onclick="deleteObj ('+"'user', "+value.id+')" value="Delete" /></form>'+"</td>";
                tableRow += "/<tr>";
            })
            $('#'+table+'').append(tableRow);

        },
        error: function(xhr) { // Данные не отправлены
            alert($.parseJSON(xhr.responseText).message);
        }
    });
}