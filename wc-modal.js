class Modal extends HTMLElement{
    constructor(){
        super();

        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML=`
            <style>
                *{
                    box-sizing: border-box;
                    padding: 0;
                    margin: 0;
                }

                :host{
                    transition: all 0.2s ease-out;
                    position: relative;
                    opacity: 0;
                    visibility: hidden;
                    pointer-events: none;

                    font-family: 'Poppins', sans-serif;
                }

                :host([is-opened]){
                    opacity: 1;
                    visibility: visible;
                    pointer-events: auto;
                }

                .background{
                    position: fixed;
                    left: 0;
                    top: 0;
                    width: 100vw;
                    height: 100vh;
                    background-color: rgba(0,0,0,0.6);
                    z-index: 10;
                }

                .modal{
                    position: fixed;
                    left: 25%;
                    width: 50%;
                    max-width: 640px;
                    top: 50%;
                    transform: translateY(-50%);
                    background-color: white;
                    border-radius: 3px;
                    padding: 1rem;

                    z-index: 100;
                }

                .icon-container{
                    transition: color .2s ease-out;
                    position: absolute;
                    top: .8rem;
                    right: .8rem;
                    cursor: pointer;
                    color: rgba(0,0,0,.6);
                }
                .icon-container:hover{
                    color: rgba(0,0,0,1);
                }

                ion-icon {
                    font-size: 24px;
                }

                .title{
                    margin-bottom: 1.2rem;
                }
                .content{
                    display: flex;
                    flex-direction: column;
                    row-gap: .6rem;
                    margin-bottom: 1.8rem;

                    color: rgba(0,0,0,0.6);
                }

                .buttons{
                    display:flex;
                    justify-content: space-between;
                    column-gap: .4rem;
                }
                .btn{
                    transition: background-color .2s ease-out;
                    text-decoration: none;
                    color: black;
                    padding: 1rem;
                    flex: 1 1 50%;

                    display: flex;
                    justify-content: space-between;

                    border-radius: 3px;
                }
                .btn--error{
                    background-color: #da1e28;
                    color: white;
                }
                .btn--primary{
                    background-color: #0043ce;
                    color: white;
                }
                .btn--error:hover{
                    background-color: #fa4d56;
                }
                .btn--primary:hover{
                    background-color: #4589ff;
                }

            </style>


            <div class="background"></div>
            <div class="modal">
                <div class="icon-container" id="close-icon">
                    <ion-icon name="close-circle-outline" class="close-icon"></ion-icon>
                </div>
                <h1 class="title"><slot name="Title">The Title</slot></h1>
                <section class="content">
                    <slot></slot>
                </section>
                <div class="buttons">
                    <a href="javascript:void(0)" class="btn btn--error" id="close">
                        <span>Close</span>
                        <ion-icon name="alert-outline"></ion-icon>
                    </a>
                    <a href="javascript:void(0)" class="btn btn--primary" id="confirm">
                        <span>Confirm</span>
                        <ion-icon name="checkmark-done-outline"></ion-icon>
                    </a>
                </div>    
            </div>
        `;
    }

    connectedCallback(){
        let closeIcon = this.shadowRoot.querySelector('#close-icon');
        let closeButton = this.shadowRoot.querySelector('#close');
        let confirmButton = this.shadowRoot.querySelector('#confirm');

        closeIcon.addEventListener('click',function(){
            let event = new Event("close");
            this.dispatchEvent(event);
            this.Close(); 
        }.bind(this));

        closeButton.addEventListener('click',function(){
            let event = new Event("close");
            this.dispatchEvent(event);
            this.Close(); 
        }.bind(this));

        confirmButton.addEventListener('click',function(){
            let event = new Event("confirm");
            this.dispatchEvent(event);
            this.Close(); 
        }.bind(this));
    }

    Open(){
        if(!this.IsOpen())
            this.setAttribute('is-opened','');
    }

    Close(){
        if(this.IsOpen())
            this.removeAttribute('is-opened');
    }

    IsOpen(){
        return this.hasAttribute('is-opened');
    }
}

customElements.define('wc-modal',Modal);