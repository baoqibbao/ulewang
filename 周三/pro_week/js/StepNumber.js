class StepNumber{
    elem;
    input;
    ids;
    step = 1;
    obj;
    constructor(_obj) {
        this.obj=_obj;
        this.elem = this.createElem();

    }

    createElem() {
        let div = this.ce("div", {
            width: "80px",
            height: "22px",
            position: "relative",
            margin:"auto"
        });
        this.createBnList(div);
        this.cteateInput(div);
        return div;
    }
    createBnList(parent) {
        var leftBn = this.ce("div", {
            width: "15px",
            height: "20px",
            position: "absolute",
            textAlign: "center",
            userSelect: "none",
            backgroundColor:"#FFFFFF",
            border: "1px solid #CCCCCC"
        });
        var rightBn = leftBn.cloneNode(false);
        leftBn.style.left = "0px";
        rightBn.style.right = "0px";
        leftBn.textContent = "-";
        rightBn.textContent = "+";
        parent.appendChild(leftBn);
        parent.appendChild(rightBn);
        leftBn.addEventListener("click", e => this.clickHandler(e));
        rightBn.addEventListener("click", e => this.clickHandler(e));
    }
    cteateInput(parent) {
        this.input = this.ce("input", {
            width: "46px",
            height: "20px",
            position: "absolute",
            left: "17px",
            border: "none",
            textAlign: "center",
            borderTop: "1px solid #CCCCCC",
            borderBottom: "1px solid #CCCCCC"
        });
        this.input.value = "1";
        parent.appendChild(this.input);
        this.input.addEventListener("input", e => this.inputHandler(e));
    }
    appendTo(parent) {
        if (typeof parent === "string") {
            parent = document.querySelector(parent);
        }
        parent.appendChild(this.elem);
    }

    inputHandler(e) {
        this.input.value = this.input.value.replace(/\D/g, "");
        // 节流
        if (this.ids) return;
        this.ids = setTimeout(() => {
            clearTimeout(this.ids);
            this.ids = 0;
            this.setStep(this.input.value);
            this.dispatch();
        }, 500);
    }

    clickHandler(e) {
        if (e.currentTarget.textContent === "-") {
            this.setStep(this.step - 1);
        } else {
            this.setStep(this.step + 1);
        }
        this.dispatch();
    }

    setStep(value) {
        value = Number(value);
        if (value < 1) value = 1;
        if (value > 999) value = 999;
        this.step = value;
        this.input.value = this.step;
       
    }
    dispatch(){
        var evt=new Event("step_change");
        evt.step=this.step;
        evt.elem=this.elem;
        
        evt.obj=this.obj;
        document.dispatchEvent(evt);
    }
    ce(type, style) {
        var ele = document.createElement(type);
        Object.assign(ele.style, style);
        return ele;
      }
}