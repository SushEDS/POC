import { loadScript } from '../../scripts/aem.js';

const JQUERY_URL = 'https://code.jquery.com/jquery-3.7.1.min.js';
const SLICK_JS_URL =
  'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js';

function loadExternalScript(src) {
  return new Promise((resolve, reject) => {
    const existingScript = document.querySelector(
      `script[src="${src}"]`,
    );

    if (existingScript) {
      if (src.includes('jquery') && window.jQuery) {
        resolve();
        return;
      }

      if (src.includes('slick') && window.jQuery?.fn?.slick) {
        resolve();
        return;
      }

      existingScript.addEventListener('load', resolve);
      existingScript.addEventListener('error', reject);
      return;
    }

    const script = document.createElement('script');

    script.src = src;
    script.async = false;

    script.onload = resolve;
    script.onerror = reject;

    document.head.appendChild(script);
  });
}

function loadSlickCSS() {
  return new Promise((resolve) => {
    const existing = document.querySelector(
      'link[href*="slick-carousel"]',
    );

    if (existing) {
      resolve();
      return;
    }

    const link = document.createElement('link');

    link.rel = 'stylesheet';
    link.href =
      'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css';

    link.onload = resolve;
    link.onerror = resolve;

    document.head.appendChild(link);
  });
}

export default async function decorate(block) {
  const rows = [...block.children];

  /*
   * Create slider container
   */
  const slider = document.createElement('div');

  slider.className = 'carousel-slider';

  /*
   * Convert EDS rows into slides
   */
  rows.forEach((row) => {
    row.classList.add('carousel-slide');

    const columns = [...row.children];

    /*
     * Second column = text content
     */
    if (columns[1]) {
      columns[1].classList.add('carousel-slide-text');
    }

    slider.appendChild(row);
  });

  /*
   * Clear original block
   */
  block.innerHTML = '';

  /*
   * Add slider
   */
  block.appendChild(slider);

  /*
   * Load jQuery
   */
  try {
    await loadExternalScript(JQUERY_URL);

    /*
     * Load Slick
     */
    await loadExternalScript(SLICK_JS_URL);

    /*
     * Load Slick CSS
     */
    await loadSlickCSS();
  } catch (error) {
    console.error(
      'Carousel dependency loading failed:',
      error,
    );

    return;
  }

  /*
   * Verify Slick
   */
  if (!window.jQuery || !window.jQuery.fn.slick) {
    console.error('Slick.js was not loaded correctly.');
    return;
  }

  const $ = window.jQuery;

  /*
   * Initialize Slick
   */
  $(slider).slick({
    slidesToShow: 1,
    slidesToScroll: 1,

    /*
     * Infinite loop
     */
    infinite: true,

    /*
     * ============================
     * AUTOPLAY
     * ============================
     */
    autoplay: true,

    /*
     * Change slide every 4 seconds
     */
    autoplaySpeed: 4000,

    /*
     * Animation speed
     */
    speed: 700,

    /*
     * Fade effect
     */
    fade: true,

    /*
     * Arrows
     */
    arrows: true,

    /*
     * Dots
     */
    dots: true,

    /*
     * IMPORTANT:
     * Don't pause autoplay on hover
     */
    pauseOnHover: false,

    /*
     * IMPORTANT:
     * Don't pause autoplay when
     * arrow/dot gets focus
     */
    pauseOnFocus: false,

    /*
     * Don't pause when user interacts
     */
    pauseOnDotsHover: false,

    /*
     * Accessibility
     */
    accessibility: true,

    responsive: [
      {
        breakpoint: 768,

        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
          dots: true,
        },
      },
    ],
  });

  /*
   * ====================================
   * FORCE AUTOPLAY TO START
   * ====================================
   *
   * This is the important addition.
   */
  $(slider).slick('slickPlay');
}
