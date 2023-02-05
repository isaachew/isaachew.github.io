class Expander extends HTMLElement{
    constructor(){
        super()
    }
    connectedCallback(){
        this.isExpanded=this.getAttribute("open")!=null
        this.shr=this.attachShadow({mode:"open"})
        this.sltem=document.createElement("slot")
        this.contEl=document.createElement("div")
        Object.assign(this.contEl.style,{
            padding:"0 15px"
        })
        this.wrapperEl=document.createElement("div")
        this.contEl.appendChild(this.sltem)
        this.wrapperEl.className="expandContent"
        Object.assign(this.wrapperEl.style,{
            height:"5px",
            overflow:"hidden"
        })
        this.wrapperEl.append(this.contEl)
        this.shr.append(this.wrapperEl)
        this.expandEl=document.createElement("div")
        Object.assign(this.expandEl.style,{

            textAlign:"center",
            backgroundColor:"#999"
        })
        this.expandEl.append("expand")
        this.shr.appendChild(this.expandEl)

        this.expandEl.addEventListener("click",e=>{
            let open=this.getAttribute("open")
            if(open==null)this.setAttribute("open","")
            else this.removeAttribute("open")
        })

    }
    attributeChangedCallback(){//check to see if the expander is open

        let wasExpanded=this.isExpanded
        this.isExpanded=this.getAttribute("open")!=null

        if(wasExpanded==this.isExpanded)return

        let contEl=this.wrapperEl
        let contHeight=contEl.scrollHeight
        if(this.isExpanded){
            contEl.style.height="auto"
            contEl.animate([{height:"5px",easing:"ease"},{height:contHeight+"px"}],1000)
        }else{
            contEl.style.height="5px"
            contEl.animate([{height:contHeight+"px",easing:"ease"},{height:"5px"}],1000)

        }
    }
}
Expander.observedAttributes=["open"]
customElements.define("click-expand",Expander)
