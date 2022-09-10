class Anchor extends HTMLAnchorElement {
    constructor(){
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback(){
        this.addEventListener('click',function(e){
            if(!confirm('Do you want to navigate to an external page'))
                e.preventDefault();
        });
    }
}

customElements.define('wc-anchor',Anchor,{extends: 'a'});