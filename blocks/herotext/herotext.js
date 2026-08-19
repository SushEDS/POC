export default function decorate(block) {
 
  const rows = [...block.children];

 
  let backlinkEl = null;
  let imageEl = null;
  const textContentLines = [];
  let primeLinkEl = null;

  rows.forEach((row, index) => {
 
    const cell = row.firstElementChild;
    if (!cell) return;


    if (index === 0) {
      backlinkEl = cell.querySelector('a') || cell;
    }

    else if (index === 1) {
      imageEl = cell.querySelector('picture') || cell.querySelector('img');
    }
 
    else if (index === 2 || index === 3) {
      if (cell.textContent.trim()) {
        textContentLines.push(cell.innerHTML);
      }
    }
  
    else if (index === 4) {
      primeLinkEl = cell.querySelector('a') || cell;
    }
  });


  const contentWrapper = document.createElement('div');
  contentWrapper.classList.add('hero-content-wrapper');


  

  if (backlinkEl) {
    const backlinkContainer = document.createElement('div');
    backlinkContainer.classList.add('hero-backlink');
    backlinkContainer.append(backlinkEl.cloneNode(true));
    contentWrapper.appendChild(backlinkContainer);
  }


  if (textContentLines.length > 0) {
    const textContainer = document.createElement('div');
    textContainer.classList.add('hero-main-text');
    textContentLines.forEach((line) => {
      const p = document.createElement('p');
      p.innerHTML = line;
      textContainer.appendChild(p);
    });
    contentWrapper.appendChild(textContainer);
  }

  if (primeLinkEl) {
    const primeLinkContainer = document.createElement('div');
    primeLinkContainer.classList.add('hero-prime-link');
    primeLinkContainer.append(primeLinkEl.cloneNode(true));
    contentWrapper.appendChild(primeLinkContainer);
  }


  block.textContent = '';


  if (imageEl) {
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('hero-bg-image');
    imageContainer.appendChild(imageEl.cloneNode(true));
    block.appendChild(imageContainer);
  }


  block.appendChild(contentWrapper);
}
