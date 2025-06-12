class Titles extends HTMLElement {
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
                .titles-section {
                    position: relative;
                    overflow: hidden;
                }

                .title-bar {
                    position: absolute;
                    top: 30px;
                    width: 100%;
                    text-align: center;
                    font-size: 2.8rem;
                    z-index: 2;
                    letter-spacing: 3px;
                }

                .title-bar .light {
                    font-weight: 300;
                    color: rgba(255, 255, 255, 0.8);
                    margin: 0 5px;
                }

                .title-bar .strong {
                    font-weight: 800;
                    color: white;
                    margin: 0 5px;
                }

                section {
                    display: flex;
                    width: 100%;
                    height: 630px;
                }

                section img {
                    width: 0px;
                    flex-grow: 1;
                    object-fit: cover;
                    opacity: .8;
                    filter: brightness(20%);
                    transition: .5s ease;
                }

                section img:hover {
                    cursor: crosshair;
                    width: 300px;
                    opacity: 1;
                    filter: contrast(120%);
                }

                section img.Carabao {
                    object-position: 35% center;
                }

                section img.Carabao:hover {
                    object-position: 25% center;
                }

                section img.Mundial {
                    object-position: 35% center;
                }

                section img.Mundial:hover {
                    object-position: 25% center;
                }

                .icon-bar {
                    position: absolute;
                    bottom: 30px;
                    width: 100%;
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                    z-index: 2;
                    padding: 0 40px;
                }
            </style>

            <div class="titles-section">
                <div class="title-bar">
                    <span class="light">The</span>
                    <span class="strong">GREATEST</span>
                    <span class="strong">TEAM</span>
                    <span class="light">in</span>
                    <span class="strong">ENGLAND</span>
                </div>

                <section>
                    <img class="SuperCup" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Liverpool_vs._Chelsea%2C_UEFA_Super_Cup_2019-08-14_59.jpg" alt="">
                    <img class="FA" src="https://e0.365dm.com/22/05/2048x1152/skysports-fa-cup-final-liverpool_5772020.jpg?20220514212304" alt="">
                    <img class="Carabao" src="https://e3.365dm.com/24/02/1600x900/skynews-football-liverpool_6469308.jpg?20240225204710" alt="">
                    <img class="Premier" src="https://images.supersport.com/media/44tfa0cl/liverpool-players-25-05-g-1200.jpg?width=1920&quality=90&format=webp" alt="">
                    <img class="Champions" src="https://assets.goal.com/images/v3/bltf770c8c18ba03e67/hendo-ucl.jpg" alt="">
                    <img class="Europa" src="https://static0.footballfancastimages.com/wordpress/wp-content/uploads/2023/08/liverpool-2001-uefa-cup-final-europa-league.jpg" alt="">
                    <img class="Mundial" src="https://backend.liverpoolfc.com/sites/default/files/styles/xl/public/2022-12/honours-fifa-club-world-cup.webp?itok=OS9qrqgL" alt="">
                </section>
            </div>
        `;
    }
}
export default Titles