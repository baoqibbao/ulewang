class goodItem{
    item_;
    data_;
    constructor(){
        this.item_ = this.createItem();
    }
     createItem() {
        var box = this.ce("div", {
          width: "198px",
          height: "257px",
          padding: "10px 19px",
          backgroundColor:"#fff",
          cursor:"pointer",
          position:"relative",
          transition:"box-shadow .4s",
        });
        this.createImg(box);
        this.createInfo(box);
        this.createPrice(box);
        box.addEventListener("mouseenter",this.boxMouseHandler)
        box.addEventListener("mouseleave",this.boxMouseHandler)
        return box;
      }
      boxMouseHandler(e){
        if(e.type == "mouseenter"){
          this.style.top="-2px";
          this.style.boxShadow = "0 16px 30px -14px rgba(0,36,100,0.3)";
        }else if(e.type == "mouseleave"){
          this.style.top="0px";
          this.style.boxShadow = "none";
        }
       
      }
      appendTo(parent){
        if(typeof parent =="string"){
            parent = document.querySelector(parent);
        }
        parent.appendChild(this.item_)
      }
       createImg(parent) {
        this.img = new Image;
        this.img.style.width = "200px";
        this.img.style.height = "200px";
        parent.appendChild(this.img);
      }
       createInfo(parent) {
         this.info = this.ce("a", {
          display: "block",
          width: "200px",
          height: "22px",
          lineHeight: "22px",
          color: "#333",
          fontSize: "14px",
          //溢出显示...
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          overflow: "hidden",
        });
        this.info.href = "javaScript:void(0)";

        parent.appendChild(this.info);
      }
       createPrice(parent) {
        var p_price = this.ce("p", {
          width: "200px",
          height: "20px",
          padding: "10px 0 0 ",
          fontSize: "18px",
          color: "#c52e13",
          textAlign:"center"
        });
        p_price.textContent = "¥";
        this.span = this.ce("span", {
          fontSize: "18px",
          color: "#c52e13",
          marginLeft:"4px",
        });
        p_price.appendChild(this.span);
        parent.appendChild(p_price);
      }
       ce(type, style) {
        var ele = document.createElement(type);
        Object.assign(ele.style, style);
        return ele;
      }
      set data(_d){
          // console.log(_d)
        this.data_ = _d;
        this.img.src = _d.imgSrc;
        this.info.title = this.info.textContent = _d.proName;
        this.span.textContent=_d.price;
      }
      get data(){
          return this.data_;
      }
}