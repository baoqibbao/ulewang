$(() => {
    var suerBOOL = false;
    $(".signIn form").on("blur", "#username,#pwd", function (e) {
        var val = $.trim($(e.target).val())
        if(e.target.id =="username"){
            if(/^1[3-9]\d{9}$/.test(val)){
                $(e.target).css("border","1px solid #cacaca").next().css("display","none");
                suerBOOL =true;
            }else{
                $(e.target).css("border","1px solid #df030a").next().css("display","inline");
                suerBOOL = false;
            }
        }
    })
    $(".signIn form").find("button").click(function(e){
        e.preventDefault();
        if($.trim($("#username").val()).length===0){
            alert("请输入账户");
            return;
        }
        if(!suerBOOL) return;
        if($.trim($("#pwd").val()).length===0){
            alert("密码不能为空");
            return;
        }
        if(!$("[type='checkbox']")[0].checked){
            alert("请阅读并同意相关协议");
            return;
        }
        $.ajax({
            type: "POST",
            url: "../server/signIn.php",
            data: {
                username: $.trim($("#username").val()),
                pwd: md5($.trim($("#pwd").val())).slice(0,15)
            },
            dataType: "JSON",
            // {"status":"error","msg":"该用户已经存在，请确认手机号码!!"}
            success(res) {
                alert(res.msg);
                if(res.status=="success"){
                    localStorage.setItem("username",res.info)
                    location.href="./index.html";
                }
            }
        })
    })
})
//加密md5($.trim($("#pwd").val())).slice(0,15)