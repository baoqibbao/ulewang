$(() => {
    var proDot=1,pageNum;
    $.ajax({
        type:"POST",
        url:"../server/getPageNum.php",
        data:{},
        dataType:"JSON",
        success(res){
            createPage(res)
        }
    })
    function createPage(data){
        var html = "";
        pageNum = data;
        for(let i=0;i<data;i++){
            html+=`<li class=${i==0?"ulbg":""}>${i+1}</li>`;
        }
        $(html).insertBefore(".nextLi")
    }
    init("default", 0)
    function init(sort, page) {
        $.ajax({
            type: "POST",
            url: "../server/frehFruit.php",
            data: {
                sort,
                pageNum: page
            },
            dataType: "JSON",
            success(res) {
                createMain(res)
            }
        })
    }
    //排序
    $(".sortNav").on("click", "li", function (e) {
        $(this).addClass("licss").siblings().removeClass("licss")
        // init("default",0)
        if ($(this).text() === "默认") {
            init("price_asc", 0)
        } else if ($(this).text() === "价格降序") {
            init("price_desc", 0)
        } else if ($(this).text() === "价格升序") {
            init("price_asc", 0)
        }
    })
    function createMain(data) {
        var htmlcontent = data.map(function (item) {
            return `
            <li data-goodid = ${item.good_id}>
                <div class="wrap_ ">
                    <div class="boxWrap">
                        <div class="box_">
                            <img src="${item.imgSrc}"">
                            <p><a href="javaScript:void(0)" title="${item.title}">${item.title}</a></p>
                            <p>￥<strong>${item.price}</strong><del>${item.oldPrice == 0.00 ? "" : item.oldPrice}</del></p>
                            <p><a href="#">${item.shopname}</a><a href="#">${item.address}</a></p>
                            
                        </div>
                    </div>
                    <p>${item.score}</p>
                </div>
            </li> `
        }).join("");
        $(".main ul").html(htmlcontent);
    }
    $(".main ul").delegate("li", "click", liMouseHandler)
    function liMouseHandler(e) {
        if (e.currentTarget.nodeName !== "LI") return;
        location.href = "../html/goods_details.html?good_id=" + $(e.currentTarget).data().goodid;

    }
    //分页
    $(".navList ul").on("click","li",function(e){
        e.preventDefault();
        if($(this).text()=="<"){
            proDot--;
            if(proDot<1) proDot =1;
            changePage(proDot)
        }else if($(this).text()==">"){
            proDot++;
            if(proDot>Number(pageNum)) proDot = Number(pageNum);
            changePage(proDot)
        }else{
            proDot = Number($(this).text())
            changePage(proDot)
        }
    })
    
    function changePage(page){
        $(".navList ul li").eq(Number(page)).addClass("ulbg").siblings().removeClass("ulbg");
        if ($(".licss").text() === "默认") {
            init("price_asc", Number(page)-1)
        } else if ($(".licss").text() === "价格降序") {
            init("price_desc", Number(page)-1)
        } else if ($(".licss").text() === "价格升序") {
            init("price_asc", Number(page)-1)
        }
    }
})