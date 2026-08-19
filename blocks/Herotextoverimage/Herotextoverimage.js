export default function decorate(block) {
  // इमेज ढूंढें (आमतौर पर पहली पिक्चर या पिक्चर टैग)
  const imageEl = block.querySelector('picture');
  
  // सभी लिंक्स को एरे में निकालें
  const links = [...block.querySelectorAll('a')];
  
  // बैकलिंक (टेबल में पहला लिंक) और प्राइम लिंक (टेबल में आखिरी लिंक)
  const backlinkEl = links[0];
  const primeLinkEl = links[links.length - 1];

  // टेक्स्ट ढूंढें (जो न इमेज है और न ही कोई लिंक एलीमेंट)
  // आपके डॉक्युमेंट की रो के टेक्स्ट को सीधे कैप्चर करने के लिए:
  let mainTextHtml = '';
  const rows = [...block.children];
  rows.forEach((row) => {
    const textContent = row.textContent.toLowerCase();
    // हेडर रो और इमेज/वेबसाइट नाम वाली रो को छोड़कर मुख्य टेक्स्ट निकालें
    if (!textContent.includes('herotextoverimage') && 
        !textContent.includes('image is from') && 
        !textContent.includes('backlink') && 
        !textContent.includes('prime link')) {
      mainTextHtml += row.firstElementChild ? row.firstElementChild.innerHTML : '';
    }
  });

  // नया DOM स्ट्रक्चर (रैपर) तैयार करें
  const contentWrapper = document.createElement('div');
  contentWrapper.classList.add('hero-content-wrapper');

  // 1. बैकलिंक को रैपर में जोड़ें
  if (backlinkEl) {
    const backlinkContainer = document.createElement('div');
    backlinkContainer.classList.add('hero-backlink');
    // एंकर टैग को नए कंटेनर में मूव करें
    backlinkContainer.appendChild(backlinkEl.cloneNode(true));
    contentWrapper.appendChild(backlinkContainer);
  }

  // 2. मुख्य हीरो टेक्स्ट को रैपर में जोड़ें
  if (mainTextHtml.trim()) {
    const textContainer = document.createElement('div');
    textContainer.classList.add('hero-main-text');
    textContainer.innerHTML = mainTextHtml;
    contentWrapper.appendChild(textContainer);
  }

  // 3. प्राइम लिंक को रैपर में जोड़ें
  if (primeLinkEl && primeLinkEl !== backlinkEl) {
    const primeLinkContainer = document.createElement('div');
    primeLinkContainer.classList.add('hero-prime-link');
    primeLinkContainer.appendChild(primeLinkEl.cloneNode(true));
    contentWrapper.appendChild(primeLinkContainer);
  }

  // ब्लॉक को पूरी तरह साफ करें
  block.textContent = '';

  // 4. बैकग्राउंड इमेज को ब्लॉक में सबसे पहले सेट करें
  if (imageEl) {
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('hero-bg-image');
    imageContainer.appendChild(imageEl);
    block.appendChild(imageContainer);
  }

  // 5. टेक्स्ट कंटेंट रैपर को इमेज के ऊपर जोड़ें
  block.appendChild(contentWrapper);
}
