$(() => {
    var goods_id = location.href.split("?")[1].split("=")[1];
    // var imgList = [];
    var minImgList = [];
    var cover, minBox, maxBox, prev, uls;
    var BigimgSrc, MinimgSrc;
    var StepNumber_ = new StepNumber();
    var username = localStorage.getItem("username");
   
    $.ajax({
        type: "post",
        url: "../server/goods_details.php",
        data: {
            goods_id,
        },
        dataType: "JSON",
        success(res) {
            console.log(res)
            $(".shopName").text(res[0].shopName)
            $(".topNav_ span").text(res[0].title)
            BigimgSrc = res[0].bigImgSrc.split(",");
            MinimgSrc = res[0].minImgSrc.split(",");
            detailsImgBox();
            setRightInfo(res[0]);
            createSpecifications(res[0].Specifications);

            StepNumber_.data = res[0];
            document.addEventListener("step_change", step_changeHandler)

        }
    })
    function setRightInfo(data) {
        let Rhtml = `<h1>${data.title}</h1>
        <h2>${data.subTit == null ? "" : data.subTit}</h2>
        <p><strong>商品号</strong> 420631401</p>
        <p>
          <strong>价格</strong> ￥ <span>${data.price}</span>
          <del>${data.oldPrice == null ? "" : data.oldPrice}</del>
        </p>
        <p>
          <strong>配送</strong>  上海至北京 商家承担运费
        </p>
        <p>
          <strong>服务</strong>本商品由邮乐网邮邮专卖店提供,并进行相关配送和售后等服务。
          
        </p>
        <p>
          <strong>规格</strong> 
        </p>
        <div>
          <strong>数量</strong><span></span><i>(库存${data.stock}件)</i>
        
        </div>
        <p>
          <strong>已选择</strong> <span></span>, <span>1</span>件
        </p>
        <div class="cartBn">
          <button>加入购物车</button>
        </div>`;
        $(".mainCenter").html(Rhtml)
        StepNumber_.appendTo($(".mainCenter>div").find("span")[0])
        $(".mainCenter  button").eq(0).on("click", addCartHandler);
        
    }
    $.ajax({
        type: "POST",
        url: "../server/initAddCart.php",
        data: {
            username,
        },
        dataType: "JSON",
        success(res) {
            var sum = 0;
            res.msg.forEach(item => {
                sum += Number(item.num);
                
            })
            $(".top").find("span").text(sum);
        }

    })
    // localStorage.setItem("username", "13827100407")
    function addCartHandler(e) {
        e.preventDefault();
        if (!username) {
            alert("未登录，请前往登录");
            location.href = "./signIn.html"
        } else {
            $.ajax({
                type: "POST",
                url: "../server/addCart.php",
                data: {
                    good_id: goods_id,
                    username,
                    Specifications: $(".mainCenter p").eq(5).find("span").eq(0).text(),
                    num: $(".mainCenter p").eq(5).find("span").eq(1).text()
                },
                dataType: "JSON",
                success(res) {
                    console.log(res)
                    var sum = 0;
                    res.msg.forEach(item => {
                        sum += Number(item.num);
                    })
                    $(".top").find("span").text(sum);
                    alert("成功加入购物车")
                }

            })
        }
    }
    function step_changeHandler(e) {
        $(".mainCenter p").eq(5).find("span").eq(1).text(e.step)
    }
    function createSpecifications(data) {
        var speArr = data.split(",");
        var html = "";
        speArr.forEach(function (item, index) {
            html += `<a href="javaScript:void(0)" class = ${index == 0 ? "mainCenter_Specifications" : ""}>${item}</a>`
            if (index == 0) $(".mainCenter p").eq(5).find("span").eq(0).text(item)
        })
        // console.log(html)
        $(".mainCenter p").eq(4).append(html)
        $(".mainCenter p").eq(4).on("click", "a", SpeClickHandler)
    }
    function SpeClickHandler(e) {
        $(this).addClass("mainCenter_Specifications").siblings().removeClass("mainCenter_Specifications");
        $(".mainCenter p").eq(5).find("span").eq(0).text($(this).text())//已选择
    }
    function detailsImgBox() {
        var ImgBoxWrap = ce("div", {
            width: "398px",
            height: "497px",
            margin: "20px 20px 0",
            position: "relative",
        });
        createBigBox(ImgBoxWrap)
        createMinImgBox(ImgBoxWrap);
        document.querySelector(".mainLeft").appendChild(ImgBoxWrap);
    }
    function createBigBox(parent) {
        minBox = ce("div", {
            width: "398px",
            height: "398px",
            position: "relative",
            background: `url(${BigimgSrc[0]}) no-repeat 0px 0px`,
            backgroundSize: "100% 100%"
        })
        maxBox = ce("div", {
            width: "398px",
            height: "398px",
            position: "absolute",
            left: "405px",
            top: "0",
            background: `url(${BigimgSrc[0]}) no-repeat 0px 0px`,
            backgroundSize: "200% 200%",
            zIndex: "999",
            display: "none"
        })
        cover = ce("div", {
            width: "199px",
            height: "199px",
            position: "absolute",
            top: "0",
            left: "0",
            zIndex: "888",
            background: "rgba(0,0,0,0.1)",
            display: "none"
        })
        minBox.appendChild(cover)
        parent.appendChild(minBox)
        parent.appendChild(maxBox)
        minBox.addEventListener("mouseenter", mouseHandler)

    }
    function mouseHandler(e) {
        var min = minBox.getBoundingClientRect();
        if (e.type == "mouseenter") {
            maxBox.style.display = cover.style.display = "block";
            minBox.addEventListener("mouseleave", mouseHandler);
            minBox.addEventListener("mousemove", mouseHandler)
        } else if (e.type == "mousemove") {
            X = e.clientX - min.x - 99;
            Y = e.clientY - min.y - 99;
            if (X > 199) X = 199;
            if (X < 0) X = 0;
            if (Y > 199) Y = 199;
            if (Y < 0) Y = 0;
            cover.style.left = X + "px";
            cover.style.top = Y + "px";
            maxBox.style.backgroundPositionX = -X * 2 + "px";
            maxBox.style.backgroundPositionY = -Y * 2 + "px";
        } else if (e.type == "mouseleave") {
            maxBox.style.display = cover.style.display = "none";
            minBox.addEventListener("mouseleave", mouseHandler);
            minBox.addEventListener("mousemove", mouseHandler)
        }
    }
    function createMinImgBox(parent) {
        var imgBox = ce("div", {
            width: "380px",//18px
            height: "64px",
            fontSize: 0,
            textAlign: "center",
            paddingBottom: "20px",
            position: "absolute",
            marginLeft: "9px",
            top: "420px",
            left: "0",
            overflow: "hidden",
        });
        uls = ce("ul", {
            width: 76 * MinimgSrc.length + "px",
            height: "62px",
            position: "absolute",
            top: "0px",
            left: "0px"
        });
        MinimgSrc.forEach(function (item, index) {
            var li = ce("li", {
                float: "left",
                width: "76px",
            });
            var img = new Image;
            img.style.width = "56px";
            img.style.height = "56px";
            img.style.padding = "1px";
            img.src = item;
            img.style.border = index == 0 ? "2px solid #c00" : "2px solid transparent";
            if (index == 0) prev = img;
            minImgList.push(img);
            li.appendChild(img);
            uls.appendChild(li);

        });
        var bnLeft = ce("div", {
            width: "9px",
            height: "62px",
            lineHeight: "62px",
            textAlign: "center",
            fontSize: "14px",
            position: "absolute",
            top: "420px",
            zIndex: "9999",
            cursor: "pointer",
            fontWeight: "bold"
        })
        bnRight = bnLeft.cloneNode(false);
        bnRight.style.left = "390px";
        bnLeft.textContent = "<";
        bnRight.textContent = ">";
        parent.appendChild(bnLeft);
        imgBox.appendChild(uls);
        parent.appendChild(bnRight);
        imgBox.addEventListener("mouseover", imgBoxMouserHandler)
        parent.appendChild(imgBox)
        bnLeft.addEventListener("click", bnClickHandler)
        bnRight.addEventListener("click", bnClickHandler)
        bnLeft.addEventListener("mousedown", bnmouseHandler)
        bnRight.addEventListener("clmousedownick", bnmouseHandler)
    }
    function bnmouseHandler(e) {
        e.preventDefault();
    }
    function bnClickHandler(e) {
        if (e.target.textContent == ">") {
            var x = parseInt(uls.style.left) - 76;
            if ((x + parseInt(uls.style.width)) < 380) return;
            uls.style.left = x + "px"

        } else if (e.target.textContent == "<") {
            var x = parseInt(uls.style.left) + 76;
            if (parseInt(uls.style.width) < 380) return;
            if (x > 0) return;
            uls.style.left = x + "px"
        }
    }
    function imgBoxMouserHandler(e) {
        if (e.target.nodeName !== "IMG") return;
        if (prev) {
            prev.style.border = "2px solid transparent";
        }
        prev = e.target;
        prev.style.border = "2px solid #c00";
        var src = e.target.src.replace(/m.jpg/, "y.jpg")
        minBox.style.backgroundImage = maxBox.style.backgroundImage = `url(${src})`;

    }
    function ce(type, style) {
        var ele = document.createElement(type);
        Object.assign(ele.style, style);
        return ele;
    }
})