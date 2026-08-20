import { loadScript } from '../../scripts/aem.js';

let slickPromise;

function loadSlick() {
  if (slickPromise) return slickPromise;

  slickPromise = new Promise((resolve, reject) => {
    // Load jQuery first
    const jqueryScript = document.createElement('script');
    jqueryScript.src = 'https://code.jquery.com/jquery-3.7.1.min.js';
    jqueryScript.onload = () => {
      // Load Slick after jQuery
      const slickScript = document.createElement('script');
      slickScript.src = 'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js';
      slickScript.onload = resolve;
      slickScript.onerror = reject;

      document.head.appendChild(slickScript);
    };

    jqueryScript.onerror = reject;
    document.head.appendChild(jqueryScript);
  });

  return slickPromise;
}

export default async function decorate(block) {
  const rows = [...block.children];

  // First row = Next button
  const nextRow = rows[0];

  // Last row = Previous button
  const prevRow = rows[rows.length - 1];

  // All rows between first and last = slides
  const slideRows = rows.slice(1, -1);

  // -----------------------------
  // Create Next button
  // -----------------------------

  const nextButton = document.createElement('button');

  nextButton.type = 'button';
  nextButton.className = 'carousel-btn carousel-next';
  nextButton.setAttribute('aria-label', 'Next slide');
  nextButton.textContent = nextRow.textContent.trim();

  // -----------------------------
  // Create Previous button
  // -----------------------------

  const prevButton = document.createElement('button');

  prevButton.type = 'button';
  prevButton.className = 'carousel-btn carousel-prev';
  prevButton.setAttribute('aria-label', 'Previous slide');
  prevButton.textContent = prevRow.textContent.trim();

  // -----------------------------
  // Create Slick slides container
  // -----------------------------

  const slidesContainer = document.createElement('div');

  slidesContainer.className = 'carousel-slides';

  slideRows.forEach((row) => {
    row.classList.add('slide');

    // Second column = slide text
    [...row.children].forEach((col, index) => {
      if (index === 1) {
        col.classList.add('slide-text');
      }
    });

    slidesContainer.append(row);
  });

  // Clear original block
  block.innerHTML = '';

  // Add elements back
  block.append(
    slidesContainer,
    prevButton,
    nextButton,
  );

  // -----------------------------
  // Load Slick
  // -----------------------------

  try {
    await loadSlick();
  } catch (error) {
    console.error('Failed to load Slick Carousel:', error);
    return;
  }

  // -----------------------------
  // Initialize Slick
  // -----------------------------

  const $ = window.jQuery;

  $(slidesContainer).slick({
    slidesToShow: 1,
    slidesToScroll: 1,

    infinite: true,

    arrows: true,

    prevArrow: prevButton,
    nextArrow: nextButton,

    dots: false,

    adaptiveHeight: false,

    speed: 500,

    cssEase: 'ease-in-out',

    accessibility: true,

    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });
}
