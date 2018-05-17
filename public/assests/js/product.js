
    $(document).ready(function () {
        formatEditor();
        //hien icon theo loai
        $(".loai").each(function () {
            if ($(this).html().indexOf("Sách") != -1) {
                $(this).prepend("<i class=\"pull-right glyphicon glyphicon-book\" aria-hidden=\"true\"></i>");
            }
            else if ($(this).html().indexOf("Thiết bị số") != -1) {
                $(this).prepend("<i class=\"pull-right glyphicon glyphicon-phone\" aria-hidden=\"true\"></i>");
            }
            else if ($(this).html().indexOf("Đồ gia dụng") != -1) {
                $(this).prepend("<i class=\"pull-right glyphicon glyphicon-lamp\" aria-hidden=\"true\"></i>");
            }
            else if ($(this).html().indexOf("Thời trang") != -1) {
                $(this).prepend("<i class=\"pull-right glyphicon glyphicon-apple\" aria-hidden=\"true\"></i>");
            }
            else if ($(this).html().indexOf("Làm đẹp") != -1) {
                $(this).prepend("<i class=\"pull-right glyphicon glyphicon-leaf\" aria-hidden=\"true\"></i>");
            }
            else if ($(this).html().indexOf("Nhà cửa") != -1) {
                $(this).prepend("<i class=\"pull-right glyphicon glyphicon-home\" aria-hidden=\"true\"></i>");
            }
            else if ($(this).html().indexOf("Xe cộ") != -1) {
                $(this).prepend("<i class=\"pull-right glyphicon glyphicon-wrench\" aria-hidden=\"true\"></i>");
            }
            else {
                $(this).prepend("<i class=\"pull-right glyphicon glyphicon-pencil\" aria-hidden=\"true\"></i>");
            }

        })

        //hide sidebar-seach khi o trang search
        if ($("title").html().indexOf("Tìm kiếm") != -1) {
            $(".sidebar-search").css("display", "none");
            var key = $('#txtSearch').val();
            if (key != "") {
                count = num;
                $("#btnLoadMoreProduct").css('display', 'block');
                $('#searchProduct').html('');
                $("#searchFooter2").css('display', 'none');
                showMoreProduct();
            }
        }
        var start = $('.startTime').text();
        var end = $('.endTime').text();
        $('.startTime').text(formatDate(start));
        $('.endTime').text(formatDate(end));

        ElapseTime();


    })

    function FormatTimeDetailProduct() {
        var id = $('.startTime');
        id.text(formatDate(id.text()));
        var id = $('.endTime');
        id.text(formatDate(id.text()));
    }

    //ma hoa ten nguoi dung gia cao nhat
    $('.userHighestPrice').each(function () {
        var id = $(this);
        var nd =id.text();
        if (nd == '') {
            id.text('Chưa có');
        }
        else {
            var length = nd.length;
            var sub = nd.substr(0, length - 3);
            nd = nd.replace(sub, '*****');
            id.text(nd);
        }
    })
    //cac san pham moi dang co them icon new
    $('.postTime').each(function () {
        var time = $(this).text();
        var id = $(this);
        var postDate = new Date(time).getTime();
        var now = new Date().getTime();
        var khoangThoiGian = 30*60*1000;
        var t = now - postDate;
        if(t < khoangThoiGian){
            id.siblings('.newProduct').css('display', 'block');
        }
    })

    //tinh thoi gian dau gia con lai
    function ElapseTime() {
        $(".elapseTime").each(function (index) {
            var timeOut = $(this).text();
            var id = $(this);
            var countDownDate = new Date(timeOut).getTime();

            if (timeOut != '' && !id.hasClass('showTime')) {
                id.addClass('showTime');
                var x = setInterval(function () {
                    //alert(id);
                    // Get todays date and time
                    var now = new Date().getTime();

                    // Find the distance between now an the count down date
                    var distance = countDownDate - now;


                    // Time calculations for days, hours, minutes and seconds
                    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                    //alert(seconds);
                    // Display the result in the element with id="demo"
                    id.html(days + "d " + hours + "h "
                            + minutes + "m " + seconds + "s ");

                    // If the count down is finished, write some text
                    if (distance < 0) {
                        clearInterval(x);
                        id.html("EXPIRED");
                    }
                }, 1000);
            }
        })
    }

    //submit khi nhan search o Trang chu
    $("#btnSearchHomepage").click(function () {
        var keyword = $('#keyword').val();
        var path = "/product/search?keyword=" + keyword + "&count=0&newPage=1";
        window.location.replace(path);
    })

    var count = 0, i = 0, num = 4;
    var sortType = 0;
    $("#btnSearch").click(function () {
        count = num;
        $("#btnLoadMoreProduct").css('display', 'block');
        $('#searchProduct').html('');
        $("#searchFooter2").css('display', 'none');
        sortType = 0;
        disableSortButtons();
        showMoreProduct();
    })


    $("#buttonSortTime").click(function () {
        count = num;
        $("#btnLoadMoreProduct").css('display', 'block');
        $('#searchProduct').html('');
        $("#searchFooter2").css('display', 'none');
        sortType = 1;
        disableSortPriceButton();
        showMoreProduct();
    })


    $("#buttonSortPrice").click(function () {
        count = num;
        $("#btnLoadMoreProduct").css('display', 'block');
        $('#searchProduct').html('');
        $("#searchFooter2").css('display', 'none');
        sortType = 2;
        disableSortTimeButton();
        showMoreProduct();
    })

    function disableSortTimeButton() {
        if (!$('#buttonSortPrice').hasClass('btnEnable')) {
            $('#buttonSortPrice').addClass('btnEnable');
        }
        if ($('#buttonSortTime').hasClass('btnEnable')) {
            $('#buttonSortTime').removeClass('btnEnable');
        }
    }

    function disableSortPriceButton() {
        if (!$('#buttonSortTime').hasClass('btnEnable')) {
            $('#buttonSortTime').addClass('btnEnable');
        }
        if ($('#buttonSortPrice').hasClass('btnEnable')) {
            $('#buttonSortPrice').removeClass('btnEnable');
        }
    }

    function disableSortButtons() {
        if ($('#buttonSortPrice').hasClass('btnEnable')) {
            $('#buttonSortPrice').removeClass('btnEnable');
        }
        if ($('#buttonSortTime').hasClass('btnEnable')) {
            $('#buttonSortTime').removeClass('btnEnable');
        }
    }


    function showMoreProduct() {
        var keyword = $('#txtSearch').val();
        var xhttp;
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var products = JSON.parse(this.response);
                var productCount = products.length;
                i = 0;
                while (i < productCount) {
                    $('#searchProduct').append(productToThumbnail(products[i]));
                    i++;
                }
                count = count + num;

                if (productCount < num) {
                    $("#btnLoadMoreProduct").css('display', 'none');
                    $("#searchFooter2").css('display', 'block');
                }
            }
        };
        var category = $('#catID').val();
        var url = "/product/search?keyword=" + keyword + "&count=" + count + "&sortType=" + sortType
                + "&category=" + category;
        xhttp.open("GET", url, true);
        xhttp.send();
    }

    function productToThumbnail(product) {
        var res = '<div class="col-sm-3 col-lg-3 col-md-3">'
                + '<div class="thumbnail">'
                + '<img class="newProduct" src="/imgs/new.png" alt=' + product.thoiDiemDang + 'style="position: absolute; top: 0px; right: 10px; display: none">'
                + '<img src="/imgs/sp/' + product.idSanPham + '/1.jpg" alt="">'
                + '<div class="caption" style="height: 200px">'
                + '<h4>'
                + '<button class="buttonHeart" onclick="addToWatchList('+ product.idSanPham +')"><span style="color: red" class="glyphicon glyphicon-heart pull-right" aria-hidden="true"></span></button>'
                + '<a href="/product/detail/' + product.idSanPham + '">' + product.tenSanPham + '</a>'
                + '</h4>'
//                + '<h4 class="pull-right" style="color: green">'+'0'+'</h4>'
                + '<div style="display: inline;">'
                + 'Người dùng giữ giá cao nhất&nbsp'
                + '<div class="userHighestPrice" style="display: inline; font-size: 16px ;color: blue">Chưa có</div>'
                + '</div>'

                +'<div>'
                +'<button style="padding: 2px 20px; background-color: #fff; color: brown; width: 100%;" class="btn btn-success">'
                +'<p style="font-size: 16px;">Mua ngay&nbsp<strong style="color: orange">'+product.giaMuaNgay+'</strong></p>'
                +'</button>'
                +'</div>'

                + '</div>'
                +'<div class="ratings">'
                +'<div class="pull-right">'
                +'<span style="color: red; display: inline" class="glyphicon glyphicon-time"></span>'
                +'<div style="display: inline;" class="elapseTime">'+product.thoiDiemKetThuc+'</div>'
                +'</div>'
                +'<p>'
                +'<span style="color: green" class="glyphicon glyphicon-flash"></span>'
                + '0'
                +'</p>'
                +'</div>'
                +'</div>'
                +'</div>';

        return res;
    }


    function datGia(id) {

        if(confirm("Bạn có chắc muốn mua ?")) {
            $.ajax({
                url: "/product/buyNow",
                type: "post",
                data: {
                    idSanPham: id
                },
                success: function(html) {
                    if (html === "diemDanhGiaError") {
//                        $("#msg").text('Không đủ điểm đánh giá');
                        alert("Bạn không đủ điểm đánh giá");
                    } else if (html === "timeError")
                        alert("Sản phẩm đấu giá đã kết thúc"); else if (html === "giaError")
                        alert("Hãy đặt giá lớn hơn giá hiện tại"); else if (html === "done") {

                        alert("Mua thành công");
                        location.reload();
                    }
                }
            });
        }

    }

    function fn(id) {
        var gia = $("#dauGia").val();

        if(confirm("Bạn có chắc muốn mua ?")) {
            $.ajax({
                url: "/product/bid",
                type: "post",
                data: {
                    idSanPham: id,
                    giaDauGia: gia
                },
                success: function(html){
                    if(html==="diemDanhGiaError") {
//                        $("#msg").text('Không đủ điểm đánh giá');
                        alert("Bạn không đủ điểm đánh giá");
                    } else if(html==="timeError")
                        alert("Sản phẩm đấu giá đã kết thúc"); else if(html==="giaError")
                        alert("Hãy đặt giá lớn hơn giá hiện tại"); else if(html==="done") {

                        alert("Đặt giá thành công");
                        location.reload();
                    }

                }
            });
        }
    }

