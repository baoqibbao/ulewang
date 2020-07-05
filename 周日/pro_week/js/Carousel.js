var imgSrc = [
    "../img/banner1.jpg",
    "../img/banner2.jpg",
    "../img/banner3.jpg",
    "../img/banner4.jpg",
    "../img/banner5.jpg",
  ];
  var imgList = [],
    dotList = [];
  var time = 150;
  var imgBox,
    prodot,
    pos = 0;
  var autoBool = false;
  carousel_();
  function carousel_() {
    var boxWrap = ce("div", {
      width: "1200px",
      height: "467px",
      position: "relative",
    });
    createImg(boxWrap);
    createDot(boxWrap);
    
    setInterval(autoPlay, 16);
    boxWrap.addEventListener("mouseenter", mouseHandler);
    boxWrap.addEventListener("mouseleave", mouseHandler);
    document.querySelector(".banner").appendChild(boxWrap);
    // console.log(document.querySelector(".banner"))
  }
  function mouseHandler(e) {
    if (e.type == "mouseenter") {
      autoBool = true;
    } else if (e.type == "mouseleave") {
      time=200;
      autoBool = false;
    }
  }
  function createImg(parent) {
    imgBox = ce("div", {
      width: "1200px",
      height: "467px",
    });
    imgSrc.forEach(function (item, index) {
      var img = new Image();
      img.src = item;
      img.style.width = "1200px";
      img.style.height = "467px";
      imgList.push(img);
      if (index == 0) imgBox.appendChild(img);
    });
    parent.appendChild(imgBox);
  }
  function createDot(parent) {
    var ul = ce("ul", {
      position: "absolute",
      bottom: "40px",
      right: "315px",
    });
    imgSrc.forEach(function (item, index) {
      let li = ce("li", {
        width: "17px",
        height: "17px",
        backgroundColor: index == 0 ? "red" : "#fff",
        borderRadius: "50%",
        marginLeft: "10px",
        float: "left",
      });
      if (index == 0) prodot = li;
      dotList.push(li);
      ul.appendChild(li);
    });
    parent.appendChild(ul);
    ul.addEventListener("mouseout", ulMouseHanler);
    ul.addEventListener("mouseover", ulMouseHanler);
  }
  function ulMouseHanler(e) {
    if (e.target.nodeName !== "LI") return;
    if (e.type == "mouseout") {
      console.log("mouseout");
    } else if (e.type == "mouseover") {
      var index = dotList.indexOf(e.target);
      pos = index;
      imgBox.innerHTML = "";
      imgBox.appendChild(imgList[pos]);
      changeDot();
    }
  }
  function autoPlay() {
    if (autoBool) return;
    changeImg();
    changeDot();
  }
  function changeImg() {
    time--;
    if (time > 0) return;
    time = 150;
    pos++;
    if(pos>imgList.length-1) pos=0;
    imgBox.innerHTML = "";
    imgBox.appendChild(imgList[pos]);
  }
  function changeDot() {
    if (prodot) {
      prodot.style.backgroundColor = "#fff";
    }
    prodot = dotList[pos];
    prodot.style.backgroundColor = "red";
  }
  function ce(type, style) {
    var ele = document.createElement(type);
    Object.assign(ele.style, style);
    return ele;
  }
  