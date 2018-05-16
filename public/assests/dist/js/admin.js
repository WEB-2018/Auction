

/* Morris.js Charts */
// Sales chart

$(document).ready(function () {
    var totalUsers = $('.totalUsers').html();
    var totalSalers = $('.totalSalers').html();
    var donut2 = new Morris.Donut({
        element: 'user-chart',
        resize: true,
        colors: ["#3c8dbc", "#f56954", "#00a65a"],
        data: [
            {label: "Saler", value: parseInt(totalSalers)},
            {label: "User", value: parseInt(totalUsers)}
        ],
        hideHover: 'auto'
    });
})

$('#formNewCategory').submit(function () {
    var name = $(this).find('input').val();
    $.ajax( {
        type: "POST",
        url: "/admin/category/add",
        data: {name: name},
        success: function (data) {
            if(data=="success"){
                alert("Them thành công");
            }else {
                alert("Vui long thu lai");
            }
        }
    } );
})

$('.currentCatNameBox').click(function () {
    $(this).css('display', 'none');
    var trId = $(this).parent().closest('tr').attr('id').split(' ');
    $('#'+trId).find('.newCatNameBox').css('display', 'block');
})

$('.tinhTrang').each(function () {
    var id = $(this);
    var nd = id.text();
    if(nd==1){
        id.text('Hết hạn');
        id.css('color','red');
    }else{
        id.text('Đang đấu giá');
        id.css('color','green');
    }
})

function updateCategory(id) {
    var newName = $('#'+id).find('.newCatNameBox input').val();
    alert(newName);
    var categoryData = {
        id: id,
        name: newName
    };
    $.ajax({
        type: "POST",
        url: "/admin/category/update",
        data: categoryData,
        success: function (data) {
            if(data=="success"){
                alert("Update thành công");
            }else {
                alert("Vui long thu lai");
            }
        }
    });

    $('.currentCatNameBox').css('display', 'block');
    $('.newCatNameBox').css('display', 'none');
}

function deleteProduct(id) {
    var productData = {
        id: id
    };

    $.ajax({
        type: "POST",
        url: "/admin/product/delete",
        data: productData,
        success: function (data) {
            if(data=="success"){
                alert("Xóa thành công");
                $('#'+id+'.productInfo').remove();
            }else {
                alert("Vui long thu lai");
            }
        }
    });
}

function deleteCategory(id) {
    var categoryData = {
        id: id
    };

    $.ajax({
        type: "POST",
        url: "/admin/category/delete",
        data: categoryData,
        success: function (data) {
            if(data=="success"){
                alert("Xóa thành công");
                $('#'+id+'.categoryInfo').remove();
            }else {
                alert("Vui long thu lai");
            }
        }
    });
}

function acceptUser(id) {
    $.ajax({
    type: "GET",
    url: "admin/user/accept?id=" + id,
    success: function (data) {
        if(data=="success"){
            alert("Cấp quyền thành công");
            $('tr#'+id).remove();
        }else {
            alert("Vui long thu lai");
        }
    }
});
}

function deleteUser(id) {
    var userData = {
        id: id
    };

    $.ajax({
        type: "POST",
        url: "/admin/user/delete",
        data: userData,
        success: function (data) {
            if(data=="success"){
                alert("Xóa thành công");
                $('#'+id+'.userInfo').remove();
            }else {
                alert("Vui long thu lai");
            }
        }
    });
}

function resetUserPassword(id) {
    var userData = {
        id: id
    };

    $.ajax({
        type: "POST",
        url: "/admin/user/reset",
        data: userData,
        success: function (data) {
            if(data=="success"){
                alert("Reset thành công");
            }else {
                alert("Vui long thu lai");
            }
        }
    });
}

