export default function decorate(block) {
  console.log('🔥 TEASER JS IS WORKING!', block);

  // Change the heading so we can clearly see JS is running
  const heading = block.querySelector('.title h1');

  if (heading) {
    heading.textContent = '🔥 TEASER JS IS WORKING!';
  }

  // Change the block look temporarily for testing
  block.style.border = '8px solid red';
  block.style.borderRadius = '30px';
  block.style.boxShadow = '0 0 30px rgba(255, 0, 0, 0.5)';
}
