function getObjects (table){

    $.get("/users/get",
        function (data)
        {
            if (data.status)
            {
                var tableRow = '';
                $.each(data.db_data, function (key, value) {
                    tableRow += "<tr>";
                    tableRow += "<td>"+value.id+"</td>";
                    tableRow += "<td>"+value.nickname+"</td>";
                    tableRow += "<td>"+value.login+"</td>";
                    tableRow += "<td>"+value.password+"</td>";
                    tableRow += "<td>"+'<a class="editLink" href="/users/edit/'+value.id+'">Edit</a>'+"</td>";
                    tableRow += "<td>"+'<form action="" style="display:inline;">'
                    tableRow +='<input type="button" onclick="deleteObj ('+"'/users', "+value.id+')" value="Delete" /></form>'+"</td>";
                    tableRow += "/<tr>";
                })
                $('#'+table+'').append(tableRow);
            }
            else{
                alert(data.dbresp);}
        }
    );
}