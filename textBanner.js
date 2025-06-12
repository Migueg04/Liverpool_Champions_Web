class TextBanner extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.position = 0;
    this.animationFrame = null;
  }

  connectedCallback() {
    this.render();
    this.startAnimation();
  }

  disconnectedCallback() {
    // Limpia la animación si el componente se elimina
    cancelAnimationFrame(this.animationFrame);
  }

  startAnimation() {
    const marquee = this.shadowRoot.getElementById('marquee');

    const items = [
      'YNWA',
      '<img src="./images/Liverpool logo png.png" alt="Liverpool Logo">'
    ];

    // Agrega elementos repetidos
    for (let i = 0; i < 20; i++) {
      items.forEach(item => {
        const span = document.createElement('span');
        span.className = 'marquee-item';
        span.innerHTML = item;
        marquee.appendChild(span);
      });
    }

    const animate = () => {
      this.position -= 1;
      marquee.style.transform = `translateX(${this.position}px)`;

      if (Math.abs(this.position) >= marquee.scrollWidth / 2) {
        this.position = 0;
      }

      this.animationFrame = requestAnimationFrame(animate);
    };

    animate();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .marquee-container {
          background-color: #d00027;
          overflow: hidden;
          white-space: nowrap;
          position: relative;
          height: 60px;
          display: flex;
          align-items: center;
        }

        .marquee-content {
          display: inline-block;
          white-space: nowrap;
          will-change: transform;
        }

        .marquee-item {
          display: inline-block;
          color: white;
          font-size: 30px;
          margin: 0 40px;
          font-family: "DM Serif Display", serif;
        }

        .marquee-item img {
          height: 40px;
          vertical-align: middle;
        }
      </style>

      <div class="marquee-container">
        <div class="marquee-content" id="marquee"></div>
      </div>
    `;
  }
}

export default TextBanner;
