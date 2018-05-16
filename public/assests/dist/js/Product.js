// $('.glyphicon-heart-empty, .glyphicon-heart').click(function(){
//         if($(this).hasClass("glyphicon-heart-empty")){
//             $(this).removeClass("glyphicon-heart-empty").addClass("glyphicon-heart");
//             addToWatchList_2();
//         }
//         else if($(this).hasClass("glyphicon-heart")){
//             $(this).removeClass("glyphicon-heart").addClass("glyphicon-heart-empty");
//             removeProdcutAddedToWatchList();
//         }
//     });

function addToWatchList(id) {
    $.ajax({
        type: 'GET',
        url: '/product/like/'+id,
    }).done(function(data){
        if(data=='success') alert('Add to wish list successfully!');
        else if(data=='added') alert('Warning! This product was added before!');
        else if(data=='fail') alert('You must login first!');
    }).fail(function(jqXHR, textStatus){
        alert('Error occured: ' + textStatus);
    });
}

function addToWatchList_2() {
    var id = $(this);
    var idSp = $(id).closest('.idDiv').val();
    $.ajax({
        type: 'GET',
        url: '/product/like/'+idSp,
    }).done(function(data){
        if(data=='success') alert('Add to wish list successfully!');
        else if(data=='added') alert('Warning! This product was added before!');
        else if(data=='fail') alert('You must login first!');
    }).fail(function(jqXHR, textStatus){
        alert('Error occured: ' + textStatus);
    });
}

function removeProductAddedToWatchList() {
    var id = $(this);
    var idSp = $(id).closest('.idDiv').val();
    $.ajax({
        type: 'GET',
        url: '/product/unlike/'+idSp,
    }).done(function(data){
        if(data=='success') alert('Remove product successfully!');
        else if(data=='added') alert('San pham nay chua dc hem truoc do');
        else if(data=='fail') alert('You must login first!');
    }).fail(function(jqXHR, textStatus){
        alert('Error occured: ' + textStatus);
    });
}

function formatEditor() {
    var id = $('.moTa2');
    var noiDung1 = id.text();
    id.css('display', 'none');
    $('.moTa').append(noiDung1);
}

function formatDate(strDate) {
    var date = new Date(strDate);
    var minute = date.getMinutes();
    var hour = date.getHours();
    var day = date.getDate();
    var monthIndex = date.getMonth() + 1;
    var year = date.getFullYear();
    var m = '0';
    var h = '0';
    if(minute<10) m = m + minute;
    if(hour<10) h = h + hour;
    return h + ':' + m + ' ' + day + '/' + monthIndex + '/' + year;
}