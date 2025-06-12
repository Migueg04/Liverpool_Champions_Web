class Footer extends HTMLElement{
    constructor(){
        super()
        this.attachShadow({mode: 'open'})
    }

    connectedCallback(){
        this.render()
    }

    render(){
        this.shadowRoot.innerHTML = `
            <style>
                .custom-footer {
                    background-color: #c8102e; /* Rojo Liverpool */
                    color: white;
                    padding: 60px 0;
                }

                .footer-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 40px;
                    
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                }

                .footer-left,
                .footer-center,
                .footer-right {
                    width: 33.33%;
                }

                .footer-left {
                    text-align: left;
                }

                .footer-center {
                    text-align: center;
                }

                .footer-right {
                    text-align: right;
                }

                .footer-heading {
                    font-weight: 600;
                    margin-bottom: 20px; /* antes 12px */
                    line-height: 1.4;
                    font-size: 16px;
                }

                .footer-subtext {
                    font-size: 14px;
                    margin-bottom: 12px; /* más separación debajo */
                }

                .footer-link {
                    font-size: 14px;
                }

                .logo-placeholder {
                    width: 80px;
                    height: 80px;
                    background-color: white;
                    border-radius: 50%;
                    margin: 0 auto;
                }

                .logo-text {
                    font-weight: 600;
                    margin-top: 10px;
                    font-size: 16px;
                }

                .no-text {
                    font-size: 48px;
                    font-weight: 800;
                    line-height: 1;
                }

                .doubt-text {
                    font-size: 20px;
                    font-weight: 600;
                    border-top: 4px solid white;
                    display: inline-block;
                    padding-top: 6px;
                    margin-top: 4px;
                }
            </style>

            <div class="custom-footer">
                <div class="footer-container">
                    
                    <!-- Izquierda -->
                    <div class="footer-left">
                        <p class="footer-heading">
                            Just another Fan Page<br>
                            Not just a Feeling
                        </p>
                        <p class="footer-subtext">A Project By:<br>Miguel Giraldo Llamosa</p>
                        <p class="footer-link">www.LFC_EnglandChamps.com</p>
                    </div>

                    <!-- Centro (Logo simulado) -->
                    <div class="footer-center">
                        <img src="./Trofeos/Liverpool shield.png" alt="">
                    </div>

                    <!-- Derecha -->
                    <div class="footer-right">
                        <img src="./Trofeos/YNWA.png" alt="">
                    </div>

                </div>
            </div>
        `;
    }

}
export default Footer