
$(() => {
    var booArr = [];
    booArr.length = $(".main form").find("input").length;
    booArr.fill(false);
    //图形验证码
    let imgCode;
    let captcha = new Captcha;//可传参数，具体用法看github
    captcha.draw(document.querySelector('#captcha'), r => {
        imgCode = r;
        $("#code").trigger("blur");//执行blur事件函数
    });
   
    //
    $(".main form").on("blur", "#username,#code,#pwd,#pwdTo", function (e) {//jq委托
        var val = $.trim($(e.target).val());
        var index = $(".main form").find("input").index(e.target)
        // console.log(val)
        booArr[index] = RegText(index, val)
        // console.log(RegText(index, val))
        if (booArr[index]) {
            $(e.target).parent().find("span").css("display", "none");
        } else {
            $(e.target).parent().find("span").css("display", "inline");
        }
        bnIsOpen()
    })
    function RegText(index, value) {
        if (value.trim().length === 0) return false;
        switch (index) {
            case 0:
                return /^1[3-9]\d{9}$/.test(value);
            case 1:
                return value == imgCode;
            case 2:
                return /^(?=.*([a-zA-Z].*))(?=.*[0-9].*)[a-zA-Z0-9-*/+.~!@#$%^&*()]{6,20}$$/.test(value);
            case 3:
                return value == $.trim($("#pwd").val());

        }
    }
    $(".main form").find("[type='checkbox']").eq(0).on("click", function (e) {
        booArr[booArr.length - 1] = this.checked;
        bnIsOpen()
    })
    function bnIsOpen() {
        if (booArr.every(item => item)) {
            $(".main form").find("button").eq(0).css({ "cursor": "pointer", "disabled": "false" });
        } else {
            $(".main form").find("button").eq(0).css({ "cursor": "not-allowed", "disabled": "true" });
        }
    }
    $(".main form").find("button").eq(0).on("click", function (e) {
        e.preventDefault();
        if (!booArr.every(item => item)) return;
        $.ajax({
            type: "POST",
            url: "../server/signUp.php",
            data: {
                username: $.trim($("#username").val()),
                pwd: md5($.trim($("#pwd").val())).slice(0,15)
            },
            dataType: "JSON",
            // {"status":"error","msg":"该用户已经存在，请确认手机号码!!"}
            success(res) {
                if (res.status == "success") {
                    alert("注册成功，前往登录");
                    location.href = "./signIn.html";
                } else {
                    alert("该账户已注册")
                }
            }
        })
    })
})