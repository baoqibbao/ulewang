$(() => {
    var username = localStorage.getItem("username")
    var booArr = [];
    document.addEventListener("step_change", step_changeHandler)
    $.ajax({
        type: "POST",
        url: "../server/shopCart.php",
        data: {
            username,
        },
        dataType: "JSON",
        success(res) {
            createCartInfo(res);
            initNum(res.msg)
        }
    })
    function initNum(data) {
        var count = 0;
        data.forEach(item => {
            count += Number(item.num)
        })
        $(".cartTop h3").eq(0).find("span").text(count);
    }
    function createCartInfo(res) {
        var dataArr = [];
        // var bool = [];
        res.msg.forEach(item => {
            let result = dataArr.filter((item1) => item1.shopName == item.shopName);
            if (result.length == 0) {
                dataArr.push({ shopName: item.shopName, info: [] });
                // bool.push({strom:false,infobool:[]});
            }
        })
        dataArr.forEach((item, index) => {
            res.msg.forEach(item1 => {
                if (item1.shopName == item.shopName) {
                    dataArr[index].info.push(item1);
                    // bool[index].infobool.push(false);
                }
            })
        })
        createShopCart(dataArr);
    }
    function createShopCart(data) {
        $(".cartMianWrap").html("");
        var index = 0;
        data.forEach(item => {
            var html = `
                <div class="cartMian">
                <ul>
                    <li> <input type="checkbox"> </li>
                    <li>${item.shopName}</li>
                </ul>
                <div class="cartCentent">
                   ${createCentent(item.info)}
                </div>
                </div>
                `
            $(".cartMianWrap").append(html);

            item["info"].forEach((item1) => {
                item1.checked = "false"
                var num = new StepNumber(item1);
                num.appendTo($(".cartCentent").find(".StepNumber_")[index])
                index++;
            })
            console.log($(".cartCentent ul li:nth-of-type(8)"))
            
            // console.log($(".cartMian>ul").find("input").prop("checked"))

        })
        $(".cartCentent ul li:nth-of-type(8)").on("click", "p", delHandler)
        
        //  console.log($(".cartMian").find("[type='checkbox']"))
        booArr.length = $(".cartMian>ul").find("[type='checkbox']").length;
        booArr.fill(false);
        $(".cartTit>ul").on("click", "[type='checkbox']", cartTitcheckedHandler)
        $(".cartMian>ul").on("click", "[type='checkbox']", checkedHandler)
        $(".cartCentent").on("click", "[type='checkbox']", CententcheckedHandler)
        // cartMian
        // console.log($(".cartCentent>ul").find("[type='checkbox']"))
    }
    function delHandler(e) {
       var good_id = $(e.target).data().goodid;
       var Specifications = $(e.target).data().specifications;
        if (e.target.textContent == "收藏") {
            // console.log(e.target)
        } else if (e.target.textContent == "删除") {
            $.ajax({
                type:"GET",
                url:"../server/delCart.php",
                dataType:"JSON",
                data:{
                    good_id,
                    username,
                    Specifications,
                },
                success(res){
                    alert("数据删除成功！")
                    createCartInfo(res);
                    // console.log(res)
                }
            })
        }
    }
    //最高层
    function cartTitcheckedHandler(e) {
        if ($(e.target).prop("checked")) {
            $(e.target).parents(".cartTitWrap").next().find("[type='checkbox']").each(function (index, item) {
                $(item).prop("checked", true)

            })
        } else {
            $(e.target).parents(".cartTitWrap").next().find("[type='checkbox']").each(function (index, item) {
                $(item).prop("checked", false)
            })
        }
        priceCount()
    }
    //中间层
    function checkedHandler(e) {
        var index = $(".cartMian>ul").find("[type='checkbox']").index(e.target)
        booArr[index] = $(e.target).prop("checked")
        if (booArr[index]) {
            $(e.target).parent().parent().next().find("[type='checkbox']").each(function (index, item) { item.checked = true })
        } else {
            $(e.target).parent().parent().next().find("[type='checkbox']").each(function (index, item) {
                item.checked = false;
            })
        }
        if (booArr.every(item => item == true)) {
            $(".cartTit>ul").find("[type='checkbox']").prop("checked", true)
        } else {
            $(".cartTit>ul").find("[type='checkbox']").prop("checked", false)
        }
        priceCount()
    }
    //最里层
    function CententcheckedHandler(e) {
        // console.log($(e.target).parent().parent().siblings().find("[type='checkbox']"))
        // console.log($(e.target).parent().parent().parent().find("[type='checkbox']"))
        var boo = [];
        boo.length = $(e.target).parent().parent().parent().find("[type='checkbox']").length;
        for (let i = 0; i < boo.length; i++) {
            boo[i] = $(e.target).parent().parent().parent().find("[type='checkbox']").eq(i).prop("checked")
        }
        if (boo.every(item => item == true)) {
            var centerIput = $(e.target).parents(".cartCentent").siblings().find("[type='checkbox']");
            centerIput.prop("checked", true)

            var index = $(".cartMian>ul").find("[type='checkbox']").index(centerIput)
            booArr[index] = centerIput.prop("checked")
        }
        if (boo.some(item => item == false)) {
            var centerIput1 = $(e.target).parents(".cartCentent").siblings().find("[type='checkbox']");
            centerIput1.prop("checked", false)
            var index1 = $(".cartMian>ul").find("[type='checkbox']").index(centerIput1)
            booArr[index1] = centerIput1.prop("checked")
        }
        if (booArr.every(item => item == true)) {
            $(".cartTit>ul").find("[type='checkbox']").prop("checked", true)
        } else {
            $(".cartTit>ul").find("[type='checkbox']").prop("checked", false)
        }
        priceCount();

    }
    function step_changeHandler(e) {
        $.ajax({
            type: "post",
            url: "../server/shopCart_updata.php",
            data: {
                num: e.step,
                good_id: e.obj.good_id,
                username: e.obj.username,
                Specifications: e.obj.Specifications,
            },
            dataType: "JSON",
            success(res) {
                // createCartInfo(res);//直接拿数据库重新渲染页面会改选中
                // console.log(e,e.step)
                $(e.elem).parents(".StepNumber_").next().text("￥" + (e.obj.price * e.step).toFixed(2))
                priceCount();
                initNum(res.msg);
                // console.log(res)
            }
        })

    }
    function createCentent(data) {
        var html_ul = ""
        data.forEach(item => {
            var imgsrc = item.minImgSrc.split(",")[0]
            // console.log(item)
            html_ul += ` <ul>
            <li> <input type="checkbox"  data-price = ${item.price} > </li>
            <li><img src="${imgsrc}" alt=""></li>
            <li>${item.title}</li>
            <li class="Specifi">规格： ${item.Specifications}</li>
            <li>¥${item.price}</li>
            <li class = "StepNumber_"></li>
            <li>¥${(item.price * item.num).toFixed(2)}</li>
            <li><p data-goodid = ${item.good_id} data-specifications = ${item.Specifications}>收藏</p><p data-goodid = ${item.good_id} data-specifications = ${item.Specifications}>删除</p></li>
            </ul>
         `;
            //  console.log($(".cartCentent").find(".StepNumber_"))
        })
        return html_ul;
    }

    function priceCount() {
        // console.log($(".cartCentent").find("[type='checkbox']").index())
        // console.log($(e.target).parent().parent().siblings().find("[type='checkbox']"))
        // console.log( $(".cartTit").find("[type='checkbox']").prop("checked", true))
        var ckboo = [];
        var totalPrice = 0;
        var count = 0;
        $(".cartCentent").find("[type='checkbox']").each(function (index, item) {
            if ($(item).prop("checked")) {
                /* ckboo.push({
                    good_id:$(item).data().goodid,
                    Specifications:$(item).data().specifications,
                    username
                }) */
                var price = $(item).data().price;
                var num = $(item).parent().parent().find(".StepNumber_ input").val();
                totalPrice += price * num;
                count += Number(num);
            }
        })
        $(".pro_count ul li").eq(0).find("span").text(count);
        //   $(".cartTop h3").eq(0).find("span").text(count);
        $(".pro_count ul li").eq(3).find("span").text(totalPrice.toFixed(2))
    }
})