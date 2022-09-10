class Tooltip extends HTMLElement
{
    constructor(){
        super();

        //attach the shadow dom!!
        this.attachShadow({mode: 'open'});

        //get the tooltip attribute
        this.text = "Attribute 'text' not found on the tooltip element!";
        if(this.hasAttribute('text'))
            this.text = this.getAttribute('text');
        
        //create the tooltip to be displayed
        this.tooltip = document.createElement('div');
        this.tooltip.innerText = this.text;
        
        //setup the structure of this component
        this.shadowRoot.innerHTML = `
            <style>
                *{
                    color: blue;
                }
                span{
                    position: relative;
                }
                div{
                    position: absolute;
                    left: 8px;
                    bottom: -4px;
                    transform: translateY(100%);

                    width: 100px;
                    padding: 4px 0;

                    color: white;
                    background-color: black;

                    text-align: center;
                }

                ::slotted(.blue){
                    background-color: steelblue;
                    color: black;
                }

                :host([text="hanna"]){
                    background-color: var(--background-color,#ccc);
                }

                :host-context(p) .icon{
                    font-weight: bold;
                }
            </style>
            <slot></slot><span class="icon"> (?)</span>
        `;

        //get the icon defined in the structure of the component and attach events to it
        this.icon = this.shadowRoot.querySelector('.icon');
        this.icon.addEventListener('mouseenter',this._ShowTooltip.bind(this));
        this.icon.addEventListener('mouseleave',this._HideTooltip.bind(this));
    }

    disconnectedCallback(){
        this.icon.removeEventListener('mouseenter',this._ShowTooltip);
        this.icon.removeEventListener('mouseleave',this._HideTooltip);
    }

    _HideTooltip(){
        this.icon.removeChild(this.tooltip);
    }

    _ShowTooltip(){
        this.icon.appendChild(this.tooltip);
    }

    static get observedAttributes(){
        return ['text'];
    }

    attributeChangedCallback(name,oldValue,newValue){
        if(name === 'text'){
            this.tooltip.innerText = this.getAttribute('text');
        }
    }
}

customElements.define('wc-tooltip',Tooltip);