export default function decorate(block) {
  // टेबल के सभी रोज़ (rows) को ढूँढें
  const rows = [...block.children];
  
  // पहली रो में इमेज और बैकलिंक है
  const firstRow = rows[0];
  const imageContainer = firstRow.children[0];
  const backlinkContainer = firstRow.children[1];
  
  // बाकी रोज़ से टेक्स्ट और प्राइम लिंक निकालें
  const textContainer = rows[1]?.children[0];
  const primeLinkContainer = rows[3]?.children[0];

  // नया रैपर (Wrapper) स्ट्रक्चर तैयार करें
  const contentWrapper = document.createElement('div');
  contentWrapper.classList.add('hero-content-wrapper');

  // बैकलिंक को सेटअप करें
  if (backlinkContainer && backlinkContainer.textContent.trim()) {
    backlinkContainer.classList.add('hero-backlink');
    contentWrapper.appendChild(backlinkContainer);
  }

  // मुख्य हीरो टेक्स्ट (Lorem Ipsum) को सेटअप करें
  if (textContainer && textContainer.textContent.trim()) {
    textContainer.classList.add('hero-main-text');
    contentWrapper.appendChild(textContainer);
  }

  // प्राइम लिंक (बटन/अंडरलाइन लिंक) को सेटअप करें
  if (primeLinkContainer && primeLinkContainer.textContent.trim()) {
    primeLinkContainer.classList.add('hero-prime-link');
    contentWrapper.appendChild(primeLinkContainer);
  }

  // ब्लॉक को साफ़ करके नया स्ट्रक्चर रेंडर करें
  block.textContent = '';
  
  if (imageContainer) {
    imageContainer.classList.add('hero-bg-image');
    block.appendChild(imageContainer);
  }
  
  block.appendChild(contentWrapper);
}
