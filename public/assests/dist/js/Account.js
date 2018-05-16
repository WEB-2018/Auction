/**
 * Created by MIB on 6/25/2017.
 */
$(function() {
    // Initialize form validation on the registration form.
    // It has the name attribute "registration"
    $("form[name='registration']").validate({

        errorClass: "my-error-class",
        validClass: "my-valid-class",

        rules: {
            name: "required",
            address: "required",
            recaptcha: "required",
            email: {
                required: true,
                email: true
            },
            password: {
                required: true,
                minlength: 3
            },
            passwordConfirm: {
                required: true,
                equalTo: "#password"
            }
        },
        // Specify validation error messages
        messages: {
            name: "Vui lòng nhập tên của bạn",
            address: "Vui lòng nhập địa chỉ của bạn",
            password: {
                required: "Vui lòng nhập mật khẩu của bạn (ít nhất 5 ký tự)",
                minlength: "Vui lòng nhập mật khẩu của bạn (ít nhất 5 ký tự)"
            },
            passwordConfirm: {
                required: "Vui lòng nhập lại mật khẩu của bạn",
                equalTo: "2 mật khẩu vừa nhập không giống nhau",
            },
            email: "Địa chỉ email của bạn chưa đúng định dạng",
            recaptcha: "Yêu cầu recaptcha để đăng ký"
        },
        // Make sure the form is submitted to the destination defined
        // in the "action" attribute of the form when valid
        submitHandler: function(form) {
            var url = "register/new"; // the script where you handle the form input.
            alert("client is ready to sent data -_-");
            $.ajax({
                type: "POST",
                url: url,
                data: $("#registration").serialize(), // serializes the form's elements.
                success: function(data)
                {
                    alert(data); // show response from the php script.
                    if(data=='fail'){
                        grecaptcha.reset();
                    }
                    else if(data=='mail'){
                        alert("Email này đã được đăng ký. Vui lòng thử lại với email khác");
                        $('#email').val('');
                        $('#email').focus();
                    }
                    else if(data=='success'){
                        var path = "/";
                        window.location.replace(path);
                    }
                }
            });
        }
    });
});
