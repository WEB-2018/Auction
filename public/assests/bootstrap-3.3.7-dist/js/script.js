
        function timepadding(x5) {
            if (typeof x5 !== "string") {
                x5 = x5.toString()
            }
            var x6 = 0;
            var x7 = 0;
            if (x5 % 60 === 0) {
                return x5 + ":00"
            } else {
                x6 = x5 % 60;
                return x6.toString()
            }
        }

        function gettimezone() {
            var d = new Date();
            var z = document.getElementById("result");
            var utcsinceepoch = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds());
            var y1 = d.getTime()
            z.innerHTML = (utcsinceepoch - d.getTime()) / 3600000;
        }
        gettimezone();

        function utcoffset(time, offset) {
            return time + offset;
        }

        function displayTime() {
            var d = new Date();
            var y = document.getElementById("Time");
            

            var h = (d.getHours())
                .toString();
            var m = (d.getMinutes())
                .toString();
            var s = (d.getSeconds())
                .toString();
            var h2 = ("0" + h)
                .slice(-2);
            var m2 = ("0" + m)
                .slice(-2);
            var s2 = ("0" + s)
                .slice(-2);
            y.style.fontSize = "30px";
            y.style.fontFamily = "'Electrolize', sans-serif";
            y.style.color = "#0174DF";
            //y.innerHTML = h2 + " : " + m2 + " : " + s2;
            y.innerHTML = h2 + ":" + m2 + ":" + s2;
        }

     
        setInterval(displayTime, 1000);

        $('#myDropdown')
            .on('show.bs.dropdown', function() {
                // do something…
            })


        $(function() {
            $('#side-menu').metisMenu();
        });

        //Loads the correct sidebar on window load,
        //collapses the sidebar on window resize.
        // Sets the min-height of #page-wrapper to window size
        $(function() {
            $(window).bind("load resize", function() {
                var topOffset = 50;
                var width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;
                if (width < 768) {
                    $('div.navbar-collapse').addClass('collapse');
                    topOffset = 100; // 2-row-menu
                } else {
                    $('div.navbar-collapse').removeClass('collapse');
                }

                var height = ((this.window.innerHeight > 0) ? this.window.innerHeight : this.screen.height) - 1;
                height = height - topOffset;
                if (height < 1) height = 1;
                if (height > topOffset) {
                    $("#page-wrapper").css("min-height", (height) + "px");
                }
            });

            var url = window.location;
            // var element = $('ul.nav a').filter(function() {
            //     return this.href == url;
            // }).addClass('active').parent().parent().addClass('in').parent();
            var element = $('ul.nav a').filter(function() {
                return this.href == url;
            }).addClass('active').parent();

            while (true) {
                if (element.is('li')) {
                    element = element.parent().addClass('in').parent();
                } else {
                    break;
                }
            }
        });
