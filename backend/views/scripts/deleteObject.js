function deleteObj (url, id) {
    $.get(""+url+"/delete/"+id+"",
        function (data)
        {
            if (data.status) {
                window.location.href = url;
            }
            else{
                alert(data.dbresp);}
        });
}