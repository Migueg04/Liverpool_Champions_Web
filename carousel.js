class Carousel extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.currentIndex = 0;
        this.cardsData = [
            {
                image: "./Moments/Darwin Brentford.jpg",
                title: "Darwin's double at Brentford",
                text: "Darwin Nunez scored twice in stoppage time to secure a dramatic win for Liverpool in their 6,000th game, showcasing the resilience of title-winning teams."
            },
            {
                image: "./Moments/Against city.jpg",
                title: "Sending a statement inside the Etihad",
                text: "Liverpool beat Manchester City 2-0 with goals from Salah and Szoboszlai, extending their lead to 11 points and marking a key moment in the title race."
            },
            {
                image: "./Moments/Arnold Leicester.jpg",
                title: "Trent puts Reds on title bink",
                text: "Alexander-Arnold's late left-footed strike secured a vital win over Leicester, bringing Liverpool within three points of clinching the title."
            },
            {
                image: "./Moments/Agains arcenal.jpeg",
                title: "A crucial Emirates equaliser",
                text: "Salah's late equaliser at Arsenal preserved Liverpool's four-point lead, preventing a repeat setback and proving crucial in their title run."
            },
            {
                image: "./Moments/At Old Trafford.jpg",
                title: "3-0 joy at Old Trafford",
                text: "Liverpool avenged last season's setbacks at Old Trafford with a dominant 3-0 win, featuring a Diaz brace and a Salah strike, marking a key early triumph under Slot."
            },
            {
                image: "./Moments/Against Tottenham.jpg",
                title: "The Anfield outpouring",
                text: "Liverpool crushed Spurs 5-1 at Anfield to seal the Premier League title, sparking emotional celebrations as fans witnessed their first league triumph in 35 years together."
            }
        ];
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
        this.updateCarousel();
        this.startAutoPlay();
    }

    disconnectedCallback() {
        this.stopAutoPlay();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                .moments-container {
                    height: 450px;
                    
                    position: relative;
                    display: flex;
                }

                .title {
                    background-color: rgb(250, 250, 250);
                    height: 450px;
                    width: 60%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    position: relative;   
                    overflow: hidden;     
                    z-index: 1;
                    box-shadow: 5px 5px 15px rgba(0,0,0,0.5);      
                }

                .keymoments {
                    width: 60%;
                    height: 60%;
                    position: absolute;
                    z-index: 2;
                }

                .title img:not(.keymoments) {
                    transform: rotate(10deg);
                    margin-top: 70px;
                    width: 60%;
                    position: absolute;
                    z-index: 1;
                }

                .carousel {
                    
                    height: 450px;
                    width: 40%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    position: relative;
                    overflow: hidden;
                }

                .carousel-container {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .carousel-track {
                    display: flex;
                    transition: transform 0.5s ease-in-out;
                    width: 100%;
                    position: relative;
                }

                .card {
                    display: flex;
                    position: relative;
                    width: calc(100% - 80px); /* Ocupar todo el ancho menos márgenes para navegación */
                    min-width: calc(100% - 80px); /* Asegurar que ocupe todo el ancho disponible */
                    height: 350px;
                    margin: 0 40px; /* Mayor espaciado para separar completamente las cards */
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
                    font-family: 'Arial', sans-serif;
                    transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), 
                                box-shadow 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
                    flex-shrink: 0;
                }

                .card img {
                    display: block;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .card-overlay {
                    position: absolute;
                    bottom: 0;
                    width: 100%;
                    height: 45%;
                    background: linear-gradient(to top, rgba(162, 0, 0, 0.878) 0%, transparent 100%);
                    color: white;
                    padding: 16px;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-end;
                    overflow: hidden;
                }

                .card-title {
                    font-family: "DM Serif Display", serif;
                    width: 90%;
                    margin: 0;
                    font-size: 45px;
                    font-weight: 400;
                    font-style: italic;
                    line-height: 1.1;
                    text-shadow: 1px 1px 3px rgba(0,0,0,0.7);
                    transition: transform 0.4s ease;
                    z-index: 2;
                }

                .card:hover {
                    transform: translateY(-5px) scale(1.02);
                    box-shadow: 0 8px 24px rgba(0,0,0,0.3);
                }

                .card:hover .card-title {
                    transform: translateY(-5px);
                }

                .card:hover .card-text {
                    width: 95%;
                    opacity: 1;
                    max-height: 200px;
                }

                .card-text {
                    margin: 8px 0 0;
                    font-size: 14px;
                    line-height: 1.3;
                    opacity: 0;
                    max-height: 0;
                    overflow: hidden;
                    transition: opacity 0.4s ease, max-height 0.4s ease;
                }

                /* Controles del carrusel */
                .carousel-nav {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    background: rgba(225, 225, 225, 0.5);
                    border: none;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 18px;
                    font-weight: bold;
                    color: #333;
                    transition: all 0.3s ease;
                    z-index: 10;
                }

                .carousel-nav:hover {
                    background: rgba(170, 170, 170, 0.8));
                    transform: translateY(-50%) scale(1.1);
                }

                .carousel-nav.prev {
                    left: 10px;
                }

                .carousel-nav.next {
                    right: 10px;
                }

                /* Indicadores */
                .carousel-indicators {
                    position: absolute;
                    bottom: 20px;
                    left: 50%;
                    transform: translateX(-50%);
                    display: flex;
                    gap: 8px;
                    z-index: 10;
                }

                .indicator {
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    background: rgba(225, 225, 225, 0.5);
                    cursor: pointer;
                    transition: all 0.3s ease;
                    border: none;
                }

                .indicator.active {
                    background: rgb(156, 156, 156);
                    transform: scale(1.2);
                }

                .indicator:hover {
                    background: rgba(255, 255, 255, 0.8);
                }

                /* Contador */
                .carousel-counter {
                    display: none;
                }
            </style>
            <div class="moments-container">
                <div class="title">
                    <img class="keymoments" src="./images/KeyMoments.png" alt="">
                    <img src="./images/LiverBird moments.png" alt="">
                </div>
                <div class="carousel">
                    <div class="carousel-container">
                        <button class="carousel-nav prev">‹</button>
                        <div class="carousel-track">
                            ${this.cardsData.map(card => `
                                <div class="card">
                                    <img src="${card.image}" alt="${card.title}">
                                    <div class="card-overlay">
                                        <p class="card-title">${card.title}</p>
                                        <p class="card-text">${card.text}</p>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                        <button class="carousel-nav next">›</button>
                        <div class="carousel-counter">
                            <span class="current">${this.currentIndex + 1}</span> / <span class="total">${this.cardsData.length}</span>
                        </div>
                        <div class="carousel-indicators">
                            ${this.cardsData.map((_, index) => `
                                <button class="indicator ${index === this.currentIndex ? 'active' : ''}" data-index="${index}"></button>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        const prevBtn = this.shadowRoot.querySelector('.carousel-nav.prev');
        const nextBtn = this.shadowRoot.querySelector('.carousel-nav.next');
        const indicators = this.shadowRoot.querySelectorAll('.indicator');

        prevBtn.addEventListener('click', () => this.prevSlide());
        nextBtn.addEventListener('click', () => this.nextSlide());

        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });

        // Pausar autoplay al hover
        const carousel = this.shadowRoot.querySelector('.carousel');
        carousel.addEventListener('mouseenter', () => this.stopAutoPlay());
        carousel.addEventListener('mouseleave', () => this.startAutoPlay());
    }

    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.cardsData.length;
        this.updateCarousel();
    }

    prevSlide() {
        this.currentIndex = (this.currentIndex - 1 + this.cardsData.length) % this.cardsData.length;
        this.updateCarousel();
    }

    goToSlide(index) {
        this.currentIndex = index;
        this.updateCarousel();
    }

    updateCarousel() {
        const track = this.shadowRoot.querySelector('.carousel-track');
        const counter = this.shadowRoot.querySelector('.current');
        const indicators = this.shadowRoot.querySelectorAll('.indicator');

        // Obtener el ancho real del contenedor del carousel
        const carouselContainer = this.shadowRoot.querySelector('.carousel-container');
        const containerWidth = carouselContainer.offsetWidth;
        
        // Mover el track basado en el ancho completo del contenedor para mostrar una card a la vez
        track.style.transform = `translateX(-${this.currentIndex * containerWidth}px)`;

        // Actualizar contador
        counter.textContent = this.currentIndex + 1;

        // Actualizar indicadores
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentIndex);
        });
    }

    startAutoPlay() {
        this.stopAutoPlay(); // Limpiar cualquier interval existente
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, 5000); // Cambia cada 5 segundos
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
}


export default Carousel;