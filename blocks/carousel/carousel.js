export default function decorate(block) {
  const rows = [...block.children];
  
  rows.forEach((row, r) => {
    if (r === 0) {
      // Create Next Button from the first row's content
      const nextbtn = document.createElement('button');
      nextbtn.classList.add('btn', 'btn-next');
      const node = document.createTextNode(row.textContent.trim());
      nextbtn.append(node);
      row.replaceWith(nextbtn);
    } else if (r === rows.length - 1) {
      // Create Prev Button from the last row's content
      const prebtn = document.createElement('button');
      prebtn.classList.add('btn', 'btn-prev');
      const node = document.createTextNode(row.textContent.trim());
      prebtn.append(node);
      row.replaceWith(prebtn);
    } else {
      // Setup individual slides
      row.classList.add('slide');
      [...row.children].forEach((col, c) => {
        if (c === 1) {
          col.classList.add('slide-text');
        }
      });
    }
  });

  // Query scoped inside the block to avoid breaking other carousels on the page
  const slides = block.querySelectorAll(".slide");
  const nextSlide = block.querySelector(".btn-next");
  const prevSlide = block.querySelector(".btn-prev");

  // Loop through slides and set initial translateX positioning
  slides.forEach((slide, indx) => {
    slide.style.transform = `translateX(${indx * 100}%)`;
  });

  // State variables for tracking index position
  let curSlide = 0;
  const maxSlide = slides.length - 1;

  // Helper function to update slide positions on click
  const updateSlides = () => {
    slides.forEach((slide, indx) => {
      slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
    });
  };

  // Event listener for Next Button
  if (nextSlide) {
    nextSlide.addEventListener("click", () => {
      if (curSlide === maxSlide) {
        curSlide = 0; // Loop back to the first slide
      } else {
        curSlide++;
      }
      updateSlides();
    });
  }

  // Event listener for Prev Button
  if (prevSlide) {
    prevSlide.addEventListener("click", () => {
      if (curSlide === 0) {
        curSlide = maxSlide; // Loop around to the last slide
      } else {
        curSlide--;
      }
      updateSlides();
    });
  }
}
