import { loadScript } from '../../scripts/aem.js';

const JQUERY_URL = 'https://code.jquery.com/jquery-3.7.1.min.js';
const SLICK_JS_URL =
  'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js';

function loadExternalScript(src) {
  return new Promise((resolve, reject) => {
    // If script is already loaded
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
  /*
   * ----------------------------------------
   * Get all rows created by EDS
   * ----------------------------------------
   */

  const rows = [...block.children];

  /*
   * ----------------------------------------
   * Remove empty rows
   * ----------------------------------------
   */

  const slideRows = rows.filter((row) => {
    return row.textContent.trim() || row.querySelector('img');
  });

  /*
   * ----------------------------------------
   * Create slide wrapper
   * ----------------------------------------
   */

  const slider = document.createElement('div');

  slider.className = 'carousel-slider';

  /*
   * ----------------------------------------
   * Convert each EDS row into a slide
   * ----------------------------------------
   */

  slideRows.forEach((row) => {
    row.classList.add('carousel-slide');

    /*
     * Second column contains text
     */
    const columns = [...row.children];

    if (columns[1]) {
      columns[1].classList.add('carousel-slide-text');
    }

    slider.appendChild(row);
  });

  /*
   * ----------------------------------------
   * Clear original block
   * ----------------------------------------
   */

  block.innerHTML = '';

  /*
   * ----------------------------------------
   * Add slider to block
   * ----------------------------------------
   */

  block.appendChild(slider);

  /*
   * ----------------------------------------
   * Load jQuery + Slick
   * ----------------------------------------
   */

  try {
    await loadExternalScript(JQUERY_URL);

    await loadExternalScript(SLICK_JS_URL);

    await loadSlickCSS();
  } catch (error) {
    console.error('Carousel dependency loading failed:', error);
    return;
  }

  /*
   * ----------------------------------------
   * Check Slick
   * ----------------------------------------
   */

  if (!window.jQuery || !window.jQuery.fn.slick) {
    console.error('Slick.js was not loaded correctly.');
    return;
  }

  const $ = window.jQuery;

  /*
   * ----------------------------------------
   * Initialize Slick
   * ----------------------------------------
   */

  $(slider).slick({
    /*
     * One hero slide at a time
     */
    slidesToShow: 1,
    slidesToScroll: 1,

    /*
     * Infinite looping
     */
    infinite: true,

    /*
     * Automatic sliding
     */
    autoplay: true,

    /*
     * 5 seconds between slides
     */
    autoplaySpeed: 5000,

    /*
     * Smooth animation
     */
    speed: 700,

    /*
     * Show arrows
     */
    arrows: true,

    /*
     * Show bottom dots
     */
    dots: true,

    /*
     * Fade transition
     */
    fade: true,

    /*
     * Pause when mouse is over carousel
     */
    pauseOnHover: true,

    /*
     * Pause when user focuses carousel
     */
    pauseOnFocus: true,

    /*
     * Accessibility
     */
    accessibility: true,

    /*
     * Mobile
     */
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
}
