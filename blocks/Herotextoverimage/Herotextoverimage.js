export default function decorate(block) {
  const rows = [...block.children];


  const heroWrapper = document.createElement('div');
  heroWrapper.classList.add('hero-wrapper');

  
  const mediaContainer = document.createElement('div');
  mediaContainer.classList.add('hero-media');

  const contentContainer = document.createElement('div');
  contentContainer.classList.add('hero-content');

 
  if (rows[0]) {
    const firstRowCols = [...rows[0].children];
    
   
    const img = firstRowCols[0]?.querySelector('img');
    if (img) mediaContainer.append(img);

    
    const backLink = firstRowCols[1]?.querySelector('a');
    if (backLink) {
      backLink.classList.add('back-link');
      contentContainer.append(backLink);
    }
  }

 
  if (rows[1]) {
    const headingText = rows[1].children[1]?.textContent.trim();
    if (headingText) {
      const h2 = document.createElement('h2');
      h2.classList.add('main-title');
      h2.textContent = headingText;
      contentContainer.append(h2);
    }
  }

  if (rows[2]) {
    const descText = rows[2].children[1]?.textContent.trim();
    if (descText) {
      const p = document.createElement('p');
      p.classList.add('sub-title');
      p.textContent = descText;
      contentContainer.append(p);
    }
  }

  
  if (rows[3]) {
    const primeLink = rows[3].children[1]?.querySelector('a');
    if (primeLink) {
      primeLink.classList.add('prime-link');
      contentContainer.append(primeLink);
    }
  }

  
  block.textContent = '';
  heroWrapper.append(mediaContainer);
  heroWrapper.append(contentContainer);
  block.append(heroWrapper);
}
